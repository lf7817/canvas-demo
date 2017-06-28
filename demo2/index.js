var WINDOW_WIDTH = document.body.clientWidth
var WINDOW_HEIGHT = document.body.clientHeight
var RADIUS = WINDOW_WIDTH * 4 / 5 / 108 - 1
var MARGIN_TOP = WINDOW_HEIGHT / 5
var MARGIN_LEFT = WINDOW_WIDTH / 10

var balls = []
var colors = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000']
var endTime = new Date(+new Date + 3600000)
var leftTime = getLeftSeconds() // 距离结束时间剩余的秒数

var canvasEl = document.getElementById('canvas')
var ctx = canvasEl.getContext('2d')
canvasEl.width = WINDOW_WIDTH
canvasEl.height = WINDOW_HEIGHT

render()

setInterval(function () {
  render()
  update()
}, 50)

window.onresize = function () {
  canvasEl.width = WINDOW_WIDTH = document.body.clientWidth
  canvasEl.height = WINDOW_HEIGHT = document.body.clientHeight
  MARGIN_LEFT = WINDOW_WIDTH / 10
  MARGIN_TOP = WINDOW_HEIGHT / 5
  RADIUS = WINDOW_WIDTH * 4 / 5 / 108 - 1
}

/**
 * 只在此渲染动画
 */
function render () {
  var hour = parseInt(leftTime / 3600)
  var min = (leftTime - hour * 3600) / 60
  var sec = leftTime % 60
  ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
  renderNum(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10))
  renderNum(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10))
  renderNum(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10)
  renderNum(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(min / 10))
  renderNum(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(min % 10))
  renderNum(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10)
  renderNum(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(sec / 10))
  renderNum(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(sec % 10))

  balls.forEach(function (ball) {
    ctx.fillStyle = ball.color
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, RADIUS, 0, 2 * Math.PI, false)
    ctx.closePath()
    ctx.fill()
  })
}
/**
 * 更新动画状态
 */
function update () {
  var nextLeftTime = getLeftSeconds()
  if (nextLeftTime !== leftTime) {
    var nextHour = parseInt(nextLeftTime / 3600)
    var nextMin = (nextLeftTime - nextHour * 3600) / 60
    var nextSec = nextLeftTime % 60

    var curHour = parseInt(leftTime / 3600)
    var curMin = (leftTime - curHour * 3600) / 60
    var curSec = leftTime % 60

    if (parseInt(nextHour / 10) !== parseInt(curHour / 10)) {
      addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(nextHour / 10))
    }
    if (parseInt(nextHour % 10) !== parseInt(curHour % 10)) {
      addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHour % 10))
    }

    if (parseInt(nextMin / 10) !== parseInt(curMin / 10)) {
      addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMin / 10))
    }
    if (parseInt(nextMin % 10) !== parseInt(curMin % 10)) {
      addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(nextMin % 10))
    }

    if (parseInt(nextSec / 10) !== parseInt(curSec / 10)) {
      addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSec / 10))
    }
    if (parseInt(nextSec % 10) !== parseInt(curSec % 10)) {
      addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSec % 10))
    }
    leftTime = nextLeftTime
  }
  updateBalls()
}

/**
 * 更新小球位置
 */
function updateBalls () {
  balls.forEach(function (ball, index, arr) {
    ball.x += ball.vx
    if (ball.vy !== 0) ball.vy += ball.g
    ball.y += ball.vy
    if (ball.y >= WINDOW_HEIGHT - RADIUS) {
      ball.y = WINDOW_HEIGHT - RADIUS
      ball.vy = -ball.vy * 0.75
      if (Math.abs(ball.vy) <= 0.0000000001) {
        ball.vy = 0
      }
    }
    if (ball.x <= -RADIUS || ball.x >= WINDOW_WIDTH + RADIUS) {
      arr.splice(index, 1)
    }
  })
}
/**
 * 获取距离设定时间的秒数
 */
function getLeftSeconds () {
  var curTime = new Date()
  var ret = Math.round((endTime - curTime.getTime()) / 1000)
  return ret > 0 ? ret : 0
}

/**
 * 渲染点阵数字
 * @param {Number} x 渲染的起始位置
 * @param {Number} y 渲染的起始位置
 * @param {Number} num 需要渲染的数字
 */
function renderNum (x, y, num) {
  ctx.fillStyle = 'rgb(0, 102, 153)'
  digit[num].forEach(function (row, i) {
    row.forEach(function (val, j) {
      if (val === 1) {
        var centerX = x + j * 2 * (RADIUS + 1) + (RADIUS + 1)
        var centerY = y + i * 2 * (RADIUS + 1) + (RADIUS + 1)

        ctx.beginPath()
        ctx.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false)
        ctx.closePath()
        ctx.fill()
      }
    })
  })
}

/**
 * 添加小球到数组，等待render函数渲染
 * @param {Number} x 渲染的起始位置
 * @param {Number} y 渲染的起始位置
 * @param {Number} num 需要渲染的数字
 */
function addBalls (x, y, num) {
  digit[num].forEach(function (row, i) {
    row.forEach(function (val, j) {
      if (val === 1) {
        var ball = {
          x: x + j * 2 * (RADIUS + 1) + RADIUS + 1,
          y: y + i * 2 * (RADIUS + 1) + RADIUS + 1,
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.round(Math.random() * 1000)) * 5,
          vy: -12,
          color: colors[Math.round(Math.random() * colors.length)]
        }
        balls.push(ball)
      }
    })
  })
}
