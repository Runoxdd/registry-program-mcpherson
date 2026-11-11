/*
  Reads certs/certs.json and decrypts one record, by email or by serial number.
  The file only holds encrypted records; a record can be opened only with its own email or serial.
*/
(function () {
  var enc = new TextEncoder();
  function hexToBytes(h) { var a = new Uint8Array(h.length / 2); for (var i = 0; i < a.length; i++) a[i] = parseInt(h.substr(i * 2, 2), 16); return a; }
  function bytesToHex(b) { return Array.prototype.map.call(new Uint8Array(b), function (x) { return ("0" + x.toString(16)).slice(-2); }).join(""); }
  function b64ToBytes(s) { var bin = atob(s), a = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }

  function sha256Hex(str) { return crypto.subtle.digest("SHA-256", enc.encode(str)).then(bytesToHex); }

  var dbPromise = null;
  function loadDB() {
    if (!dbPromise) {
      dbPromise = fetch("certs/certs.json?t=" + Date.now(), { cache: "no-store" })
        .then(function (r) { if (!r.ok) throw new Error("not found"); return r.json(); })
        .catch(function () { return { status: "pending" }; });
    }
    return dbPromise;
  }

  function normalise(kind, value) {
    value = String(value || "").trim();
    return kind === "email" ? value.toLowerCase() : value.toUpperCase().replace(/\s+/g, "");
  }

  function lookup(kind, rawValue) {
    var value = normalise(kind, rawValue);
    return loadDB().then(function (db) {
      if (!db || db.status !== "live") return { status: "pending" };
      var table = kind === "email" ? db.byEmail : db.bySerial;
      return sha256Hex(db.salt + "|" + kind + "|" + value).then(function (h) {
        var blob = table && table[h];
        if (!blob) return { status: "not-found" };
        var raw = b64ToBytes(blob), iv = raw.slice(0, 12), ct = raw.slice(12);
        return crypto.subtle.importKey("raw", enc.encode(kind + "|" + value), "PBKDF2", false, ["deriveKey"])
          .then(function (base) {
            return crypto.subtle.deriveKey({ name: "PBKDF2", salt: hexToBytes(db.salt), iterations: db.iterations, hash: "SHA-256" },
              base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
          })
          .then(function (key) { return crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, ct); })
          .then(function (buf) { return { status: "found", record: JSON.parse(new TextDecoder().decode(buf)) }; })
          .catch(function () { return { status: "not-found" }; });
      });
    });
  }

  window.MCULookup = { lookup: lookup, loadDB: loadDB };
})();
