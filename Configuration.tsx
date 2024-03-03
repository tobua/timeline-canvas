import { scale } from 'optica'
import { type CSSProperties, type JSX, useState } from 'react'
import { Color } from './style'

const buttonStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  border: 'none',
  background: Color.black,
  color: Color.white,
  outline: 'none',
  borderRadius: scale(10),
  height: scale(40),
  paddingLeft: scale(20),
  paddingRight: scale(20),
  cursor: 'pointer',
}

function Button({ style, ...props }: JSX.IntrinsicElements['button']) {
  return <button type="submit" {...props} style={{ ...buttonStyles, ...style }} />
}

const inputWrapperStyles: CSSProperties = {
  position: 'relative',
  marginTop: 20,
}

const inputStyles: CSSProperties = {
  display: 'flex',
  border: 'none',
  background: Color.white,
  color: Color.black,
  outline: 'none',
  borderRadius: scale(10),
  height: scale(40),
  paddingLeft: scale(10),
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
}

const unitLabelStyles: CSSProperties = {
  position: 'absolute',
  right: scale(10),
  color: Color.gray[600],
  fontSize: scale(12),
  height: scale(40),
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
}

function Input({
  style,
  unit,
  onValue,
  placeholder,
  ...props
}: JSX.IntrinsicElements['input'] & { unit: string; onValue: (value: number) => void }) {
  return (
    <div style={inputWrapperStyles}>
      <label style={descriptionLabelStyles}>{placeholder}</label>
      <label style={unitLabelStyles}>{unit}</label>
      <input type="number" onChange={(event) => onValue(Number(event.target.value))} {...props} style={{ ...inputStyles, ...style }} />
    </div>
  )
}

const wrapperStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: scale(20),
}

export function Configuration() {
  const [duration, setDuration] = useState(5)
  const [fps, setFps] = useState(60)
  return (
    <div style={wrapperStyles}>
      <Input placeholder="Duration" unit="Seconds" value={duration} onValue={setDuration} />
      <Input placeholder="Frames per second" unit="FPS" value={fps} onValue={setFps} />
      <Button>Restart</Button>
    </div>
  )
}
