var WINDOW_WIDTH = 1024
var WINDOW_HEIGHT = 768
var RADIUS = 8
var MARGIN_TOP = 60
var MARGIN_LEFT = 30

var canvasEl = document.getElementById('canvas')
var ctx = canvasEl.getContext('2d')

canvasEl.width = WINDOW_WIDTH
canvasEl.height = WINDOW_HEIGHT

render(ctx)

function render (ctx) {
  var hour = 12
  var min = 34
  var sec = 56

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour / 10), ctx)
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hour % 10), ctx)
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(min / 10), ctx)
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(min % 10), ctx)
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx)
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(sec / 10), ctx)
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(sec % 10), ctx)
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
