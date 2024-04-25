const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let boxData = []
let tetrisData = []
const blockConfig = {
  level: 10,
}
let activeBlock = []
function setBackground (init = true) {
  const size = canvas.width / blockConfig.level
  for (let row = 0; row < blockConfig.level * 2; row++) {
    const arr = []
    const tetrisArr = []
    for (let column = 0; column < blockConfig.level; column++) {
      const block = new Block({
        ctx,
        x: size * column,
        y: size * row,
        size: size,
        color: '#ded9d9'
      })
      arr.push(block)
      tetrisArr.push(0)
    }
    if (init) {
      boxData.push(arr)
      tetrisData.push(tetrisArr)
    }
  }
}
ctx.fillStyle = '#000000'
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.stroke()
setBackground()
const downStack = {
  0: [[0,5],[0,6], [1,6],[1,7]]
}
let downBlock = downStack[0]
function renderDownBlock () {
  const size = canvas.width / blockConfig.level
  const block = new TetrisBlock({
    ctx,
    tetrisData,
    type: downBlock,
    size,
    color: 'red'
  })
  activeBlock = block
  setDown()
}
renderDownBlock()
function renderTetrisView () {
  ctx.beginPath()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.stroke()
  setBackground(false)
  activeBlock.render()
  requestAnimationFrame(renderTetrisView)
}

function setDown () {
  setInterval(() => {
    activeBlock.down()
  }, 1000)
}
const keyFunction = {
  'ArrowLeft': leftHandle,
  'ArrowRight': rightHandle,
  'ArrowDown': downHandle,
}
function leftHandle () {
  activeBlock.left()
}
function rightHandle () {
  activeBlock.right()
}
function downHandle () {
  activeBlock.down()
}
document.addEventListener('keydown', (e) => {
  const keyCode = e.key
  keyFunction[keyCode]?.()
})


requestAnimationFrame(renderTetrisView)
