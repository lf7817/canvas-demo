var WINDOW_WIDTH = document.body.clientWidth
var WINDOW_HEIGHT = document.body.clientHeight
var RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1
var MARGIN_TOP = WINDOW_HEIGHT / 5
var MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)

var endTime = new Date(+new Date() + 3600000)
var curShowTimeSeconds = 0
var balls = []
var colors = ['#33B5E5', '#0099CC', '#AA66CC', '#9933CC', '#99CC00', '#669900', '#FFBB33', '#FF8800', '#FF4444', '#CC0000']
var canvasEl = document.getElementById('canvas')
var ctx = canvasEl.getContext('2d')
canvasEl.width = WINDOW_WIDTH
canvasEl.height = WINDOW_HEIGHT

curShowTimeSeconds = getCurrentShowTimeSeconds()
render(ctx)

setInterval(function () {
  render(ctx)
  update()
}, 50)

window.onresize = function () {
  WINDOW_WIDTH = document.body.clientWidth
  WINDOW_HEIGHT = document.body.clientHeight
  RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1
  MARGIN_TOP = WINDOW_HEIGHT / 5
  MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10)
  canvasEl.width = WINDOW_WIDTH
  canvasEl.height = WINDOW_HEIGHT
}

function update () {
  var nextShowTimeSeconds = getCurrentShowTimeSeconds()
  if (nextShowTimeSeconds !== curShowTimeSeconds) {
    var nextHour = parseInt(nextShowTimeSeconds / 3600)
    var nextMin = parseInt((nextShowTimeSeconds - nextHour * 3600) / 60)
    var nextSec = parseInt(nextShowTimeSeconds % 60)

    var curHour = parseInt(curShowTimeSeconds / 3600)
    var curMin = (curShowTimeSeconds - curHour * 3600) / 60
    var curSec = curShowTimeSeconds % 60

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
      addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(nextHour / 10))
    }
    if (parseInt(nextSec % 10) !== parseInt(curSec % 10)) {
      addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSec % 10))
    }

    curShowTimeSeconds = nextShowTimeSeconds
  }
  updateBalls()
  // console.log(balls.length)
}

function getCurrentShowTimeSeconds () {
  // 倒计时效果
  var curTime = new Date()
  var ret = endTime.getTime() - curTime
  ret = Math.round(ret / 1000)
  return ret >= 0 ? ret : 0

  // 时钟效果
  // var curTime = new Date()
  // var ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds()
  // return ret
}

function render (ctx) {
  var hour = parseInt(curShowTimeSeconds / 3600)
  var min = (curShowTimeSeconds - hour * 3600) / 60
  var sec = curShowTimeSeconds % 60

  ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), ctx)
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), ctx)
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(min / 10), ctx)
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(min % 10), ctx)
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(sec / 10), ctx)
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(sec % 10), ctx)

  balls.forEach(function (ball) {
    ctx.fillStyle = ball.color
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, RADIUS, 0, 2 * Math.PI, false)
    ctx.closePath()
    ctx.fill()
  })
}

function renderDigit (x, y, num, ctx) {
  ctx.fillStyle = 'rgb(0, 102, 153)'

  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        var centerX = x + j * 2 * (RADIUS + 1) + (RADIUS + 1)
        var centerY = y + i * 2 * (RADIUS + 1) + (RADIUS + 1)
        ctx.beginPath()
        ctx.arc(centerX, centerY, RADIUS, 0, 2 * Math.PI, false)
        ctx.closePath()
        ctx.fill()
      }
    }
  }
}

function addBalls (x, y, num) {
  for (var i = 0; i < digit[num].length; i++) {
    for (var j = 0; j < digit[num][i].length; j++) {
      if (digit[num][i][j] === 1) {
        var ball = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(1000 * Math.random())) * 4,
          vy: -12,
          color: colors[Math.floor(Math.random() * colors.length)]
        }
        balls.push(ball)
      }
    }
  }
}

function updateBalls () {
  balls.forEach(function (ball, index, arr) {
    ball.x += ball.vx
    ball.y += ball.vy
    ball.vy += ball.g

    if (ball.y >= WINDOW_HEIGHT - RADIUS) {
      ball.y = WINDOW_HEIGHT - RADIUS
      ball.vy = -ball.vy * 0.6
      if (Math.abs(ball.vy) <= 2) {
        // console.log(ball.vy)
        ball.vy = 0
        ball.y = WINDOW_HEIGHT - RADIUS
      }
    }
    if (ball.x <= -RADIUS || ball.x >= WINDOW_WIDTH + RADIUS) {
      arr.splice(index, 1)
    }
  })
}
