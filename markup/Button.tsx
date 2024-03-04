import { scale } from 'optica'
import type { CSSProperties, JSX } from 'react'
import { Color } from '../style'

const buttonStyles = (color?: string): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  background: color ? color : Color.black,
  color: Color.white,
  outline: 'none',
  borderRadius: scale(10),
  height: scale(40),
  paddingLeft: scale(20),
  paddingRight: scale(20),
  cursor: 'pointer',
  whiteSpace: 'nowrap',
})

export function Button({ style, color, ...props }: JSX.IntrinsicElements['button']) {
  return <button type="submit" {...props} style={{ ...buttonStyles(color), ...style }} />
}
