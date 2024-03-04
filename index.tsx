import { scale } from 'optica'
import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { addChartData, intializeCanvas } from './canvas'
import { jsxFrameworkDownloads, jsxFrameworkDownloadsReal, largeCapCompanies } from './data'
import { Configuration } from './markup/Configuration'
import { Select } from './markup/Select'
import { schedule } from './scheduler'
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
  alignItems: 'flex-end',
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
  maxWidth: '100%',
}

const canvasStyles: CSSProperties = {
  display: 'flex',
  height: '100%',
  width: '100%',
  borderRadius: scale(10),
  aspectRatio: 16 / 9,
}

const footerStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: scale(20),
  fontSize: scale(28, 10),
  fontFamily: 'monospace',
  textAlign: 'center',
}

const dataForOption = {
  jsx: jsxFrameworkDownloadsReal,
  'market-capitalization': largeCapCompanies,
  'jsx-real': jsxFrameworkDownloadsReal,
}

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [data, setData] = useState(jsxFrameworkDownloads())
  const [busy, setBusy] = useState(true)

  // Initialize canvas on load.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    intializeCanvas(canvas)
    setBusy(false)
  }, [])

  // Display static chart initially and on data change.
  useEffect(() => {
    addChartData(data)
    schedule({ start: 10, duration: 0, fps: 0, end: 0 }, true)
  }, [data])

  return (
    <div style={appStyles}>
      <header style={headerStyles}>
        <h1 style={headingStyles}>Timeline Chart</h1>
        <Select
          placeholder="Data Source"
          options={[
            { label: 'JSX Frontend Frameworks', value: 'jsx' },
            { label: 'Companies by Market Capitalization', value: 'market-capitalization' },
            { label: 'JSX Downloads (Real)', value: 'jsx-real' },
          ]}
          // @ts-ignore
          onOption={async (option) => setData(await dataForOption[option]())}
        />
      </header>
      <main style={contentStyles}>
        <canvas style={canvasStyles} ref={canvasRef} />
        <Configuration busy={busy} values={data.values} />
      </main>
      <footer style={footerStyles}>Canvas · Cursor AI · Bun · React · TypeScript · Rsbuild · Biome</footer>
    </div>
  )
}

createRoot(document.body).render(<App />)
