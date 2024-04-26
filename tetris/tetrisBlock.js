class TetrisBlock {
  constructor(opt) {
    this.color = opt.color || 'red'
    this.ctx = opt.ctx
    this.size = opt.size
    this.type = opt.type
    this.blocks = [...this.type]
    this.lock = false
    this.leftLock = false
    this.rightLock = false
    this.tetirsData = opt.tetrisData
    this.maxRow = this.tetirsData.length
    this.maxColumn = this.tetirsData[0].length
    this.render()
  }
  setMax () {
    this.blocks.forEach(block => {
      const span = block[1]
      for (let i = this.tetirsData.length -1; i >= 0; i--) {
        if (this.tetirsData[i][span] === 0) {
          this.maxRow = Math.min(this.maxRow, i - block[0])
          return
        }
      }
    })
    if (this.maxRow === 0) {
      this.lock = true
    }
    console.log(this.maxRow, 'maxRow')
  }
  down () {
    if (this.lock) {
      return
    }
    this.blocks.forEach(block => {
      block[0]++
    })
    this.setMax()
  }
  left () {
    if (this.lock || this.leftLock) {
      return
    }
    let lock = false
    this.blocks.forEach(block => {
      block[1]--
      if (block[1] === 0) {
        lock = true
      }
    })
    this.rightLock = false
    this.leftLock = lock
    this.setMax()
  }
  right () {
    if (this.lock || this.rightLock) {
      return
    }
    let lock = false
    this.blocks.forEach(block => {
      block[1]++
      if (block[1] === this.maxColumn - 1) {
        lock = true
      }
    })
    this.leftLock = false
    this.rightLock = lock
    this.setMax()
  }
  render () {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color
    this.type.forEach(block => {
      this.ctx.fillRect(block[1] * this.size , block[0] * this.size, this.size, this.size)
    })
  }
}
