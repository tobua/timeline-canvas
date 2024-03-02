import { jsxFrameworks } from './data'

let context: CanvasRenderingContext2D
const _data = jsxFrameworks()
type Data = typeof _data
const keys = [
  { label: 'react', color: 'red' },
  { label: 'preact', color: 'green' },
  { label: 'solid', color: 'blue' },
] as const
type Keys = typeof keys
const sizes = {
  padding: 50,
  width: 1000,
  height: 500,
  chartWidth: 900,
  chartHeight: 400,
  xStart: 50,
  xEnd: 950,
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

export function renderLinesUntilIndex(maxIndex: number) {
  const dataUntilIndex = _data.slice(0, maxIndex)
  const maximumRange = findMaximumRange(dataUntilIndex, keys)

  for (const { label, color } of keys) {
    context.beginPath()
    context.lineWidth = 2
    context.strokeStyle = color
    dataUntilIndex.forEach((value, index) => {
      const current = value[label]

      const positionX = index === 0 ? sizes.xStart : sizes.xStart + (sizes.chartWidth / (maxIndex - 1)) * index
      const positionY = sizes.yStart - (current / maximumRange) * sizes.chartHeight
      if (index > 0) {
        context.lineTo(positionX, positionY)
      } else {
        context.moveTo(positionX, positionY)
      }
    })
    context.stroke()
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
  sizes.width = canvas.width
  sizes.height = canvas.height
  sizes.chartWidth = sizes.width - sizes.padding * 2
  sizes.chartHeight = sizes.height - sizes.padding * 2

  sizes.xStart = sizes.padding
  sizes.xEnd = sizes.padding + sizes.chartWidth
  sizes.yStart = sizes.padding + sizes.chartHeight
  sizes.yEnd = sizes.padding
}
