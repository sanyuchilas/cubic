
export const myIntervals = {
  intervals: new Set(),
  // @ts-ignore
  create(...args) {
    // @ts-ignore
    const newInterval = setInterval(...args)
    this.intervals.add(newInterval)
    return newInterval
  },
  // @ts-ignore
  clear(id) {
    this.intervals.delete(id)
    return clearInterval(id)
  },
  clearAll() {
    // @ts-ignore
    this.intervals.forEach(id => clearInterval(id))
    this.intervals.clear()
  }
}