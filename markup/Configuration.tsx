import { scale } from 'optica'
import { type CSSProperties, useState } from 'react'
import type { Values } from '../data'
import { schedule } from '../scheduler'
import { Button } from './Button'
import { Input } from './Input'
import { Performance } from './Performance'
import { Select } from './Select'

export interface Configuration {
  duration: number
  fps: number
  start: number
  end: number
}

const wrapperStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: scale(40),
}

const rowStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: scale(20),
  flexWrap: 'wrap',
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/captureStream

export function Configuration({ busy, values }: { busy: boolean; values: Values<number> }) {
  const [duration, setDuration] = useState(5)
  const [fps, setFps] = useState(60)
  const [start, setStart] = useState(10)
  const [end, setEnd] = useState(values.length - 1)

  return (
    <div style={wrapperStyles}>
      <div style={rowStyles}>
        <Input placeholder="Duration" unit="Seconds" value={duration} onValue={setDuration} />
        <Input placeholder="Frames per second" unit="FPS" value={fps} onValue={setFps} />
        <Select
          // Need at least 5 data points to start rendering.
          value={start - 5}
          placeholder="Start Position"
          options={values.slice(start).map((value, index) => ({ label: String(value.unit), value: String(index) }))}
          onOption={(index) => setStart(Number(index + start + 5))}
        />
        <Select
          value={end - start - 1}
          placeholder="End Position"
          options={values.slice(start + 1).map((value, index) => ({ label: String(value.unit), value: String(index) }))}
          onOption={(index) => setEnd(Number(index) + start)}
        />
        <Button onClick={() => schedule({ duration, fps, start, end })}>{busy ? 'Rendering' : 'Start'}</Button>
      </div>
      <div style={rowStyles}>
        <Performance />
        <Button>Record Video</Button>
      </div>
    </div>
  )
}
