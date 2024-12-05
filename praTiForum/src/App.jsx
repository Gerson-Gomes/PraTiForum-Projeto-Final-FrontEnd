import { useState } from 'react'
import Footer from "./layouts/footer"
import './assets/styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Footer />
    </>
  )
}

export default App
