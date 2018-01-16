import scrollIntoView from 'scroll-into-view'

export async function fetchFile (url) {
  const resp = await fetch(url)
  const content = await resp.text()
  return content
}

export function scrollToElement (id) {
  if (id) scrollIntoView(document.getElementById(id))
}
