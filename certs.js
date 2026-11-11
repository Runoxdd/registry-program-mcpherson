#!/usr/bin/env node
/*
  Certificate list builder for the 2nd Annual Registry Lecture.

  Usage:
    node certs.js attendees.csv     load the Registry's attendee list (CSV export from Excel / Google Sheets)
    node certs.js --pending         switch the certificate page back to "available after the lecture"

  The CSV needs a column with "email" in its header and a column with "name" in its header
  (or separate first / last name columns). Extra columns are ignored.

  Writes:
    certs/certs.json      what the website reads. Every record is encrypted, so the file
                          reveals no names or emails on its own.
    private/issued.csv    serial number, name and email for the Registry's records.
                          NOT committed (it's in .gitignore). Keep it: re-running the script
                          reuses these serials, so certificates already downloaded stay valid.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const { webcrypto: crypto } = require("crypto");
const subtle = crypto.subtle;

const ROOT = __dirname;
const OUT = path.join(ROOT, "certs", "certs.json");
const PRIVATE_DIR = path.join(ROOT, "private");
const ISSUED = path.join(PRIVATE_DIR, "issued.csv");
const EVENT = "2nd Annual Registry Lecture, 19 November 2026";
const ITERATIONS = 60000;
const SERIAL_PREFIX = "MCU-RL26-";
const SERIAL_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O, 1/I

/* ---------- small helpers ---------- */
const enc = new TextEncoder();
const hex = (buf) => Buffer.from(buf).toString("hex");
const b64 = (buf) => Buffer.from(buf).toString("base64");
const normEmail = (e) => String(e || "").trim().toLowerCase();
const normSerial = (s) => String(s || "").trim().toUpperCase();

function parseCSV(text) {
  text = text.replace(/^﻿/, "");
  const rows = []; let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}
const csvCell = (v) => /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;

