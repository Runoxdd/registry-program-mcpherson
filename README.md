# McPherson University: Registry Week & Registry Lecture 2026

A static site with no build step. Deploy the folder as-is (Vercel, Netlify, cPanel, GitHub Pages).

```
index.html                 page structure
styles.css                 all styling
data.js                    ALL content: speakers, bios, programme, links, contacts
app.js                     renders data.js, countdown, calendar link, mobile menu
registry-lecture-2026.ics  calendar file for the lecture
assets/img/                crest, logo, portraits, flier, QR, social image
```

## Updating content
Everything editable is in `data.js`:
- **Bios:** set `bio: "First paragraph.\n\nSecond paragraph."` on a speaker.
- **Online link:** set `onlineUrl`. The "Join the online session" link appears automatically.
- **Registration form:** `registerUrl`. If it changes, regenerate `assets/img/register-qr.svg` too.
- **Last year's lecture:** `pastLectureUrl`.
- **Speaker links:** `link` makes the name clickable; `links` adds buttons in the biography pop-up. A speaker with a `bio` gets a short excerpt and a "Read full biography" pop-up.
- **Local Organising Committee:** add members to `committee` as `{ name, role, linkedin }`; `committeeRetired` lists retired members with a note. They appear in the pop-up under Registry → Local Organising Committee.
- **Former Registrars:** `formerRegistrars` as `{ name, role, years, linkedin }`, oldest first. Shown under Registry → Former Registrars.
- **Hero stats:** `stats` (value, label, note). **Awards line:** `awardsNote`.
- **Promo video:** put the MP4 (and a poster image) in `assets/video/` and set `promoVideo.mp4` / `promoVideo.poster`. While `mp4` is null a "coming soon" frame shows.
- **2025 gallery:** `maiden.photos`. Each `src` needs two files: `name.jpg` (full size) and `name-sm.jpg` (thumbnail). The first photo is shown large.
- **Cache:** after changing CSS/JS, bump the `?v=` number on their tags in index.html. When replacing a photo, give it a new file name.

## Certificates (2nd Annual Registry Lecture, 19 Nov 2026)
Pages: `/certificate` (attendees enter their email, preview and download a PDF) and `/verify` (the QR code on each certificate opens this and shows "Valid certificate").
Until the attendee list is loaded, both pages say certificates are available after the lecture.

### Rehearsal (do this once before the 19th, on your own computer)
1. `node certs.js rehearsal/sample-attendees.csv` (fake list; it flags a duplicate and a bad email on purpose)
2. `npx serve .` then open http://localhost:3000/certificate
3. Enter `tunde.test@example.com`, download the PDF, then open http://localhost:3000/verify and type the certificate number from the PDF
4. Reset: `node certs.js --pending`, then delete the `private` folder. **Don't commit or push the rehearsal list.**

### On the day (after the Registry sends the list)
1. Save the list as CSV (Excel: File > Save As > CSV; Google Sheets: File > Download > CSV). It needs a name column and an email column.
2. `node certs.js attendees.csv` and read the summary (rows it skipped are listed).
3. `git add certs/certs.json && git commit -m "Load certificate list" && git push`
4. When Vercel finishes (about a minute), test one real email on /certificate.
5. Send the Registry `private/issued.csv` (serial, name, email). Never commit it; keep it, because re-running the script reuses those serials.

Fixing a name: correct it in the CSV, run step 2 again, push. The person keeps the same certificate number.

## Deploy (Vercel)
`npx vercel --prod` from this folder, or drag the folder into vercel.com/new.

## To do before launch
- LinkedIn link for Ms. Oluwaseun Akindele
