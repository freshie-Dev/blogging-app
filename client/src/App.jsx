import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
function App() {

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/users/')
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (

    <div>
      <h1>Blogging App</h1>
    </div>
  )
}

export default App
