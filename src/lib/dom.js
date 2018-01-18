export function $ (id) {
  return document.getElementById(id)
}

export function $$ (...args) {
  return document.querySelectorAll(...args)
}
