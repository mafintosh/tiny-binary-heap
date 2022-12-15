module.exports = class TinyBinaryHeap {
  constructor (cmp = defaultCompare, initialSize = 64) {
    this.heap = new Array(initialSize)
    this.length = 0
    this.cmp = cmp
  }

  push (val) {
    let pos = ++this.length

    if (this.length === this.heap.length) this.heap.length *= 2

    for (; pos > 1 && this.cmp(val, this.heap[(pos / 2) | 0]) < 0; pos = (pos / 2) | 0) {
      this.heap[pos] = this.heap[(pos / 2) | 0]
    }

    this.heap[pos] = val
  }

  peek () {
    return this.heap[1]
  }

  shift () {
    if (this.length === 0) return
    const min = this.heap[1]
    const length = this.length--
    this.heap[1] = this.heap[length]
    this.heap[length] = undefined
    this._down(1)
    return min
  }

  update () {
    this._down(1)
  }

  filter (fn) { // TODO: can prob be done smarter, research
    const all = []

    for (let pos = 0; pos < this.heap.length; pos++) {
      const val = this.heap[pos]
      if (val === undefined) continue
      if (fn(val)) all.push(val)
      this.heap[pos] = undefined
    }

    this.length = 0

    for (let i = 0; i < all.length; i++) {
      this.push(all[i])
    }
  }

  _down (pos) {
    const val = this.heap[pos]
    let cPos = 0

    for (; 2 * pos <= this.length; pos = cPos) {
      cPos = 2 * pos

      if (cPos !== this.length && this.cmp(this.heap[cPos], this.heap[cPos + 1]) > 0) cPos++

      if (this.cmp(val, this.heap[cPos]) > 0) this.heap[pos] = this.heap[cPos]
      else break
    }

    this.heap[pos] = val
  }
}

function defaultCompare (a, b) {
  return a < b ? -1 : a > b ? 1 : 0
}
