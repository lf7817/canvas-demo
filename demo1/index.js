/**
 * 绘制时钟
 */
var canvasEl = document.querySelector('#canvas')
var ctx = canvasEl.getContext('2d')
canvasEl.width = 400
canvasEl.height = 400
var width = ctx.canvas.width
var height = ctx.canvas.height
var r = width / 2
var rem = width / 200

draw()
setInterval(draw, 1000)

function draw () {
  var now = new Date()
  var h = now.getHours()
  var m = now.getMinutes()
  var s = now.getSeconds()
  ctx.clearRect(0, 0, width, height)
  ctx.save()
  drawBackground()
  drawHour(h, m)
  drawMin(m)
  drawSec(s)
  drawDot()
  ctx.restore()
}

function drawBackground () {
  // 将原点由左上角移到正中心
  ctx.translate(r, r)
  ctx.beginPath()
  ctx.lineWidth = 10 * rem
  ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false)
  ctx.stroke()

  var hourNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
  ctx.font = 18 * rem + 'px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  hourNumber.forEach(function (hour, index) {
    var rad = 2 * Math.PI / 12 * index
    var y = (r - 30 * rem) * Math.sin(rad)
    var x = (r - 30 * rem) * Math.cos(rad)
    ctx.fillText(hour, x, y)
  })

  for (var i = 0; i < 60; i++) {
    var rad = 2 * Math.PI / 60 * i
    var y = (r - 18 * rem) * Math.sin(rad)
    var x = (r - 18 * rem) * Math.cos(rad)
    ctx.beginPath()
    if (i % 5 === 0) {
      ctx.fillStyle = '#000'
      ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false)
    } else {
      ctx.fillStyle = '#ccc'
      ctx.arc(x, y, 1 * rem, 0, 2 * Math.PI, false)
    }
    ctx.fill()
  }
}

function drawHour (hour, min) {
  var rad = 2 * Math.PI / 12 * hour
  var mrad = 2 * Math.PI / 12 / 60 * min
  ctx.save()
  ctx.beginPath()
  ctx.rotate(rad + mrad)
  ctx.lineWidth = 6 * rem
  ctx.lineCap = 'round'
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r / 2)
  ctx.stroke()
  ctx.restore()
}

function drawMin (min) {
  var rad = 2 * Math.PI / 60 * min
  ctx.save()
  ctx.beginPath()
  ctx.rotate(rad)
  ctx.lineWidth = 3 * rem
  ctx.lineCap = 'round'
  ctx.moveTo(0, 10 * rem)
  ctx.lineTo(0, -r + 30 * rem)
  ctx.stroke()
  ctx.restore()
}

function drawSec (sec) {
  var rad = 2 * Math.PI / 60 * sec
  ctx.save()
  ctx.beginPath()
  ctx.fillStyle = '#c14543'
  ctx.rotate(rad)
  ctx.moveTo(-2 * rem, 20 * rem)
  ctx.lineTo(2 * rem, 20 * rem)
  ctx.lineTo(1, -r + 18 * rem)
  ctx.lineTo(-1, -r + 18 * rem)
  ctx.fill()
  ctx.restore()
}

function drawDot () {
  ctx.beginPath()
  ctx.fillStyle = '#fff'
  ctx.arc(0, 0, 2 * rem, 0, 2 * Math.PI, false)
  ctx.fill()
}
