export function onClick(selector: string, callback: (e: Event) => void) {
  return $$(selector).forEach(element => element.addEventListener("click", callback));
}

export function $(selector: string) {
  return document.querySelector(selector);
}

export function $$(selector: string) {
  return document.querySelectorAll(selector);
}

export function uuid() {
  return crypto.getRandomValues(new Uint32Array(4)).join('-');
}