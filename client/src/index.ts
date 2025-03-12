import { $, $$, onClick } from "./core.js";

onClick("#menu__to-character", e => {
  $$(".menu").forEach(menu => menu.classList.add("hidden"));
  $("#menu__character")?.classList.remove("hidden");
});

onClick("#menu__to-campaign", e => {
  $$(".menu").forEach(menu => menu.classList.add("hidden"));
  $("#menu__campaign")?.classList.remove("hidden");
});

onClick("#menu__to-main", e => {
  $$(".menu").forEach(menu => menu.classList.add("hidden"));
  $("#menu__main")?.classList.remove("hidden");
});

onClick("#menu__to-character-page", e => {
  window.location.href = "/pages/char";
})


