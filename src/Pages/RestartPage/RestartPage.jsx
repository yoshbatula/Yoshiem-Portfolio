import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserAvatar from '../../assets/UserAvatar.svg'
import RestartIcon from '../../assets/RestartButtonIcon.svg'
import CancelIcon from '../../assets/CancelIcon.svg'

export default function RestartPage() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    if (countdown <= 0) {
      navigate('/')
      return
    }
    const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, navigate])

  const handleRestart = () => {
    navigate('/')
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-4">
        <img src={UserAvatar} alt="User" className="w-28 h-28 rounded-full object-cover" />
        <p className="text-white/90 text-base tracking-wide">Restarting in {countdown}s...</p>
      </div>
      <div className="flex gap-14 items-start">
        <button onClick={handleRestart} className="flex flex-col items-center gap-3 group cursor-pointer">
          <img src={RestartIcon} alt="Restart Now" className="w-14 h-14 brightness-200 group-hover:brightness-100 transition-all" />
          <span className="text-white/80 text-xs tracking-wide group-hover:text-white transition-colors">Restart Now</span>
        </button>
        <button onClick={handleCancel} className="flex flex-col items-center gap-3 group cursor-pointer">
          <img src={CancelIcon} alt="Cancel" className="w-14 h-14 brightness-200 group-hover:brightness-100 transition-all" />
          <span className="text-white/80 text-xs tracking-wide group-hover:text-white transition-colors">Cancel</span>
        </button>
      </div>
    </div>
  )
}
