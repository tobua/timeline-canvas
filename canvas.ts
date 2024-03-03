// import * as bezierImport from 'bezier-js'
import type { Labels, Values } from './data'
import { Color, Space } from './style'

// const Bezier = bezierImport.Bezier

let context: CanvasRenderingContext2D
let values: Values<number> = []
let labels: Labels<number> = {}

const sizes = {
  padding: 50,
  paddingRight: 100,
  width: 1000,
  height: 500,
  chartWidth: 850,
  chartHeight: 400,
  xStart: 50,
  xEnd: 900,
  yStart: 450,
  yEnd: 50,
}

function findMaximumRange(partialValues: Values<number>) {
  let max = 0

  for (const value of partialValues) {
    for (const labelKey in labels) {
      if (value[labelKey] > max) {
        max = value[labelKey]
      }
    }
  }

  return max
}

function drawPoint(x: number, y: number, color = Color.black) {
  context.beginPath()
  context.arc(x, y, 5, 0, Math.PI * 2)
  context.fillStyle = color
  context.fill()
}

function drawImage(url: string, x: number, y: number, width: number, height: number) {
  const image = new Image()
  image.src = url
  image.onload = () => {
    context.drawImage(image, x, y, width, height)
  }
}

function drawUnit(value: string | number, unit?: string) {
  context.beginPath()

  const padding = Space.small
  context.font = '36px Arial'
  const textMeasure = context.measureText(String(value))
  const boxWidth = textMeasure.width + 2 * padding
  const boxHeight = textMeasure.fontBoundingBoxAscent + 2 * padding + 2 * padding

  context.fillStyle = Color.gray[300]
  context.roundRect(sizes.xStart + 2 * padding, sizes.yEnd - boxHeight / 2 + padding / 2, boxWidth, boxHeight, Space.small)
  context.fill()

  context.fillStyle = Color.black
  context.textAlign = 'left'
  context.fillText(String(value), sizes.xStart + 3 * padding, sizes.yEnd + padding - 2)

  if (unit) {
    context.font = '18px Arial'
    context.textAlign = 'center'
    context.fillText(unit, sizes.xStart + 7 * padding, sizes.yEnd + 3 * padding)
  }
}

function drawLabel(text: string, image: string, x: number, y: number) {
  context.beginPath()

  const padding = Space.small
  const imageSize = Space.medium
  context.font = '24px Arial'
  const textWidth = context.measureText(text).width
  const boxWidth = textWidth + 2 * padding + imageSize + padding
  const boxHeight = imageSize + 2 * padding

  context.fillStyle = Color.gray[300]
  context.roundRect(x + padding, y - boxHeight / 2, boxWidth, boxHeight, Space.small)
  context.fill()

  context.fillStyle = Color.black

  context.textAlign = 'left'
  context.fillText(text, x + 3 * padding + imageSize, y + padding - 2)

  drawImage(image, x + 2 * padding, y - padding, imageSize, imageSize)
}

export function renderLinesUntilIndex(maxIndex: number) {
  const dataUntilIndex = values.slice(0, maxIndex)
  const maximumRange = findMaximumRange(dataUntilIndex)

  // TODO unit configurable.
  drawUnit(values[maxIndex - 1].unit, 'Year')

  for (const labelKey in labels) {
    const { label, image, color } = labels[labelKey]
    const previousPoint = { x: 0, y: 0 }
    const currentPoint = { x: 0, y: 0 }
    const nextPoint = { x: 0, y: 0 }
    context.beginPath()
    context.lineWidth = 4
    context.strokeStyle = color
    dataUntilIndex.forEach((value, index) => {
      const currentValue = value[labelKey]
      const nextValue = values[index + 1][labelKey]

      if (currentPoint.x === 0 && currentPoint.y === 0) {
        currentPoint.x = index === 0 ? sizes.xStart : sizes.xStart + (sizes.chartWidth / (maxIndex - 1)) * index
        currentPoint.y = sizes.yStart - (currentValue / maximumRange) * sizes.chartHeight
      }

      nextPoint.x = index === 0 ? sizes.xStart : sizes.xStart + (sizes.chartWidth / (maxIndex - 1)) * index
      nextPoint.y = sizes.yStart - (nextValue / maximumRange) * sizes.chartHeight

      if (index > 0) {
        // https://pomax.github.io/bezierjs/#fromPoints
        // const dpoints = Bezier.quadraticFromPoints(previousPoint, currentPoint, nextPoint, 0.6).points[1]
        // context.quadraticCurveTo(dpoints.x, dpoints.y, currentPoint.x, currentPoint.y)
        context.lineTo(currentPoint.x, currentPoint.y)
        // context.bezierCurveTo(xc, yc, xcp, ycp, positionX, positionY)
      } else {
        context.moveTo(currentPoint.x, currentPoint.y)
      }

      previousPoint.x = currentPoint.x
      previousPoint.y = currentPoint.y

      currentPoint.x = nextPoint.x
      currentPoint.y = nextPoint.y
    })
    context.stroke()
    drawLabel(label, image, previousPoint.x, previousPoint.y)
  }
}

export function clearCanvas() {
  context.fillStyle = 'red'
  context.clearRect(0, 0, sizes.width, sizes.height)
}

function labelAxes() {
  context.fillStyle = Color.black
  context.font = '24px Arial'
  context.textAlign = 'center'
  context.fillText('Time', sizes.width / 2, sizes.height - 0.4 * sizes.padding)
  context.save()
  context.translate(30, sizes.height / 2)
  context.rotate(-Math.PI / 2)
  context.textAlign = 'center'
  context.fillText('Value', 0, 0)
  context.restore()
}

function drawAxes() {
  context.beginPath()
  context.strokeStyle = Color.black
  context.lineWidth = 2
  context.moveTo(sizes.xStart, sizes.yStart - 1)
  context.lineTo(sizes.xEnd, sizes.yStart)
  context.stroke()

  context.beginPath()
  context.lineWidth = 2
  context.moveTo(sizes.xStart, sizes.yStart)
  context.lineTo(sizes.xStart, sizes.yEnd)
  context.stroke()
}

export function renderStaticCanvasParts() {
  context.fillStyle = Color.gray[100]
  context.fillRect(0, 0, sizes.width, sizes.height)

  drawAxes()
  labelAxes()

  // TODO remove, used for debugging.
  drawPoint(sizes.xStart, sizes.yStart, Color.black)
}

export function addChartData(data: { values: Values<number>; labels: Labels<number> })  {
  values = data.values
  labels = data.labels
}

export function intializeCanvas(canvas: HTMLCanvasElement) {
  const currentContext = canvas.getContext('2d')
  if (!currentContext) return
  context = currentContext

  // Match canvas actual size to responsive size rendered in browser.
  const { width, height } = canvas.getBoundingClientRect()
  // Multiply by to for retina resolution rendering.
  canvas.width = width * 2
  canvas.height = height * 2

  sizes.padding = 50
  sizes.paddingRight = 150
  sizes.width = canvas.width
  sizes.height = canvas.height
  sizes.chartWidth = sizes.width - sizes.padding - sizes.paddingRight
  sizes.chartHeight = sizes.height - sizes.padding * 2

  sizes.xStart = sizes.padding
  sizes.xEnd = sizes.padding + sizes.chartWidth
  sizes.yStart = sizes.padding + sizes.chartHeight
  sizes.yEnd = sizes.padding
}
