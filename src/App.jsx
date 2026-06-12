import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingPage from './Pages/Loading-page/Loading-page'
import LockScreen from './Pages/LockScreenPage/LockScreen'
import LandingPage from './Pages/Landing-page/Landing-page'
import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/lockscreen" element={<LockScreen />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}
