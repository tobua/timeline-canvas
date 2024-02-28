import { jsxFrameworks } from './data'

export function intializeCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')
  if (!context) return

  context.fillStyle = 'lightblue'
  context.fillRect(0, 0, canvas.width, canvas.height)

  const _data = jsxFrameworks()

  // Match canvas actual size to responsive size rendered in browser.
  const { width, height } = canvas.getBoundingClientRect()
  // Multiply by to for retina resolution rendering.
  canvas.width = width * 2
  canvas.height = height * 2

  // DRAW AXES
  context.beginPath()
  context.lineWidth = 2
  context.moveTo(50, canvas.height - 51)
  context.lineTo(canvas.width - 50, canvas.height - 50)
  context.stroke()

  context.beginPath()
  context.lineWidth = 2
  context.moveTo(50, 50)
  context.lineTo(50, canvas.height - 50)
  context.stroke()

  // LABEL AXES
  context.font = '24px Arial'
  context.textAlign = 'center'
  context.fillText('Time', canvas.width / 2, canvas.height - 20)

  context.save()
  context.translate(30, canvas.height / 2)
  context.rotate(-Math.PI / 2)
  context.textAlign = 'center'
  context.fillText('Value', 0, 0)
  context.restore()
}
