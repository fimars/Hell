import scrollIntoView from 'scroll-into-view'
import { $ } from './dom'

export async function fetchFile (url) {
  const resp = await fetch(url)
  if (resp.ok) {
    const result = await resp.text()
    return result
  } else {
    throwError(resp.statusText)
  }
}

export function jumpTo (id) {
  scrollIntoView($('#' + id))
}

export function throwError (message) {
  throw new Error(message)
}
