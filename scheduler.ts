import { clearCanvas, renderLinesUntilIndex, renderStaticCanvasParts } from './canvas'
import type { Configuration } from './markup/Configuration'

function renderUntilIndex(index: number) {
  clearCanvas()
  renderStaticCanvasParts()
  renderLinesUntilIndex(index)
}

function renderWithDelay(index: number, end: number, fps: number) {
  if (index >= end) {
    return
  }

  const currentTime = performance.now()
  renderUntilIndex(index)
  const elapsedTime = performance.now() - currentTime
  const delay = 1000 / fps - elapsedTime

  setTimeout(() => renderWithDelay(index + 1, end, fps), delay)
}

export function schedule(configuration: Configuration) {
  renderUntilIndex(configuration.start)
  // Recursively rerender with delay until all values have been rendered.
  renderWithDelay(configuration.start + 1, configuration.end, configuration.fps)
}
