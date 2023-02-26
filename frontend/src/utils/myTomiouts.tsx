export const myTimeouts = {
  timeouts: new Set(),
  // @ts-ignore
  create(...args) {
    // @ts-ignore
    const newTimeout = setTimeout(...args)
    this.timeouts.add(newTimeout)
    return newTimeout
  },
  // @ts-ignore
  clear(id) {
    this.timeouts.delete(id)
    return clearTimeout(id)
  },
  clearAll() {
    // @ts-ignore
    this.timeouts.forEach(id => clearTimeout(id))
    this.timeouts.clear()
  }
}