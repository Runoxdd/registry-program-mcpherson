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

## Deploy (Vercel)
`npx vercel --prod` from this folder, or drag the folder into vercel.com/new.

## To do before launch
- Speaker bios
- Set og:image to an absolute URL once the domain is known
