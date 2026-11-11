/*
  Draws the certificate onto a canvas (A4 landscape) and builds the PDF.
  Used by certificate.html. Needs: assets/vendor/qrcode.js (global `qrcode`)
  and, for the PDF, assets/vendor/jspdf.umd.min.js (global `jspdf`).
*/
(function () {
  var W = 2480, H = 1754;            // A4 landscape at ~212 dpi
  var MM = W / 297;                  // pixels per millimetre
  var C = {
    ink: "#0C1C35", navy: "#15294A", steel: "#2C4F7D", sky: "#C3D3E8", mist: "#E2EAF4",
    paper: "#FFFFFF", gold: "#C9A24A", goldDeep: "#8C6A1F", text: "#14223A", muted: "#52617A",
    red: "#E2232A", yellow: "#FFE600", indigo: "#36347F", magenta: "#C455A0"
  };
  var SERIF = '"Source Serif 4", Georgia, "Times New Roman", serif';
  var SANS = '"Archivo", "Helvetica Neue", Arial, sans-serif';

  var CERT = {
    title: "Certificate of Attendance",
    lead: "This is to certify that",
    line1: "attended the 2nd Annual Registry Lecture of McPherson University,",
    theme: "“The Smart Registry: Leveraging AI for Efficiency, Compliance & Service Delivery”,",
    line3: "held on Thursday, 19 November 2026, at the 500-Seater Ultra-modern Lecture Theatre.",
    signName: "Emi’ Alawode",
    signTitle: "Registrar, McPherson University",
    dateLabel: "19 November 2026",
    dateTitle: "Date of Lecture",
    verifyHost: "registry-program-mcpherson.vercel.app/verify"
  };

  function loadImage(src) {
    return new Promise(function (res, rej) {
      var im = new Image(); im.onload = function () { res(im); }; im.onerror = rej; im.src = src;
    });
  }
  function ensureFonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load('600 120px "Source Serif 4"'),
      document.fonts.load('italic 400 44px "Source Serif 4"'),
      document.fonts.load('400 44px "Source Serif 4"'),
      document.fonts.load('700 40px "Archivo"'),
      document.fonts.load('500 30px "Archivo"')
    ]).catch(function () {});
  }

  function spaced(ctx, text, x, y, tracking) {
    // centred text with letter-spacing (canvas letterSpacing isn't everywhere yet)
    var widths = [], total = 0;
    for (var i = 0; i < text.length; i++) { var w = ctx.measureText(text[i]).width; widths.push(w); total += w; }
    total += tracking * (text.length - 1);
    var cx = x - total / 2, prev = ctx.textAlign; ctx.textAlign = "left";
    for (var j = 0; j < text.length; j++) { ctx.fillText(text[j], cx, y); cx += widths[j] + tracking; }
    ctx.textAlign = prev;
  }
  function fitFont(ctx, text, weight, family, start, maxW, min) {
    var size = start;
    do { ctx.font = weight + " " + size + "px " + family; size -= 2; } while (ctx.measureText(text).width > maxW && size > min);
    return size + 2;
  }

  function drawQR(ctx, text, x, y, size) {
    var qr = qrcode(0, "M"); qr.addData(text); qr.make();
    var n = qr.getModuleCount(), quiet = 2, cell = size / (n + quiet * 2);
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(x, y, size, size);
    ctx.fillStyle = C.ink;
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) {
      if (qr.isDark(r, c)) ctx.fillRect(Math.floor(x + (c + quiet) * cell), Math.floor(y + (r + quiet) * cell), Math.ceil(cell), Math.ceil(cell));
    }
  }

  function squares(ctx, cx, y, s, gap) {
    var cols = [C.red, C.yellow, C.indigo, C.magenta], total = s * 4 + gap * 3, x = cx - total / 2;
    cols.forEach(function (col, i) {
      ctx.fillStyle = C.ink; ctx.fillRect(x + i * (s + gap) - 3, y - 3, s + 6, s + 6);
      ctx.fillStyle = "#FFFFFF"; ctx.fillRect(x + i * (s + gap), y, s, s);
      ctx.fillStyle = col; ctx.fillRect(x + i * (s + gap) + 3, y + 3, s - 6, s - 6);
    });
  }

  /* data: { name, serial, verifyUrl } ; assets: { crest } (Image) */
  function draw(canvas, data, assets) {
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext("2d");
    ctx.textBaseline = "alphabetic";

    // paper
    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);

    // faint crest watermark
    if (assets.crest) {
      var wmH = H * 0.62, wmW = wmH * assets.crest.width / assets.crest.height;
      ctx.globalAlpha = 0.045; ctx.drawImage(assets.crest, (W - wmW) / 2, (H - wmH) / 2 + 40, wmW, wmH); ctx.globalAlpha = 1;
    }

    // frame: navy edge, gold hairline, navy hairline
    var e = 6 * MM;
    ctx.fillStyle = C.ink;
    ctx.fillRect(0, 0, W, e); ctx.fillRect(0, H - e, W, e); ctx.fillRect(0, 0, e, H); ctx.fillRect(W - e, 0, e, H);
    ctx.strokeStyle = C.gold; ctx.lineWidth = 5;
    ctx.strokeRect(e + 3.5 * MM, e + 3.5 * MM, W - 2 * (e + 3.5 * MM), H - 2 * (e + 3.5 * MM));
    ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5;
    ctx.strokeRect(e + 5 * MM, e + 5 * MM, W - 2 * (e + 5 * MM), H - 2 * (e + 5 * MM));

    var cx = W / 2;
    ctx.textAlign = "center";

    // crest
    var crestH = 210, crestY = 150;
    if (assets.crest) {
      var cw = crestH * assets.crest.width / assets.crest.height;
      ctx.drawImage(assets.crest, cx - cw / 2, crestY, cw, crestH);
    }

    // university name
    ctx.fillStyle = C.ink; ctx.font = "700 46px " + SANS;
    spaced(ctx, "McPHERSON UNIVERSITY", cx, crestY + crestH + 78, 9);
    ctx.fillStyle = C.muted; ctx.font = "italic 400 30px " + SERIF;
    ctx.fillText("Seriki Sotayo, Ogun State, Nigeria  ·  Office of the Registrar", cx, crestY + crestH + 126);

    // title
    ctx.fillStyle = C.ink; ctx.font = "600 118px " + SERIF;
    ctx.fillText(CERT.title, cx, 690);
    squares(ctx, cx, 726, 22, 10);

    // lead
    ctx.fillStyle = C.muted; ctx.font = "italic 400 44px " + SERIF;
    ctx.fillText(CERT.lead, cx, 852);

    // name
    var name = (data.name || "").trim();
    ctx.fillStyle = C.ink;
    var nameSize = fitFont(ctx, name, "600", SERIF, 116, W - 2 * (e + 30 * MM), 56);
    ctx.font = "600 " + nameSize + "px " + SERIF;
    ctx.fillText(name, cx, 990);
    var nw = Math.max(ctx.measureText(name).width + 120, 900);
    ctx.strokeStyle = C.gold; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(cx - nw / 2, 1030); ctx.lineTo(cx + nw / 2, 1030); ctx.stroke();

    // body
    ctx.fillStyle = C.text; ctx.font = "400 42px " + SERIF;
    ctx.fillText(CERT.line1, cx, 1118);
    ctx.fillStyle = C.steel; ctx.font = "italic 500 42px " + SERIF;
    fitFont(ctx, CERT.theme, "italic 500", SERIF, 42, W - 2 * (e + 22 * MM), 30);
    ctx.fillText(CERT.theme, cx, 1180);
    ctx.fillStyle = C.text; ctx.font = "400 42px " + SERIF;
    ctx.fillText(CERT.line3, cx, 1242);

    // bottom row
    var baseY = 1500;
    // left: signatory
    var lx = e + 42 * MM;
    ctx.textAlign = "center";
    if (assets.signature) {
      var sh = 120, sw = sh * assets.signature.width / assets.signature.height;
      ctx.drawImage(assets.signature, lx - sw / 2, baseY - sh - 10, sw, sh);
    }
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(lx - 230, baseY); ctx.lineTo(lx + 230, baseY); ctx.stroke();
    ctx.fillStyle = C.ink; ctx.font = "700 36px " + SANS; ctx.fillText(CERT.signName, lx, baseY + 54);
    ctx.fillStyle = C.muted; ctx.font = "500 28px " + SANS; ctx.fillText(CERT.signTitle, lx, baseY + 94);

    // centre: date
    ctx.fillStyle = C.ink; ctx.font = "600 40px " + SERIF; ctx.fillText(CERT.dateLabel, cx, baseY - 14);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx - 200, baseY); ctx.lineTo(cx + 200, baseY); ctx.stroke();
    ctx.fillStyle = C.muted; ctx.font = "500 28px " + SANS; ctx.fillText(CERT.dateTitle, cx, baseY + 54);

    // right: QR + serial
    var qs = 230, rx = W - e - 42 * MM, qx = rx - qs / 2, qy = baseY - 196;
    drawQR(ctx, data.verifyUrl, qx, qy, qs);
    ctx.fillStyle = C.ink; ctx.font = "700 30px " + SANS; ctx.fillText(data.serial, rx, qy + qs + 48);
    ctx.fillStyle = C.muted; ctx.font = "500 22px " + SANS; ctx.fillText("Scan to verify, or visit", rx, qy + qs + 84);
    ctx.fillText(CERT.verifyHost, rx, qy + qs + 114);

    return canvas;
  }

  function render(canvas, data, opts) {
    opts = opts || {};
    return ensureFonts().then(function () {
      return Promise.all([
        loadImage(opts.crestSrc || "assets/img/crest-hi.png").catch(function () { return null; }),
        opts.signatureSrc ? loadImage(opts.signatureSrc).catch(function () { return null; }) : null
      ]);
    }).then(function (imgs) {
      return draw(canvas, data, { crest: imgs[0], signature: imgs[1] });
    });
  }

  function toPdf(canvas, filename) {
    var doc = new window.jspdf.jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
    doc.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 297, 210);
    doc.setProperties({ title: "Certificate of Attendance, 2nd Annual Registry Lecture", creator: "McPherson University Registry" });
    doc.save(filename);
  }

  window.MCUCert = { render: render, toPdf: toPdf, size: { w: W, h: H } };
})();
