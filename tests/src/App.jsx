import { useState } from 'react'
import Footer from "./layouts/footer"
import '../src/Atom/styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Footer />
    </>
  )
}

export default App
