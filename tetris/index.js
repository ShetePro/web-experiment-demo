const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let boxData = []
let tetrisData = []
const blockConfig = {
  level: 10,
  size: canvas.width / 10
}
let activeBlock = []
function setBackground (init = true) {
  const size = blockConfig.size
  for (let row = 0; row < blockConfig.level * 2; row++) {
    const arr = []
    const tetrisArr = []
    for (let column = 0; column < blockConfig.level; column++) {
      
      if (init) {
        const block =  new Block({
          ctx,
          x: size * column,
          y: size * row,
          size: size,
          color: '#ded9d9'
        })
        arr.push(block)
        tetrisArr.push(0)
      }else {
        boxData[row][column].render()
      }
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
function renderDownBlock (color = 'red') {
  activeBlock = new TetrisBlock({
    ctx,
    tetrisData,
    type: [[0,5],[0,6], [1,6],[1,7]],
    size: blockConfig.size,
    color
  })
}
renderDownBlock()
setDown()
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
    if (activeBlock.lock) {
      activeBlock.blocks.forEach(item => {
        tetrisData[item[0]][item[1]] = 1
        boxData[item[0]][item[1]].fillColor = activeBlock.color
      })
      renderDownBlock('green')
      console.log(boxData)
    }else {
      activeBlock.down()
    }
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
