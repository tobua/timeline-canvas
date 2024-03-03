import { scale } from 'optica'
import type { CSSProperties } from 'react'
import { Color } from '../style'

export enum PerformanceState {
  Inactive = 'Inactive',
  Perfect = 'Perfect',
  Good = 'Good',
  Fair = 'Fair',
  Bad = 'Bad',
}

const performanceDetails = {
  [PerformanceState.Inactive]: ['💤', Color.black],
  [PerformanceState.Perfect]: ['🌟', Color.success],
  [PerformanceState.Good]: ['👍', Color.success],
  [PerformanceState.Fair]: ['⚠️', Color.warning],
  [PerformanceState.Bad]: ['❌', Color.error],
}

export function setPerformance(performance: PerformanceState) {
  const element = document.getElementById('performance')

  if (element) {
    element.innerHTML = `${performanceDetails[performance][0]} ${performance}`
    element.style.color = performanceDetails[performance][1]
  }
}

const wrapperStyles: CSSProperties = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  background: Color.white,
  height: scale(40),
  paddingLeft: scale(20),
  paddingRight: scale(20),
  borderRadius: scale(10),
}

const descriptionLabelStyles: CSSProperties = {
  position: 'absolute',
  left: scale(10),
  top: scale(-18),
  background: Color.gray[400],
  padding: scale(5),
  borderRadius: scale(8),
  color: 'black',
  fontSize: scale(14),
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
}

const textStyles = (color: string): CSSProperties => ({
  color,
})

export function Performance() {
  return (
    <div style={wrapperStyles}>
      <label style={descriptionLabelStyles}>Performance</label>
      <span style={textStyles(performanceDetails[PerformanceState.Inactive][1])} id="performance">
        {performanceDetails[PerformanceState.Inactive][0]} Inactive
      </span>
    </div>
  )
}
