import { scale } from 'optica'
import { Color } from '../style'

export const Open = ({ width = 60, height = 60, color = Color.black, style = {} }) => (
  <svg style={{ width: scale(width), height: scale(height), ...style }} viewBox="0 0 50 50">
    <title>Open</title>
    <path
      d="M3 12L23.4986 35.2938C24.295 36.1988 25.705 36.1988 26.5014 35.2938L47 12"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
    />
  </svg>
)