function tidyName(n) {
  n = String(n || "").replace(/\s+/g, " ").trim();
  if (!n) return n;
  // only re-case names typed ALL CAPS or all lowercase; leave mixed case as typed
  if (n === n.toUpperCase() || n === n.toLowerCase()) {
    n = n.toLowerCase().replace(/(^|[\s\-'’.(])([a-z])/g, (m, p, ch) => p + ch.toUpperCase());
  }
  return n;
}
function randomSerial(taken) {
  for (;;) {
    const bytes = crypto.getRandomValues(new Uint8Array(6));
    let s = SERIAL_PREFIX;
    for (const b of bytes) s += SERIAL_ALPHABET[b % SERIAL_ALPHABET.length];
    if (!taken.has(s)) { taken.add(s); return s; }
  }
}

async function sha256Hex(str) { return hex(await subtle.digest("SHA-256", enc.encode(str))); }
async function deriveKey(secret, salt) {
  const base = await subtle.importKey("raw", enc.encode(secret), "PBKDF2", false, ["deriveKey"]);
  return subtle.deriveKey({ name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" }, base,
    { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
}
async function seal(secret, salt, obj) {
  const key = await deriveKey(secret, salt);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(JSON.stringify(obj))));
  const out = new Uint8Array(iv.length + ct.length); out.set(iv); out.set(ct, iv.length);
  return b64(out);
}

function readIssued() {
  const map = new Map();
  if (!fs.existsSync(ISSUED)) return map;
  const rows = parseCSV(fs.readFileSync(ISSUED, "utf8"));
  const h = rows.shift().map((x) => x.toLowerCase());
  const si = h.indexOf("serial"), ei = h.indexOf("email");
  for (const r of rows) if (r[ei]) map.set(normEmail(r[ei]), normSerial(r[si]));
  return map;
}

function findColumns(header) {
  const h = header.map((x) => x.trim().toLowerCase());
  const email = h.findIndex((x) => x.includes("email"));
  let name = h.findIndex((x) => x.includes("full name"));
  if (name < 0) name = h.findIndex((x) => x.includes("name") && !x.includes("first") && !x.includes("last") && !x.includes("surname") && !x.includes("user"));
  const first = h.findIndex((x) => x.includes("first name"));
  const last = h.findIndex((x) => x.includes("last name") || x.includes("surname"));
  return { email, name, first, last };
}

/* ---------- commands ---------- */
function writeJSON(obj) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(obj) + "\n");
}

async function build(csvPath) {
  if (!fs.existsSync(csvPath)) { console.error("File not found: " + csvPath); process.exit(1); }
  const rows = parseCSV(fs.readFileSync(csvPath, "utf8"));
  if (rows.length < 2) { console.error("The CSV has no data rows."); process.exit(1); }
  const header = rows.shift();
  const col = findColumns(header);
  if (col.email < 0 || (col.name < 0 && col.first < 0)) {
    console.error("Couldn't find the columns. Headers found: " + header.join(" | "));
    console.error('Need a column with "email" in its header and one with "name" in it.');
    process.exit(1);
  }

  const issued = readIssued();
  const taken = new Set(issued.values());
  const seen = new Set(), people = [], problems = [];
  rows.forEach((r, i) => {
    const line = i + 2;
    const email = normEmail(r[col.email]);
    let name = col.name >= 0 ? r[col.name] : [r[col.first], r[col.last]].filter(Boolean).join(" ");
    name = tidyName(name);
    if (!email && !name) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { problems.push(`Row ${line}: invalid or missing email "${r[col.email] || ""}" (${name || "no name"}), skipped`); return; }
    if (!name) { problems.push(`Row ${line}: no name for ${email}, skipped`); return; }
    if (seen.has(email)) { problems.push(`Row ${line}: duplicate email ${email}, kept the first one`); return; }
    seen.add(email);
    const serial = issued.get(email) || randomSerial(taken);
    people.push({ name, email, serial });
  });

  // keep the salt stable between runs
  let salt;
  try { const prev = JSON.parse(fs.readFileSync(OUT, "utf8")); if (prev.salt) salt = Buffer.from(prev.salt, "hex"); } catch (e) {}
  if (!salt) salt = Buffer.from(crypto.getRandomValues(new Uint8Array(16)));
  const saltHex = salt.toString("hex");

  console.log(`Encrypting ${people.length} records…`);
  const byEmail = {}, bySerial = {};
  for (const p of people) {
    const rec = { n: p.name, s: p.serial, e: EVENT };
    byEmail[await sha256Hex(saltHex + "|email|" + p.email)] = await seal("email|" + p.email, salt, rec);
    bySerial[await sha256Hex(saltHex + "|serial|" + p.serial)] = await seal("serial|" + p.serial, salt, { n: p.name, s: p.serial, e: EVENT });
  }
  writeJSON({ version: 1, status: "live", event: EVENT, salt: saltHex, iterations: ITERATIONS, count: people.length, updated: new Date().toISOString(), byEmail, bySerial });

  fs.mkdirSync(PRIVATE_DIR, { recursive: true });
  const lines = ["serial,name,email"].concat(people.map((p) => [p.serial, p.name, p.email].map(csvCell).join(",")));
  // keep earlier entries that aren't in this list, so their serials are never reused
  for (const [email, serial] of issued) if (!seen.has(email)) lines.push([serial, "(not in latest list)", email].map(csvCell).join(","));
  fs.writeFileSync(ISSUED, lines.join("\n") + "\n");

  console.log(`\nDone. ${people.length} certificates ready.`);
  console.log(`  Site file:        ${path.relative(ROOT, OUT)}  (commit and push this)`);
  console.log(`  Registry record:  ${path.relative(ROOT, ISSUED)}  (keep private, not committed)`);
  if (problems.length) { console.log(`\n${problems.length} row(s) need attention:`); problems.forEach((p) => console.log("  - " + p)); }
}

(async () => {
  const arg = process.argv[2];
  if (!arg || arg === "-h" || arg === "--help") {
    console.log("Usage:\n  node certs.js attendees.csv\n  node certs.js --pending"); return;
  }
  if (arg === "--pending") {
    writeJSON({ version: 1, status: "pending" });
    console.log("Certificate page set to: available after the lecture.");
    return;
  }
  await build(path.resolve(arg));
})().catch((e) => { console.error(e); process.exit(1); });
