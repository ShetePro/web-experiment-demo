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

class ModuleOne {
  constructor() {
    this.xy = []
    this.direction = 'right'
  }
  render (origin) {
    const callback = this.direction === 'left' ? this.leftType : this.rightType
    callback.call(this,origin)
    return this.xy
  }
  leftType (origin) {
    const one = origin
    const two =[one[0] + 1, origin[1]]
    const three = [two[0], two[1] - 1]
    const four = [three[0] + 1, three[1]]
    this.xy = [one, two, three, four]
  }
  rightType (origin) {
    const two =[origin[0], origin[1] + 1]
    const three = [two[0] + 1, two[1]]
    const four = [three[0], three[1] + 1]
    this.xy = [origin, two, three, four]
  }
  change (origin) {
    this.direction = this.direction === 'left' ? 'right' : 'left'
    return this.render(origin)
  }
  
}
