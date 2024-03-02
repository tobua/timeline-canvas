import { scale } from 'optica'
import { type CSSProperties, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { clearCanvas, intializeCanvas, renderLinesUntilIndex, renderStaticCanvasParts } from './canvas'

document.body.style.display = 'flex'
document.body.style.justifyContent = 'center'
document.body.style.margin = '0'
document.body.style.padding = '5vmin'

const appStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  fontFamily: 'sans-serif',
  maxWidth: 800,
  justifyContent: 'space-between',
  gap: scale(20),
}

const headerStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const headingStyles: CSSProperties = {
  fontSize: scale(36),
  margin: 0,
}

const contentStyles: CSSProperties = {
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  background: 'lightgray',
  borderRadius: scale(20),
  padding: scale(10),
  aspectRatio: 16 / 9,
}

const canvasStyles: CSSProperties = {
  display: 'flex',
  height: '100%',
  width: '100%',
  background: 'white',
  borderRadius: scale(10),
}

const footerStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: scale(20),
  fontSize: scale(28, 10),
}

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    intializeCanvas(canvas)

    for (let index = 10; index < 20; index++) {
      setTimeout(
        () => {
          clearCanvas()
          renderStaticCanvasParts()
          renderLinesUntilIndex(index)
        },
        (index - 10) * 1000,
      )
    }
  }, [])

  return (
    <div style={appStyles}>
      <header style={headerStyles}>
        <h1 style={headingStyles}>Timeline Chart</h1>
        <select>
          <option>Frontend Frameworks</option>
          <option>Companies by Market Capitalization</option>
        </select>
      </header>
      <main style={contentStyles}>
        <canvas style={canvasStyles} ref={canvasRef} />
      </main>
      <footer style={footerStyles}>
        <p>Canvas</p>
      </footer>
    </div>
  )
}

createRoot(document.body).render(<App />)
