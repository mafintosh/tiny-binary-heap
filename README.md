# tiny-binary-heap

Tiny binary heap with no dependencies

```
npm install tiny-binary-heap
```

## Usage

``` js
const Heap = require('tiny-binary-heap')

const h = new Heap(cmp) // cmp defaults to a < b ? -1 : a > b ? 1 : 0

h.push(42) // insert a value
h.shift() // shift the next sorted value
h.peek() // look at the next sorted value
h.length // how many values are in the heap?
```

## License

MIT
