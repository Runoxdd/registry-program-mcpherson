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
  function bioHtml(sp) {
    if (!sp.bio) return '<p class="bio bio-pending">Biography to be published shortly.</p>';
    return sp.bio.split(/\n\n+/).map(function (p) { return '<p class="bio">' + esc(p) + "</p>"; }).join("");
  }
  $("#speaker-list").innerHTML = E.speakers.map(function (sp) {
    return (
      '<article class="speaker" id="speaker-' + esc(sp.id) + '">' +
        '<figure class="speaker-photo"><img src="' + esc(sp.photo) + '" alt="Portrait of ' + esc(sp.name) + '" loading="lazy" width="640" height="800"></figure>' +
        '<div class="speaker-body">' +
          '<p class="speaker-role">' + esc(sp.role) + "</p>" +
          "<h3>" + esc(sp.name) + "</h3>" +
          (sp.postnominals ? '<p class="speaker-pn">' + esc(sp.postnominals) + "</p>" : "") +
          '<p class="speaker-title">' + esc(sp.title) + "</p>" +
          bioHtml(sp) +
        "</div>" +
      "</article>"
    );
  }).join("");

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
