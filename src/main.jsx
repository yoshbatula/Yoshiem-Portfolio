import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loadingpage from './Pages/Loading-page/Loading-page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Loadingpage />
  </StrictMode>,
)
