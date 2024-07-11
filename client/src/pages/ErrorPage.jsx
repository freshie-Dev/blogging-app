import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
        <h1>404 NOT FOUND!</h1>
        <Link to="/">Go to home page</Link>
    </div>
  )
}

export default ErrorPage