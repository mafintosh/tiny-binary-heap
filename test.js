const test = require('brittle')
const Heap = require('./')

test('tons of random permutations', function (t) {
  const h = new Heap()
  const expected = []

  while (expected.length < 500) {
    const r = Math.random()
    expected.push(r)
    h.push(r)
  }

  expected.sort(h.cmp).reverse()

  let n = 3
  while (expected.length) {
    t.is(h.peek(), expected[expected.length - 1])
    t.is(h.shift(), expected.pop())

    if (--n === 0) {
      n = 3
      const r = Math.random()
      expected.push(r)
      h.push(r)
      expected.sort(h.cmp).reverse()
    }
  }

  t.is(h.length, 0)
})
