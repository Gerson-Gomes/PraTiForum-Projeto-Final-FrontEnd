import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.html'
import App from './App'
import {GoogleOAuthProvider} from '@react-oauth/google'

const CLIENT_ID = "920574906372-qlhd461jqfcoaarrtubsferabb5o2rak.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>      
  </StrictMode>,
)
