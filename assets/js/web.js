// MàrCAT · comportament de la web (marcat.app)
// Sense dependències ni galetes: només detecta el dispositiu per posar
// primer el botó que toca, anima les seccions en fer scroll i dona fons
// a la capçalera quan es baixa.

(function () {
  "use strict";

  var html = document.documentElement;
  html.classList.remove("sense-js");

  // --- Dispositiu: iPhone/iPad, Android o ordinador -------------------
  var ua = navigator.userAgent || "";
  // Els iPad moderns es presenten com a Mac amb pantalla tàctil.
  var esIOS = /iPhone|iPad|iPod/i.test(ua) ||
    (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  var esAndroid = /Android/i.test(ua);

  if (esIOS) {
    html.classList.add("es-iphone");
  } else if (esAndroid) {
    html.classList.add("es-android");
  } else {
    html.classList.add("es-escriptori");
  }

  // A l'iPhone, el botó de la versió web passa al davant i es destaca;
  // a Android, el de Google Play. A l'ordinador queden tots dos iguals.
  document.querySelectorAll("[data-descarregues]").forEach(function (grup) {
    var play = grup.querySelector("[data-boto='play']");
    var web = grup.querySelector("[data-boto='web']");
    if (!play || !web) return;

    if (esIOS) {
      grup.insertBefore(web, play);
      web.classList.remove("secundari");
      web.classList.add("brilla");
      play.classList.add("secundari");
      play.classList.remove("brilla");
    }
  });

  // --- Capçalera amb fons en baixar ------------------------------------
  var capcalera = document.querySelector(".capcalera");
  function revisaCapcalera() {
    if (!capcalera) return;
    capcalera.classList.toggle("amb-fons", window.scrollY > 12);
  }
  revisaCapcalera();
  window.addEventListener("scroll", revisaCapcalera, { passive: true });

  // --- Aparició de seccions en fer scroll ------------------------------
  var elements = document.querySelectorAll(".apareix");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var observador = new IntersectionObserver(function (entrades) {
      entrades.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    elements.forEach(function (el) { observador.observe(el); });
  }

  // --- Any del peu -----------------------------------------------------
  document.querySelectorAll("[data-any]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
