const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let boxData = []
let tetrisData = []
const blockConfig = {
  level: 10,
  size: canvas.width / 10
}
let isOver = false
let activeBlock = []
const colorList = ['#3498DB', '#E74C3C', '#F1C40F', '#2ECC71', '#8E44AD', '#D35400']
let colorIndex = 0
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
function renderDownBlock () {
  if (isOver) {
   return
  }
  activeBlock = new TetrisBlock({
    ctx,
    type: ModuleOne,
    tetrisData,
    size: blockConfig.size,
    color: colorList[colorIndex],
    over: gameOver,
    lockHandle: () => {
      activeBlock.blocks.forEach(item => {
        tetrisData[item[0]][item[1]] = 1
        boxData[item[0]][item[1]].fillColor = activeBlock.color
      })
      renderDownBlock()
    }
  })
  colorIndex = colorIndex >= colorList.length - 1 ? 0 : colorIndex + 1
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
  if (!isOver) {
    requestAnimationFrame(renderTetrisView)
  }
}

function setDown () {
  setInterval(() => {
    if (isOver) {
      return
    }
    if (activeBlock.lock) {
    
    }else {
      activeBlock.down()
    }
  }, 1000)
}
document.addEventListener('keydown', (e) => {
  const keyCode = e.key
  console.log(keyCode)
  switch (keyCode) {
    case 'ArrowLeft': activeBlock.left();break
    case 'ArrowRight': activeBlock.right();break
    case 'ArrowDown': activeBlock.down();break
    case 'ArrowUp': activeBlock.up();break
  }
})

function gameOver () {
  isOver = true
  window.alert('game over')
}

requestAnimationFrame(renderTetrisView)
