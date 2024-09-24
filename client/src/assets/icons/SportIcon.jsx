import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="#000"
    strokeWidth={3}
    viewBox="0 0 64 64"
    {...props}
  >
    <g strokeLinecap="round">
      <circle cx={33.69} cy={32} r={24.99} />
      <path d="m33.43 20.18-10.59 7.7 4.05 12.44h13.09l4.04-12.44-10.59-7.7zM40.41 7.92l-6.98 5.56-6.84-5.44M33.43 20.18v-6.7M58.68 32l-8.08-6.08 3.18-8.78M40.72 55.99l3.3-9.6 10.03.1M25.61 55.65l-3.06-9.26h-9.29M8.7 32l7.29-6.03-2.83-8.21M22.84 27.88l-6.85-1.91M26.89 40.32l-4.34 6.07M39.98 40.32l4.04 6.07M44.02 27.89l6.58-1.97" />
    </g>
  </svg>
)
export default SvgComponent
