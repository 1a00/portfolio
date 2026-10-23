export const THEME_STORAGE_KEY = "theme";

/**
 * Roda no <head> antes da primeira pintura: aplica o tema salvo ou o do
 * sistema, e acompanha o sistema enquanto não houver escolha manual.
 */
export const themeScript = `(function(){var d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)");function s(){try{return localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){return null}}function a(){var t=s();d.dataset.theme=t==="light"||t==="dark"?t:m.matches?"dark":"light"}a();m.addEventListener("change",a)})()`;
