export async function fetchFile (url) {
  const resp = await fetch(url)
  const content = await resp.text()
  return content
}
