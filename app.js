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
  $all("[data-rec]").forEach(function (a) { ext(a, E.lectureRecording || E.pastLectureUrl); });
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
    if (!sp) {
      var aw = (E.awardees || []).filter(function (x) { return x.id === id; })[0];
      if (!aw) return;
      sp = { name: aw.name, photo: aw.photo, role: "McU Registry Social Impact Awardee", title: "", bio: aw.bio, bioTitle: aw.bioTitle,
             link: aw.linkedin ? { label: "LinkedIn", url: aw.linkedin } : null,
             links: aw.linkedin ? [{ label: "LinkedIn", url: aw.linkedin }] : [] };
    }
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

  /* ---------- hero stats + awards note ---------- */
  var hs = $("#hero-stats");
  if (hs && E.stats) {
    hs.innerHTML = E.stats.map(function (st) {
      return '<div class="stat"><dt class="stat-value">' + esc(st.value) + '</dt><dd><span class="stat-label">' + esc(st.label) + "</span>" +
        (st.note ? '<span class="stat-note">' + esc(st.note) + "</span>" : "") + "</dd></div>";
    }).join("");
  }
  if (E.awardsNote) $all("[data-awards-note]").forEach(function (el) { el.textContent = E.awardsNote; el.hidden = false; });

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
        '<button class="promo-play" type="button" aria-label="Play the video"><span class="play" aria-hidden="true"></span><span class="promo-play-label">Play video</span></button>';
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
          '<p class="promo-pending-title">Video coming soon</p>' +
          '<p class="promo-pending-sub">2nd Annual Registry Lecture · 19 November 2026</p>' +
        "</div>";
    }
  }

  /* ---------- social impact awardees ---------- */
  var al = $("#awardee-list");
  if (al && E.awardees) {
    al.innerHTML = E.awardees.map(function (a) {
      if (!a.name) {
        return '<article class="awardee is-tba"><div class="awardee-photo awardee-tba" aria-hidden="true"><span class="squares"><i></i><i></i><i></i><i></i></span></div>' +
          '<div class="awardee-body"><p class="awardee-role">McU Registry Social Impact Awardee</p><h3>To be announced</h3></div></article>';
      }
      var name = a.linkedin
        ? '<a class="name-link" href="' + esc(a.linkedin) + '" target="_blank" rel="noopener" aria-label="' + esc(a.name) + ' on LinkedIn (opens in a new tab)">' + esc(a.name) + EXT + "</a>"
        : esc(a.name);
      return '<article class="awardee"><div class="awardee-photo"><img src="' + esc(a.photo) + '" alt="Portrait of ' + esc(a.name) + '" loading="lazy" width="480" height="480"></div>' +
        '<div class="awardee-body"><p class="awardee-role">McU Registry Social Impact Awardee</p><h3>' + name + "</h3>" +
        (a.bio ? '<button class="text-link bio-open awardee-bio-open" type="button" data-bio="' + esc(a.id) + '">Read biography</button>' : "") +
        "</div></article>";
    }).join("");
    $all(".awardee-bio-open", al).forEach(function (b) {
      b.addEventListener("click", function () { openBio(b.getAttribute("data-bio"), b); });
    });
  }

  /* ---------- day-by-day programme ---------- */
  var sched = $("#sched");
  if (sched && E.schedule) {
    var DOWS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var nowOverride = new URLSearchParams(location.search).get("now"); // e.g. ?now=2026-11-16T08:10 for testing
    function nowMs() { return nowOverride ? new Date(nowOverride + ":00+01:00").getTime() : Date.now(); }
    function at(date, hm) { return new Date(date + "T" + hm + ":00+01:00").getTime(); }
    function watDate(ms) { var d = new Date(ms + 3600000); return d.toISOString().slice(0, 10); }
    function hm12(hm) {
      var h = +hm.slice(0, 2), m = hm.slice(3);
      if (h === 12 && m === "00") return { t: "12 noon", ap: "" };
      return { t: ((h % 12) || 12) + ":" + m, ap: h < 12 ? "am" : "pm" };
    }
    function range(s, e) {
      var a = hm12(s), b = hm12(e);
      if (a.ap && a.ap === b.ap) return a.t + "–" + b.t + " " + b.ap;
      return a.t + (a.ap ? " " + a.ap : "") + " – " + b.t + (b.ap ? " " + b.ap : "");
    }
    function dayInfo(date) {
      var d = new Date(date + "T12:00:00+01:00");
      return { dow: DOWS[d.getUTCDay()], short: DOWS[d.getUTCDay()].slice(0, 3), num: d.getUTCDate(), month: MONTHS[d.getUTCMonth()] };
    }

    var tabsHtml = '<div class="sched-tabs" role="tablist" aria-label="Choose a day">';
    var panelsHtml = "";
    E.schedule.forEach(function (day, i) {
      var di = dayInfo(day.date), lecture = day.sessions.some(function (s) { return s.highlight; });
      tabsHtml += '<button class="sched-tab' + (lecture ? " is-lecture" : "") + '" type="button" role="tab" id="stab-' + day.date + '" aria-controls="sday-' + day.date + '" aria-selected="false" tabindex="-1" data-date="' + day.date + '">' +
        '<span class="st-day">Day ' + (i + 1) + '</span><span class="st-dow">' + di.short + '</span><span class="st-num">' + di.num + "</span>" +
        (lecture ? '<span class="st-flag">Lecture</span>' : '<span class="st-today" hidden>Today</span>') + "</button>";
      panelsHtml += '<div class="sched-panel" role="tabpanel" id="sday-' + day.date + '" aria-labelledby="stab-' + day.date + '">' +
        '<h3 class="sched-day-title">Day ' + (i + 1) + ", " + di.dow + " " + di.num + " " + di.month + "</h3>" +
        '<ol class="sessions">' + day.sessions.map(function (s, k) {
          return '<li class="session' + (s.highlight ? " is-highlight" : "") + '" data-start="' + at(day.date, s.start) + '" data-end="' + at(day.date, s.end) + '">' +
            '<div class="session-time"><time datetime="' + day.date + "T" + s.start + '+01:00">' + range(s.start, s.end) + '</time><span class="session-status" hidden></span></div>' +
            '<div class="session-body"><h4>' + esc(s.title) + "</h4>" +
            '<p class="session-meta"><span class="sm-label">Venue</span> ' + esc(s.venue) + "</p>" +
            (s.by ? '<p class="session-meta"><span class="sm-label">Facilitator</span> ' +
              (s.byUrl ? '<a class="text-link fac-link" href="' + esc(s.byUrl) + '" target="_blank" rel="noopener">' + esc(s.by) + EXT + "</a>" : esc(s.by)) + "</p>" : "") +
            "</div></li>";
        }).join("") + "</ol></div>";
    });
    sched.innerHTML = tabsHtml + "</div>" + panelsHtml;
    sched.classList.add("is-tabbed");

    var stabs = $all(".sched-tab", sched);
    function pick(date, focus) {
      stabs.forEach(function (t) {
        var on = t.getAttribute("data-date") === date;
        t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
        if (on && focus) t.focus();
      });
    }
    stabs.forEach(function (t, i) {
      t.addEventListener("click", function () { pick(t.getAttribute("data-date")); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = stabs[(i + 1) % stabs.length];
        if (e.key === "ArrowLeft") n = stabs[(i - 1 + stabs.length) % stabs.length];
        if (e.key === "Home") n = stabs[0];
        if (e.key === "End") n = stabs[stabs.length - 1];
        if (n) { e.preventDefault(); pick(n.getAttribute("data-date"), true); }
      });
    });
    $all("[data-goto-day]").forEach(function (a) {
      a.addEventListener("click", function () { pick(a.getAttribute("data-goto-day")); });
    });

    var lastDay = E.schedule[E.schedule.length - 1], lastSess = lastDay.sessions[lastDay.sessions.length - 1];
    var weekOver = function () { return nowMs() > at(lastDay.date, lastSess.end); };
    function refresh() {
      var now = nowMs(), today = watDate(now), over = weekOver();
      stabs.forEach(function (t) {
        var flag = $(".st-today", t); if (flag) flag.hidden = t.getAttribute("data-date") !== today;
        t.classList.toggle("is-today", t.getAttribute("data-date") === today);
      });
      $all(".sched-panel", sched).forEach(function (panel) {
        var nextMarked = false;
        $all(".session", panel).forEach(function (li) {
          var st = +li.getAttribute("data-start"), en = +li.getAttribute("data-end"), lab = $(".session-status", li);
          var state = over ? "" : now >= en ? "ended" : now >= st ? "now" : "";
          if (!state && !nextMarked && watDate(st) === today) { state = "next"; nextMarked = true; }
          li.classList.toggle("is-now", state === "now");
          li.classList.toggle("is-ended", state === "ended");
          lab.hidden = !state;
          lab.className = "session-status" + (state ? " is-" + state : "");
          lab.textContent = state === "now" ? "Happening now" : state === "next" ? "Up next" : state === "ended" ? "Ended" : "";
        });
      });
      return today;
    }
    var today = refresh();
    var hasToday = E.schedule.some(function (d) { return d.date === today; });
    var lectureDay = E.schedule.filter(function (d) { return d.sessions.some(function (s) { return s.highlight; }); })[0];
    pick(hasToday ? today : (weekOver() && lectureDay ? lectureDay.date : E.schedule[0].date));
    setInterval(refresh, 60000);
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

  /* ---------- throwbacks: one tab per past edition ---------- */
  var TB = E.throwbacks || [];
  var album = TB.filter(function (t) { return t.year === "2025"; })[0];
  if (album && album.albumUrl) $all("[data-album]").forEach(function (a) { ext(a, album.albumUrl); });
  var tbEl = $("#tb");
  if (tbEl && TB.length) {
    var PLAY = '<span class="play" aria-hidden="true"></span>';
    var html = TB.length > 1 ? '<div class="tb-tabs" role="tablist" aria-label="Choose a year">' + TB.map(function (t, i) {
      return '<button class="tb-tab" type="button" role="tab" id="tbt-' + esc(t.year) + '" aria-controls="tbp-' + esc(t.year) + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : "") + ">" +
        '<span class="tb-year">' + esc(t.year) + '</span><span class="tb-ed">' + esc(t.edition) + "</span></button>";
    }).join("") + "</div>" : "";
    html += TB.map(function (t, i) {
      var media = "";
      var cards = (t.clips || []).map(function (c) {
        return '<figure class="tb-clip"><div class="tb-clip-frame"><video controls preload="none" playsinline' + (c.poster ? ' poster="' + esc(c.poster) + '"' : "") + ' aria-label="' + esc(t.year + " Registry Week, " + c.label) + '">' +
          '<source src="' + esc(c.mp4) + '" type="video/mp4"></video></div>' +
          '<figcaption><span class="tb-clip-label">' + esc(c.label) + '</span><span class="tb-clip-sub">' + esc(c.sub || "") + "</span></figcaption></figure>";
      }).join("");
      if (t.booklet) {
        cards += '<figure class="tb-clip tb-booklet"><a class="tb-clip-frame" href="' + esc(t.booklet.pdf) + '" target="_blank" rel="noopener" aria-label="Open the ' + esc(t.year) + ' programme e-booklet (PDF)">' +
          '<img src="' + esc(t.booklet.cover) + '" alt="" loading="lazy" width="910" height="1287"><span class="tb-booklet-badge">PDF</span></a>' +
          '<figcaption><span class="tb-clip-label">' + esc(t.booklet.label || "E-booklet") + '</span><span class="tb-clip-sub"><a class="text-link" href="' + esc(t.booklet.pdf) + '" target="_blank" rel="noopener">Open the PDF</a></span></figcaption></figure>';
      }
      if (cards) media += '<div class="tb-clips">' + cards + "</div>";
      if (t.photos && t.photos.length) {
        media += '<div class="gallery">' + t.photos.map(function (ph, k) {
          return '<button class="g-item' + (k === 0 ? " is-lead" : "") + '" type="button" data-tb="' + i + '" data-index="' + k + '" aria-label="View photo: ' + esc(ph.caption) + '">' +
            '<img src="' + esc(ph.src) + '-sm.jpg" alt="' + esc(ph.caption) + '" loading="lazy" width="900" height="600"></button>';
        }).join("") + "</div>";
      }
      var albums = t.albums || (t.albumUrl ? [{ label: "View the full photo album", sub: "Google Photos", url: t.albumUrl }] : []);
      var pressCount = (E.press || []).filter(function (p) { return p.year === t.year; }).length;
      if (albums.length || t.photoCredit || pressCount) {
        media += '<div class="album-row">' +
          (t.photoCredit ? '<p class="photo-credit">' + esc(t.photoCredit) + "</p>" : "") +
          albums.map(function (al) {
            return '<a class="album-link" href="' + esc(al.url) + '" target="_blank" rel="noopener"><span class="al-title">' + esc(al.label) + '</span><span class="al-sub">' + esc(al.sub || "") + "</span></a>";
          }).join("") +
          (pressCount ? '<a class="album-link" href="#press"><span class="al-title">In the press</span><span class="al-sub">' + pressCount + (pressCount === 1 ? " story" : " stories") + "</span></a>" : "") +
          "</div>";
      }
      return '<div class="tb-panel" role="' + (TB.length > 1 ? "tabpanel" : "region") + '" id="tbp-' + esc(t.year) + '"' + (TB.length > 1 ? ' aria-labelledby="tbt-' + esc(t.year) + '"' : "") + (i ? " hidden" : "") + ">" +
        '<div class="maiden-head"><div class="maiden-copy">' +
          '<p class="maiden-kicker">' + esc(t.edition) + ", " + esc(t.year) + "</p>" +
          "<h3>" + esc(t.title) + "</h3>" +
          (t.theme ? '<p class="maiden-theme">' + esc(t.theme) + "</p>" : "") +
          '<p class="maiden-meta">' + esc([t.date, t.venue].filter(Boolean).join(" · ")) + "</p>" +
        "</div>" +
        (t.recording ? '<div class="maiden-actions"><a class="maiden-link" href="' + esc(t.recording) + '" target="_blank" rel="noopener">' + PLAY +
          '<span class="maiden-link-text"><span class="maiden-link-title">Watch the full lecture</span><span class="maiden-link-sub">Recording on YouTube</span></span></a></div>' : "") +
        "</div>" + media + "</div>";
    }).join("");
    tbEl.innerHTML = html;

    var tbTabs = $all(".tb-tab", tbEl);
    function pickYear(tab, focus) {
      tbTabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on)); t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      $all("video", tbEl).forEach(function (v) { if (!v.paused) v.pause(); });
      if (focus) tab.focus();
    }
    tbTabs.forEach(function (t, i) {
      t.addEventListener("click", function () { pickYear(t); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tbTabs[(i + 1) % tbTabs.length];
        if (e.key === "ArrowLeft") n = tbTabs[(i - 1 + tbTabs.length) % tbTabs.length];
        if (n) { e.preventDefault(); pickYear(n, true); }
      });
    });
    // only one clip plays at a time
    $all("video", tbEl).forEach(function (v) {
      v.addEventListener("play", function () { $all("video").forEach(function (o) { if (o !== v && !o.paused) o.pause(); }); });
    });

    var lb = $("#lightbox"), lbImg = $("#lb-img"), cur = 0, curSet = [], lbOpener = null;
    function showPhoto(k) {
      cur = (k + curSet.length) % curSet.length;
      var ph = curSet[cur];
      lbImg.src = ph.src + ".jpg"; lbImg.alt = ph.caption;
      $("#lb-caption").textContent = ph.caption;
      $("#lb-count").textContent = (cur + 1) + " of " + curSet.length;
    }
    $all(".g-item", tbEl).forEach(function (b) {
      b.addEventListener("click", function () {
        curSet = TB[+b.getAttribute("data-tb")].photos;
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

  /* ---------- press coverage ---------- */
  var pl = $("#press-list");
  if (pl && E.press && E.press.length) {
    pl.innerHTML = E.press.map(function (p) {
      var host = "";
      try { host = new URL(p.url).hostname.replace(/^www\./, ""); } catch (e) {}
      return '<li><a class="press-card" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
        '<span class="press-meta"><span class="press-outlet">' + esc(p.outlet) + '</span><span class="press-year">' + esc(p.year) + "</span></span>" +
        '<span class="press-title">' + esc(p.title) + "</span>" +
        '<span class="press-read">Read on ' + esc(host || p.outlet) + EXT + "</span></a></li>";
    }).join("");
  } else if (pl) { $("#press").hidden = true; }

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
