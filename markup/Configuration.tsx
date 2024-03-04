import { scale } from 'optica'
import { type CSSProperties, useEffect, useState } from 'react'
import type { Values } from '../data'
import { schedule } from '../scheduler'
import { Color } from '../style'
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

export function Configuration({ busy, values }: { busy: boolean; values: Values<number> }) {
  const [duration, setDuration] = useState(5)
  const [fps, setFps] = useState(60)
  const [start, setStart] = useState(10)
  const [end, setEnd] = useState(values.length - 1)
  const [recording, setRecording] = useState(false)

  useEffect(() => {
    setEnd(values.length - 1)
  }, [values])

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
          onOption={(index) => setStart(Number(index) + start + 5)}
        />
        <Select
          value={end - start - 1}
          placeholder="End Position"
          options={values.slice(start + 1).map((value, index) => ({ label: String(value.unit), value: String(index) }))}
          onOption={(index) => setEnd(Number(index) + start)}
        />
        <Button color={Color.highlight} onClick={() => schedule({ duration, fps, start, end })}>
          {busy ? 'Rendering' : 'Start'}
        </Button>
      </div>
      <div style={rowStyles}>
        <Performance />
        <Button
          onClick={() => {
            setRecording(true)
            const canvas = document.querySelector('canvas') as HTMLCanvasElement
            const stream = canvas.captureStream(30)
            const mediaRecorder = new MediaRecorder(stream)
            const chunks: BlobPart[] = []
            mediaRecorder.ondataavailable = (event) => chunks.push(event.data)
            mediaRecorder.onstop = () => {
              // Convert the recorded data chunks to a Blob and download the file.
              const blob = new Blob(chunks, { type: 'video/mp4' })
              const url = URL.createObjectURL(blob)
              const anchor = document.createElement('a')
              document.body.appendChild(anchor)
              anchor.style.display = 'none'
              anchor.href = url
              anchor.download = 'timeline-video.mp4'
              anchor.click()
              window.URL.revokeObjectURL(url)
              anchor.remove()
            }
            // Start recording.
            mediaRecorder.start(100)
            // Start rendering.
            schedule({ duration, fps, start, end }, false, () => {
              // Stop recording when done rendering.
              mediaRecorder.stop()
              setRecording(false)
            })
          }}
          color={recording ? Color.error : Color.black}
        >
          {recording ? 'Recording...' : 'Record Video'}
        </Button>
      </div>
    </div>
  )
}
