import { clearCanvas, renderLinesUntilIndex, renderStaticCanvasParts } from './canvas'
import type { Configuration } from './markup/Configuration'
import { PerformanceState, setPerformance } from './markup/Performance'

let effectiveTime = 0

function renderUntilIndex(index: number, currentFrame: number) {
  clearCanvas()
  renderStaticCanvasParts()
  renderLinesUntilIndex(index, currentFrame)
}

function renderWithDelay(index: number, end: number, totalTimeAvailable: number, currentFrame: number) {
  if (index >= end) {
    console.log(performance.now() - effectiveTime)
    effectiveTime = 0
    setPerformance(PerformanceState.Inactive)
    return
  }

  const currentTime = performance.now()
  renderUntilIndex(index, currentFrame)
  const elapsedTime = performance.now() - currentTime

  // We wait for the next frame until the time for the current frame has passed.
  const remainingTime = totalTimeAvailable - elapsedTime

  const renderingTimePercentage = (elapsedTime / totalTimeAvailable) * 100

  if (renderingTimePercentage < 25) {
    setPerformance(PerformanceState.Perfect)
  } else if (renderingTimePercentage < 50) {
    setPerformance(PerformanceState.Good)
  } else if (renderingTimePercentage < 75) {
    setPerformance(PerformanceState.Fair)
  } else {
    setPerformance(PerformanceState.Bad)
  }

  setTimeout(() => renderWithDelay(index + 1, end, totalTimeAvailable, currentFrame + 1), remainingTime)
}

export function schedule(configuration: Configuration) {
  if (effectiveTime !== 0) {
    return
  }
  effectiveTime = performance.now()
  const totalTimeAvailable = (configuration.duration * 1000) / configuration.fps
  renderUntilIndex(configuration.start, 0)
  // Recursively rerender with delay until all values have been rendered.
  renderWithDelay(configuration.start + 1, configuration.end, totalTimeAvailable, 1)
}
