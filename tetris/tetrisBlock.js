class TetrisBlock {
  constructor(opt) {
    this.ctx = opt.ctx
    this.color = opt.color || '#3498DB'
    this.size = opt.size
    this.type = opt.type
    this.module = new this.type()
    this.blocks = [...this.module.render([0, 4])]
    this.lock = false
    this.leftLock = false
    this.rightLock = false
    this.tetirsData = opt.tetrisData
    this.maxRow = this.tetirsData.length - 1
    this.maxColumn = this.tetirsData[0].length
    this.over = opt.over
    this.lockHandle = opt.lockHandle
    this.render()
    this.setMax()
  }
  setMax (list = this.blocks) {
    list?.forEach(block => {
      const span = block[1]
      for (let i = block[0]; i < this.tetirsData.length; i++) {
        if (i === this.tetirsData.length - 1) {
          this.maxRow = Math.min(this.maxRow, i - block[0])
          return
        }else if (this.tetirsData[i][span] !== 0) {
          this.maxRow = Math.min(this.maxRow, i - block[0] - 1)
          return
        }
      }
    })
    if (this.maxRow === 0) {
      this.lock = true
    }
  }
  up () {
    const blocks = this.module.change(this.blocks[0])
    this.setMax(blocks)
    console.log(blocks)
    if (this.lock) {
      return
    }
    this.blocks = blocks
  }
  down () {
    if (this.lock) {
      this.lockHandle()
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
    const isOver = this.blocks.find(block => {
      return this.tetirsData[block[0]][block[1]]
    })
    if (isOver) {
      this.over()
      return
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color
    this.blocks.forEach(block => {
      this.ctx.fillRect(block[1] * this.size , block[0] * this.size, this.size, this.size)
    })
  }
}
