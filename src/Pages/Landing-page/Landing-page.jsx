import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      <h1>Welcome to Yoshiem's Portfolio</h1>
      <button onClick={() => navigate('/lockscreen')}>Back</button>
    </div>
  )
}