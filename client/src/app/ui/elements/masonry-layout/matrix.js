export default class Matrix {
  constructor(
    maxWidth = Number.MAX_SAFE_INTEGER,
    maxHeight = Number.MAX_SAFE_INTEGER
  ) {
    this.maxWidth = maxWidth
    this.maxHeight = maxHeight
  }

  place(index, w, h) {
    const { x, y, ...size } = this.find(w, h)

    for (let col = x; col < x + size.w; col++) {
      for (let row = y; row < y + size.h; row++) {
        this.set(col, row, index)
      }
    }

    return { x, y, ...size }
  }

  enoughSpace(x, y, w, h) {
    for (let row = y; row < y + h; row++) {
      for (let col = x; col < x + w; col++) {
        if (col >= this.maxWidth) {
          return false
        }

        if (this.get(col, row)) {
          return false
        }
      }
    }

    return true
  }

  find(w, h) {
    const fitWidth = w > this.maxWidth ? this.maxWidth : w

    for (let row = 0; row < this.maxHeight; row++) {
      for (let col = 0; col < this.maxWidth; col++) {
        if (this.enoughSpace(col, row, fitWidth, h)) {
          return {
            x: col,
            y: row,
            w: fitWidth,
            h
          }
        }
      }
    }

    return {}
  }

  get(x, y) {
    if (x >= this.maxWidth) {
      return true
    }

    return this._matrix && this._matrix[ y ] && this._matrix[ y ][ x ]
  }

  set(x, y, value) {
    if (!this._matrix) {
      this._matrix = {}
    }

    if (!this._matrix[ y ]) {
      this._matrix[ y ] = {}
    }

    this._matrix[ y ][ x ] = value
  }
}
