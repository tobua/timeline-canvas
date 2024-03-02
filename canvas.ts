import { jsxFrameworkLabels, jsxFrameworks } from './data'

let context: CanvasRenderingContext2D
const Space = {
  small: 10,
  medium: 20,
  large: 40,
}
const data = jsxFrameworks()
const labels = jsxFrameworkLabels
type Data = typeof data
const keys = [
  { label: 'react', color: 'red' },
  { label: 'preact', color: 'green' },
  { label: 'solid', color: 'blue' },
] as const
type Keys = typeof keys
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

function findMaximumRange(data: Data, keys: Keys) {
  let max = 0

  for (const value of data) {
    for (const { label } of keys) {
      if (value[label] > max) {
        max = value[label]
      }
    }
  }

  return max
}

function drawPoint(x: number, y: number, color = 'black') {
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

function drawLabel(text: string, image: string, x: number, y: number) {
  context.beginPath()

  const padding = Space.small
  const imageSize = Space.medium
  const textWidth = context.measureText(text).width
  const boxWidth = textWidth + 2 * padding + imageSize + padding
  const boxHeight = imageSize + 2 * padding

  context.fillStyle = 'lightgray'
  context.roundRect(x + padding, y - boxHeight / 2, boxWidth, boxHeight, Space.small)
  context.fill()

  context.fillStyle = 'black'
  context.font = '24px Arial'
  context.textAlign = 'left'
  context.fillText(text, x + 3 * padding + imageSize, y + padding - 2)

  drawImage(image, x + 2 * padding, y - padding, imageSize, imageSize)
}

export function renderLinesUntilIndex(maxIndex: number) {
  const dataUntilIndex = data.slice(0, maxIndex)
  const maximumRange = findMaximumRange(dataUntilIndex, keys)

  for (const { label: labelKey, color } of keys) {
    const label = labels[labelKey]
    const labelPosition = { x: 0, y: 0 }
    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = color
    dataUntilIndex.forEach((value, index) => {
      const current = value[labelKey]

      const positionX = index === 0 ? sizes.xStart : sizes.xStart + (sizes.chartWidth / (maxIndex - 1)) * index
      const positionY = sizes.yStart - (current / maximumRange) * sizes.chartHeight
      if (index > 0) {
        context.lineTo(positionX, positionY)
      } else {
        context.moveTo(positionX, positionY)
      }

      if (index === maxIndex - 1) {
        labelPosition.x = positionX
        labelPosition.y = positionY
      }
    })
    context.stroke()
    drawLabel(label.label, label.image, labelPosition.x, labelPosition.y)
  }
}

export function clearCanvas() {
  context.fillStyle = 'red'
  context.clearRect(0, 0, sizes.width, sizes.height)
}

function labelAxes() {
  context.fillStyle = 'black'
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
  context.strokeStyle = 'black'
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
  context.fillStyle = 'lightblue'
  context.fillRect(0, 0, sizes.width, sizes.height)

  drawAxes()
  labelAxes()

  drawPoint(sizes.xStart, sizes.yStart, 'yellow')
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
