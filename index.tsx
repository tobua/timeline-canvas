import { scale } from 'optica'
import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { addChartData, intializeCanvas } from './canvas'
import { jsxFrameworkDownloads, largeCapCompanies } from './data'
import { Configuration } from './markup/Configuration'
import { Select } from './markup/Select'
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
  const [busy, setBusy] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    intializeCanvas(canvas)
    setBusy(false)
  }, [])

  useEffect(() => {
    addChartData(data)
  }, [data])

  return (
    <div style={appStyles}>
      <header style={headerStyles}>
        <h1 style={headingStyles}>Timeline Chart</h1>
        <Select
          placeholder="Data Source"
          options={[
            { label: 'Frontend Frameworks', value: 'jsx' },
            { label: 'Companies by Market Capitalization', value: 'market-capitalization' },
          ]}
          onOption={(option) => setData(option === 'jsx' ? jsxFrameworkDownloads() : largeCapCompanies())}
        />
      </header>
      <main style={contentStyles}>
        <canvas style={canvasStyles} ref={canvasRef} />
        <Configuration busy={busy} values={data.values} />
      </main>
      <footer style={footerStyles}>
        <p>Canvas</p>
      </footer>
    </div>
  )
}

createRoot(document.body).render(<App />)
