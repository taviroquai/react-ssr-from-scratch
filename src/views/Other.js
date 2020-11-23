import React from 'react'
import { Link } from 'react-router-dom'

function Other(props) {
  const { name } = props;
  return (
    <div>
      <Link to="/">Home</Link>
      <div>Other { name }</div>
    </div>
  )
}

export default Other