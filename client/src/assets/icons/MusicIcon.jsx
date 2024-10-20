import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={200}
    height={200}
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M165 85.3v325.3c-9.7-3.3-20.5-5.3-32-5.3-41.2 0-74.7 23.9-74.7 53.3 0 29.5 33.4 53.3 74.7 53.3 41.2 0 74.7-23.9 74.7-53.3 0-3.6-.5-7.2-1.5-10.7h1.5V179.8L421 118.9v227.8c-9.7-3.3-20.5-5.3-32-5.3-41.2 0-74.7 23.9-74.7 53.3 0 29.5 33.4 53.3 74.7 53.3 41.2 0 74.7-23.9 74.7-53.3 0-3.4-.5-6.7-1.4-10l1.4-.7V0L165 85.3z" />
  </svg>
)
export default SvgComponent
