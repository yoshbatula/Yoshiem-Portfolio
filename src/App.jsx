import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingPage from './Pages/Loading-page/Loading-page'
import LockScreen from './Pages/LockScreenPage/LockScreen'
import Desktop from './Pages/Desktop-page/Desktop'
import ShutdownPage from './Pages/ShutdownPage/ShutdownPage'
import MobileNotice from './Pages/components/MobileNotice'
import './App.css'

export default function App() {
  return (
    <Router>
      <MobileNotice />
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/lockscreen" element={<LockScreen />} />
        <Route path="/desktop" element={<Desktop />} />
        <Route path="/shutdown" element={<ShutdownPage />} />
      </Routes>
    </Router>
  )
}
