import { useState } from 'react'
import MainContent from "./sections/main-home/organisms/MainContent/MainContent"
import Footer from "./layouts/footer"
import './assets/styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainContent />
      <Footer />
    </>
  )
}

export default App
