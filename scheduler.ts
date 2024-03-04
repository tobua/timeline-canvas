import { clearCanvas, renderLinesUntilIndex, renderStaticCanvasParts } from './canvas'
import type { Configuration } from './markup/Configuration'
import { PerformanceState, setPerformance } from './markup/Performance'

let effectiveTime = 0

function renderUntilIndex(index: number, offset: number) {
  clearCanvas()
  renderStaticCanvasParts()
  renderLinesUntilIndex(index, offset)
}

function renderWithDelay(index: number, end: number, totalTimePerFrame: number, offsetStep: number, offset: number, callback?: () => void) {
  if (index >= end) {
    // console.log('total elapsed time', performance.now() - effectiveTime)
    effectiveTime = 0
    setPerformance(PerformanceState.Inactive)
    if (callback) {
      callback()
    }
    return
  }

  const currentTime = performance.now()
  renderUntilIndex(index, offset)
  const elapsedTime = performance.now() - currentTime

  // We wait for the next frame until the time for the current frame has passed.
  const remainingTime = totalTimePerFrame - elapsedTime

  const renderingTimePercentage = (elapsedTime / totalTimePerFrame) * 100

  if (renderingTimePercentage < 25) {
    setPerformance(PerformanceState.Perfect)
  } else if (renderingTimePercentage < 50) {
    setPerformance(PerformanceState.Good)
  } else if (renderingTimePercentage < 75) {
    setPerformance(PerformanceState.Fair)
  } else {
    setPerformance(PerformanceState.Bad)
  }

  const next = offset + offsetStep >= 1
  const nextOffset = next ? 0 : offset + offsetStep
  const nextIndex = next ? index + 1 : index

  // TODO requestAnimationFrame to possibly prevent flickering
  setTimeout(() => renderWithDelay(nextIndex, end, totalTimePerFrame, offsetStep, nextOffset, callback), remainingTime)
}

export function schedule(configuration: Configuration, intial = false, callback?: () => void) {
  if (effectiveTime !== 0) {
    return
  }
  effectiveTime = performance.now()
  renderUntilIndex(configuration.start, 0)

  if (intial) {
    effectiveTime = 0
  } else {
    const totalFrames = configuration.duration * configuration.fps
    const totalTimePerFrame = (configuration.duration * 1000) / configuration.fps
    const steps = configuration.end - configuration.start
    const framesPerStep = totalFrames / steps
    const offsetStep = 1 / framesPerStep

    // Recursively rerender with delay until all values have been rendered.
    renderWithDelay(configuration.start, configuration.end, totalTimePerFrame, offsetStep, offsetStep, callback)
  }
}
