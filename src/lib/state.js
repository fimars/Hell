let state = {
  path: '.',
  current: 'README.md'
}

export function initState (opts) {
  state = Object.assign(state, opts)
}

export function getState (name) {
  return state[name]
}
