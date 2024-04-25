class Block {
  constructor(opt) {
    this.x = opt.x
    this.y = opt.y
    this.color = opt.color || '#000000'
    this.ctx = opt.ctx
    this.size = opt.size
    this.fillColor = '#000000'
    this.isFill = false
    this.init()
  }
  init () {
    this.render()
  }
  
  setStroke () {
    this.ctx.strokeStyle = this.color
    this.ctx.rect(this.x, this.y, this.size, this.size)
    this.ctx.stroke()
  }
  
  unFill () {
    this.isFill = false
    this.ctx.fillStyle = '#000000'
    this.ctx.fillRect(this.x, this.y, this.size, this.size)
  }
  render () {
    this.isFill = true
    this.ctx.fillStyle = this.fillColor
    this.ctx.fillRect(this.x, this.y, this.size, this.size)
    this.setStroke()
  }
}

