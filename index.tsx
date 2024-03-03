import { scale } from 'optica'
import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Configuration } from './Configuration'
import { addChartData, clearCanvas, intializeCanvas, renderLinesUntilIndex, renderStaticCanvasParts } from './canvas'
import { jsxFrameworkDownloads, largeCapCompanies } from './data'
import { Color } from './style'

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
  flexDirection: 'column',
  gap: scale(10),
  position: 'relative',
  alignItems: 'center',
  background: Color.gray[300],
  borderRadius: scale(20),
  padding: scale(10),
  aspectRatio: 16 / 9,
}

const canvasStyles: CSSProperties = {
  display: 'flex',
  height: '100%',
  width: '100%',
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
  const [data, setData] = useState(jsxFrameworkDownloads())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    intializeCanvas(canvas)
  }, [])

  useEffect(() => {
    addChartData(data)
    clearCanvas()
    renderStaticCanvasParts()
    renderLinesUntilIndex(10)

    for (let index = 10; index < 30; index++) {
      setTimeout(
        () => {
          clearCanvas()
          renderStaticCanvasParts()
          renderLinesUntilIndex(index)
        },
        (index - 10) * 1000,
      )
    }
  }, [data])

  return (
    <div style={appStyles}>
      <header style={headerStyles}>
        <h1 style={headingStyles}>Timeline Chart</h1>
        <select onChange={event => setData(event.target.value === 'jsx' ? jsxFrameworkDownloads() : largeCapCompanies())} >
          <option value="jsx">Frontend Frameworks</option>
          <option value="market-capitalization">Companies by Market Capitalization</option>
        </select>
      </header>
      <main style={contentStyles}>
        <canvas style={canvasStyles} ref={canvasRef} />
        <Configuration />
      </main>
      <footer style={footerStyles}>
        <p>Canvas</p>
      </footer>
    </div>
  )
}

createRoot(document.body).render(<App />)
