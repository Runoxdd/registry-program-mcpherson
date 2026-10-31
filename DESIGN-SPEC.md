# McPherson Registry Lecture 2026: design spec

## 1. Reference specs

### Chrisland University, CLU Registry Discourse (cluregistrydiscourse.vercel.app), direct peer
- **Structure:** utility bar (date, phone, emails) → nav with 8 pages → hero with badges, title, theme, guest-lecturer bio card → date/venue/access strip → countdown → live registrations feed → stats tiles → speaker cards → programme at a glance → "why it matters" list → big CTA band → footer. WhatsApp float button.
- **Look:** deep purple (#4C1769) with gold, white cards, heavy geometric sans, rounded pills and cards.
- **Works:** the event facts sit in the hero; a countdown; a clear, repeated Register CTA; online and physical both stated up front.
- **Weak:** reads as a SaaS template (pill badges, stat tiles, glass cards, guessed stats like "500+ / 40+"), and it's a large app (portal, QR passes, PWA). Too much for 24 hours, and the "AI website" look is what we're told to avoid.

### McPherson dummy (mcpherson-university-ua87.bolt.host), baseline
- **Palette (sampled):** navy #0C1C35 / #15294A / #1F3C64 / #2C4F7D, gold #9A7422 / #DFBF66 / #B98F2A, pale blue #C3D3E8 / #E2EAF4. Source Serif 4 + Inter.
- **Weak:** built as a staff forum (sign-in, discussions, announcements). It has no date, theme, speakers or registration. Keep only the palette and the motto.

### FUNAAB, 2025 Registry Annual Lecture Series (funaab.edu.ng/event/…)
- **Structure:** breadcrumb → title + theme → countdown → start/end → YouTube + Zoom buttons → details list (presenter, date, venue, time, speakers by role).
- **Works:** speakers grouped by protocol role (Guest Lecturer, Chief Host, Host); online links in the hero.
- **Weak:** WordPress event template; facts repeated three times; Zoom button points at the YouTube link; no registration; no time zone.

### Bells University, 7th Annual Registry Lecture (bellsuniversity.edu.ng/meeting/…)
- **Structure:** utility bar → full university nav → breadcrumb → title → date/venue bullets → description → topic and lecturer → flier thumbnail → "join event" widget.
- **Works:** labelled facts near the top; add-to-calendar.
- **Weak:** the flier carries most of the information; calendar set to the wrong time zone; no countdown or speaker photos; stale page.

### Gresham College (gresham.ac.uk/whats-on), quality benchmark for lecture pages
- **Look:** one deep navy (#00023A) + white + a single accent, one sans family (Effra), full-bleed imagery, generous whitespace.
- **Works:** restraint. Every lecture shows date, speaker, title and "in person / online" access the same way. It reads like an institution, not a startup.

### Royal Institution (rigb.org), quality benchmark
- **Works:** a lecture page leads with the title, then the date stamp, then in-venue vs livestream access, with partner viewing listed in plain words. Institutional tone with editorial typography.

## 2. Synthesis: the template

| Decision | Taken from | Our version |
|---|---|---|
| Event facts in the hero, countdown, repeated Register | Chrisland, FUNAAB | Hero = theme + date plate with countdown; Register in the header, hero, programme, attend card and footer |
| Speakers by protocol role | FUNAAB, flier | Lecturers featured large (Guest Lecturer, Keynote); Chief Host, Guest of Honour and Host in a row below |
| Online + in person stated up front | Chrisland, RI | Hero facts row + dedicated "How to attend" with two modes |
| Restraint, one accent, institutional tone | Gresham, RI | Navy + gold only; no pills, stat tiles, gradients, glass or emoji |
| Add to calendar, correct time zone | Bells (as a warning) | Google Calendar link + .ics, all times WAT (UTC+1) |
| Not depending on the flier | Bells (as a warning) | Every flier fact is in the HTML; the flier is linked, not relied on |

**Signature element:** the gold "19" date plate on a five-day week strip (16–20 Nov). It shows at a glance that the lecture is the highlight of the week.

**Brand detail:** the four crest squares (red, yellow, indigo, magenta) appear once as a small mark in the hero.

## 3. Tokens
- Colour: ink #0C1C35, navy #15294A, steel #2C4F7D, sky #C3D3E8, mist #E2EAF4, paper #F3F6FA, gold #DFBF66 (on dark), gold-deep #8C6A1F (text on light).
- Type: Archivo (condensed widths 68–85%) for headlines, dates and labels; Source Serif 4 for body, names and the theme line. Sentence case throughout; no all-caps labels.
- Layout: left-aligned; 72rem max width; navy bands for the lecture and the week, pale bands for reading.

## 4. Data shape (data.js)
- `EVENT` meta: titles, theme, ISO times with +01:00, venue, URLs, email.
- `speakers[]`: `{ id, role, name, postnominals, title, photo, featured, bio }`. `bio: null` shows "Biography to be published shortly".
- Speakers render in flier order as equal cards. Contact is email only. `pastLectureUrl` links the maiden lecture recording.
