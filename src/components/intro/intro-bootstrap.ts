export const INTRO_BOOTSTRAP_SCRIPT = `(function () {
  var langKey = "app-language";
  var valid = { pt: 1, en: 1, es: 1 };

  document.documentElement.setAttribute("data-intro", "1");

  var cookie = document.cookie.match(/(?:^|; )app-language=([^;]*)/);
  var locale = cookie && valid[cookie[1]] ? cookie[1] : "";
  if (!locale) {
    try {
      var stored = localStorage.getItem(langKey);
      if (stored && valid[stored]) locale = stored;
    } catch (error) {}
  }

  var path = location.pathname;
  var first = path.split("/").filter(Boolean)[0] || "";
  var pathLocale = valid[first] ? first : "";

  if (!locale) {
    if (pathLocale) {
      locale = pathLocale;
    } else {
      var languages =
        navigator.languages && navigator.languages.length
          ? navigator.languages
          : [navigator.language];
      for (var i = 0; i < languages.length; i++) {
        var base = String(languages[i] || "").toLowerCase().split("-")[0];
        if (valid[base]) {
          locale = base;
          break;
        }
      }
      locale = locale || (languages[0] ? "en" : "pt");
    }
    document.cookie =
      langKey + "=" + locale + ";path=/;max-age=31536000;samesite=lax";
    try {
      localStorage.setItem(langKey, locale);
    } catch (error) {}
  }

  if (path !== "/" && path !== "") return;

  var prefetch = document.createElement("link");
  prefetch.rel = "prefetch";
  prefetch.href = "/" + locale;
  prefetch.as = "document";
  document.head.appendChild(prefetch);
})();`;
