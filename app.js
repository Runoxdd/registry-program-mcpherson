(function () {
  var E = window.EVENT;
  if (!E) return;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- links ---------- */
  function ext(a, url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  $all("[data-register]").forEach(function (a) { ext(a, E.registerUrl); });
  $all("[data-past]").forEach(function (a) { ext(a, E.pastLectureUrl); });
  $all("[data-map]").forEach(function (a) { ext(a, E.mapUrl); });
  $all("[data-email]").forEach(function (el) { el.textContent = E.email; });
  $all("[data-mailto]").forEach(function (a) { a.href = "mailto:" + E.email; });
  if (E.whatsapp) {
    $all("[data-wa-number]").forEach(function (el) { el.textContent = E.whatsapp.display; });
    $all("[data-wa]").forEach(function (a) {
      ext(a, "https://wa.me/" + E.whatsapp.number + "?text=" + encodeURIComponent("Hello, I have an enquiry about the McPherson University Registry Lecture 2026."));
    });
  }

  if (E.onlineUrl) {
    var ol = $("#online-link");
    ext(ol, E.onlineUrl); ol.hidden = false;
    $("#online-text").textContent = "The lecture will be streamed live. Use the link below to join on the day.";
  }

  var gcal = $("#gcal");
  if (gcal) {
    var st = new Date(E.lectureStart).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    gcal.href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(E.lectureTitle + ": " + E.theme) +
      "&dates=" + st + "/" + st +
      "&details=" + encodeURIComponent(E.theme + ": " + E.subtheme + "\nRegister: " + E.registerUrl) +
      "&location=" + encodeURIComponent(E.venue + ", " + E.venueDetail);
  }

  /* ---------- speakers ---------- */
  var EXT = '<svg class="ext" viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.5h-2v7h7v-2M7 2.5h2.5V5M9.5 2.5 5.5 6.5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';
  function paras(text) { return text.split(/\n\n+/); }
  var LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  function plain(text) { return text.replace(LINK_RE, "$1"); }
  function richPara(text) {
    var out = "", last = 0, m;
    LINK_RE.lastIndex = 0;
    while ((m = LINK_RE.exec(text))) {
      out += esc(text.slice(last, m.index)) +
        '<a class="bio-link" href="' + esc(m[2]) + '" target="_blank" rel="noopener">' + esc(m[1]) + EXT + "</a>";
      last = LINK_RE.lastIndex;
    }
    return out + esc(text.slice(last));
  }
  function nameHtml(sp) {
    if (!sp.link) return esc(sp.name);
    return '<a class="name-link" href="' + esc(sp.link.url) + '" target="_blank" rel="noopener" aria-label="' + esc(sp.name) + ' on ' + esc(sp.link.label) + ' (opens in a new tab)">' + esc(sp.name) + EXT + "</a>";
  }
  function bioHtml(sp) {
    if (!sp.bio) return '<p class="bio bio-pending">Biography to be published shortly.</p>';
    return '<p class="bio bio-excerpt">' + esc(plain(paras(sp.bio)[0])) + "</p>" +
      '<button class="text-link bio-open" type="button" data-bio="' + esc(sp.id) + '">Read full biography</button>';
  }
  $("#speaker-list").innerHTML = E.speakers.map(function (sp) {
    return (
      '<article class="speaker" id="speaker-' + esc(sp.id) + '">' +
        '<figure class="speaker-photo"><img src="' + esc(sp.photo) + '" alt="Portrait of ' + esc(sp.name) + '" loading="lazy" width="640" height="800"></figure>' +
        '<div class="speaker-body">' +
          '<p class="speaker-role">' + esc(sp.role) + "</p>" +
          "<h3>" + nameHtml(sp) + "</h3>" +
          (sp.postnominals ? '<p class="speaker-pn">' + esc(sp.postnominals) + "</p>" : "") +
          '<p class="speaker-title">' + esc(sp.title) + "</p>" +
          bioHtml(sp) +
        "</div>" +
      "</article>"
    );
  }).join("");

  /* ---------- biography pop-up ---------- */
  var dlg = $("#bio-dialog");
  var lastOpener = null;
  function openBio(id, opener) {
    var sp = E.speakers.filter(function (s) { return s.id === id; })[0];
    if (!sp) return;
    $("#bio-photo").src = sp.photo; $("#bio-photo").alt = "Portrait of " + sp.name;
    $("#bio-role").textContent = sp.role;
    $("#bio-name").innerHTML = nameHtml(sp);
    $("#bio-pn").textContent = sp.postnominals || ""; $("#bio-pn").hidden = !sp.postnominals;
    $("#bio-title").textContent = sp.title;
    $("#bio-tagline").textContent = sp.bioTitle || ""; $("#bio-tagline").hidden = !sp.bioTitle;
    $("#bio-links").innerHTML = (sp.links || []).map(function (l) {
      return '<a class="text-link" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + EXT + "</a>";
    }).join("");
    $("#bio-text").innerHTML = paras(sp.bio).map(function (p) { return "<p>" + richPara(p) + "</p>"; }).join("");
    lastOpener = opener || null;
    if (dlg.showModal) { dlg.showModal(); } else { dlg.setAttribute("open", ""); }
    dlg.scrollTop = 0; $(".bio-dialog-inner").scrollTop = 0;
    $("#bio-close").focus();
  }
  function closeBio() {
    if (dlg.close) { dlg.close(); } else { dlg.removeAttribute("open"); }
  }
  if (dlg) {
    dlg.addEventListener("close", function () { if (lastOpener) lastOpener.focus(); });
    $("#bio-close").addEventListener("click", closeBio);
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeBio(); });
    $all(".bio-open").forEach(function (b) {
      b.addEventListener("click", function () { openBio(b.getAttribute("data-bio"), b); });
    });
  }

  /* ---------- shared dialog helpers ---------- */
  function showDialog(d) { if (d.showModal) { d.showModal(); } else { d.setAttribute("open", ""); } }
  function hideDialog(d) { if (d.close) { d.close(); } else { d.removeAttribute("open"); } }
  $all("dialog").forEach(function (d) {
    $all("[data-close]", d).forEach(function (b) { b.addEventListener("click", function () { hideDialog(d); }); });
    d.addEventListener("click", function (e) { if (e.target === d) hideDialog(d); });
  });

  /* ---------- local organising committee ---------- */
  var cDlg = $("#committee-dialog");
  var members = E.committee || [];
  $("#committee-list").innerHTML = members.length
    ? '<ul class="committee-list">' + members.map(function (m) {
        var name = m.linkedin
          ? '<a class="name-link" href="' + esc(m.linkedin) + '" target="_blank" rel="noopener" aria-label="' + esc(m.name) + ' on LinkedIn (opens in a new tab)">' + esc(m.name) + EXT + "</a>"
          : esc(m.name);
        return '<li><span class="cm-name">' + name + "</span>" + (m.role ? '<span class="cm-role">' + esc(m.role) + "</span>" : "") + "</li>";
      }).join("") + "</ul>"
    : '<p class="committee-empty">The names of committee members will be published here shortly.</p>';
  var retired = E.committeeRetired || [];
  if (retired.length) {
    $("#committee-list").innerHTML +=
      '<h3 class="committee-sub">Retired membership</h3><ul class="committee-list is-retired">' +
      retired.map(function (m) {
        return '<li><span class="cm-name">' + esc(m.name) + "</span>" + (m.note ? '<span class="cm-note">' + esc(m.note) + "</span>" : "") + "</li>";
      }).join("") + "</ul>";
  }
  $all("[data-committee]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (typeof setDd === "function") setDd(false);
      var mb = $("#menu-btn"); mb.setAttribute("aria-expanded", "false"); $("#site-nav").classList.remove("is-open");
      showDialog(cDlg); $("[data-close]", cDlg).focus();
    });
  });

  /* ---------- promo video ---------- */
  var pv = E.promoVideo, pp = $("#promo-player");
  if (pp && pv) {
    pp.style.setProperty("--ratio", pv.ratio || "16 / 9");
    if (pv.mp4) {
      pp.innerHTML =
        '<video id="promo-video" preload="none" playsinline' + (pv.poster ? ' poster="' + esc(pv.poster) + '"' : "") + '>' +
          '<source src="' + esc(pv.mp4) + '" type="video/mp4">' +
          (pv.captions ? '<track kind="captions" src="' + esc(pv.captions) + '" srclang="en" label="English">' : "") +
        "</video>" +
        '<button class="promo-play" type="button" aria-label="Play the 30-second preview video"><span class="play" aria-hidden="true"></span><span class="promo-play-label">Play preview<span>0:30</span></span></button>';
      var vid = $("#promo-video"), pb = $(".promo-play", pp);
      pb.addEventListener("click", function () {
        vid.controls = true; pp.classList.add("is-playing");
        var r = vid.play(); if (r && r.catch) r.catch(function () {});
        vid.focus();
      });
      vid.addEventListener("ended", function () { pp.classList.remove("is-playing"); vid.controls = false; vid.load(); });
    } else {
      pp.classList.add("is-pending");
      pp.innerHTML =
        '<div class="promo-pending">' +
          '<span class="squares" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' +
          '<span class="play is-muted" aria-hidden="true"></span>' +
          '<p class="promo-pending-title">Preview video coming soon</p>' +
          '<p class="promo-pending-sub">2nd Annual Registry Lecture · 19 November 2026</p>' +
        "</div>";
    }
  }

  /* ---------- former registrars ---------- */
  var rDlg = $("#registrars-dialog");
  var regs = E.formerRegistrars || [];
  if (rDlg) {
    $("#registrars-list").innerHTML = '<ul class="committee-list registrar-list">' + regs.map(function (m) {
      var name = m.linkedin
        ? '<a class="name-link" href="' + esc(m.linkedin) + '" target="_blank" rel="noopener" aria-label="' + esc(m.name) + ' on LinkedIn (opens in a new tab)">' + esc(m.name) + EXT + "</a>"
        : esc(m.name);
      return '<li><span class="cm-name">' + name + '</span><span class="reg-meta"><span class="cm-role">' + esc(m.role) + '</span><span class="reg-years">' + esc(m.years) + "</span></span></li>";
    }).join("") + "</ul>";
    $all("[data-registrars]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (typeof setDd === "function") setDd(false);
        $("#menu-btn").setAttribute("aria-expanded", "false"); $("#site-nav").classList.remove("is-open");
        showDialog(rDlg); $("[data-close]", rDlg).focus();
      });
    });
  }

  /* ---------- maiden lecture + gallery ---------- */
  var M = E.maiden;
  if (M) {
    $all("[data-album]").forEach(function (a) { ext(a, M.albumUrl); });
    $("[data-maiden-theme]").textContent = "“" + M.theme + "”";
    $("[data-maiden-meta]").textContent = M.date + ", " + M.venue;
    $("#gallery").innerHTML = M.photos.map(function (ph, i) {
      return '<button class="g-item' + (i === 0 ? " is-lead" : "") + '" type="button" data-index="' + i + '" aria-label="View photo: ' + esc(ph.caption) + '">' +
        '<img src="' + esc(ph.src) + '-sm.jpg" alt="' + esc(ph.caption) + '" loading="lazy" width="900" height="600"></button>';
    }).join("");

    var lb = $("#lightbox"), lbImg = $("#lb-img"), cur = 0, lbOpener = null;
    function showPhoto(i) {
      cur = (i + M.photos.length) % M.photos.length;
      var ph = M.photos[cur];
      lbImg.src = ph.src + ".jpg"; lbImg.alt = ph.caption;
      $("#lb-caption").textContent = ph.caption;
      $("#lb-count").textContent = (cur + 1) + " of " + M.photos.length;
    }
    $all(".g-item").forEach(function (b) {
      b.addEventListener("click", function () {
        lbOpener = b; showPhoto(+b.getAttribute("data-index")); showDialog(lb); $(".lb-close").focus();
      });
    });
    $("#lb-prev").addEventListener("click", function () { showPhoto(cur - 1); });
    $("#lb-next").addEventListener("click", function () { showPhoto(cur + 1); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") showPhoto(cur - 1);
      if (e.key === "ArrowRight") showPhoto(cur + 1);
    });
    lb.addEventListener("close", function () { if (lbOpener) lbOpener.focus(); });
    var tx = null;
    lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (tx === null) return;
      var dx = e.changedTouches[0].clientX - tx; tx = null;
      if (Math.abs(dx) > 50) showPhoto(cur + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- registry dropdown ---------- */
  var dd = $("#registry-dd");
  if (dd) {
    var ddBtn = $(".dd-btn", dd);
    function setDd(open) { ddBtn.setAttribute("aria-expanded", String(open)); dd.classList.toggle("is-open", open); }
    ddBtn.addEventListener("click", function (e) { e.stopPropagation(); setDd(ddBtn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("click", function (e) { if (!dd.contains(e.target)) setDd(false); });
    dd.addEventListener("keydown", function (e) { if (e.key === "Escape") { setDd(false); ddBtn.focus(); } });
    dd.addEventListener("focusout", function (e) { if (!dd.contains(e.relatedTarget)) setDd(false); });
  }

  /* ---------- copy email ---------- */
  $all(".copy-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      function done() { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy address"; }, 1800); }
      function fallback() {
        var r = document.createRange(); r.selectNodeContents($(".email-value"));
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(E.email).then(done, fallback);
      } else { fallback(); }
    });
  });

  /* ---------- countdown ---------- */
  var start = new Date(E.lectureStart).getTime();
  var dayEnd = new Date(E.lectureDate + "T23:59:59+01:00").getTime();
  var cd = $("#countdown"), label = $("#cd-label");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    var now = Date.now();
    if (now > dayEnd) {
      cd.classList.add("is-done");
      label.textContent = "The 2nd Annual Registry Lecture held on 19 November 2026. Thank you for attending.";
      return false;
    }
    if (now >= start) {
      cd.classList.add("is-done");
      label.textContent = "The lecture is under way today at the Lecture Theatre" + (E.onlineUrl ? " and online." : ".");
      return true;
    }
    var t = Math.floor((start - now) / 1000);
    $('[data-cd="d"]').textContent = Math.floor(t / 86400);
    $('[data-cd="h"]').textContent = pad(Math.floor(t % 86400 / 3600));
    $('[data-cd="m"]').textContent = pad(Math.floor(t % 3600 / 60));
    $('[data-cd="s"]').textContent = pad(t % 60);
    return true;
  }
  if (tick()) { var iv = setInterval(function () { if (!tick()) clearInterval(iv); }, 1000); }

  /* ---------- directions tabs ---------- */
  var routes = $("#routes");
  if (routes) {
    var tabs = $all('[role="tab"]', routes);
    routes.classList.add("is-tabbed");
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    select(tabs[0]);
  }

  /* ---------- mobile nav ---------- */
  var btn = $("#menu-btn"), nav = $("#site-nav");
  btn.addEventListener("click", function () {
    var open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  $all("a", nav).forEach(function (a) {
    a.addEventListener("click", function () {
      btn.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open");
    });
  });
})();
