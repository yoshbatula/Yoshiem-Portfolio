import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ArchLinuxLogo from '../../assets/ArchLinuxLogo.svg'
import './LoadingPage.css'

const BOOT_MESSAGES = [
  { ok: true,  text: 'Finished Create System Users' },
  { ok: true,  text: 'Create Static Device Nodes in /dev...' },
  { ok: true,  text: 'Finished Create Static Device Nodes' },
  { ok: true,  text: 'Starting Load/Save Random Seed' },
  { ok: true,  text: 'Starting Apply Kernel Variables...' },
  { ok: true,  text: 'Finished Apply Kernel Variables' },
  { ok: true,  text: 'Finished Load/Save Random Seed' },
  { ok: true,  text: 'Reached target Local File Systems (Pre)' },
  { ok: true,  text: 'Reached target Local File Systems' },
  { ok: false, text: 'Starting Role-based Manager for Device Events...' },
  { ok: true,  text: 'Finished Role-based Manager for Device Events and Files' },
  { ok: false, text: 'Starting Flush Journal to Persistent Storage...' },
  { ok: true,  text: 'Finished Flush Journal to Persistent Storage' },
  { ok: false, text: 'Starting Role-based Manager for Device Events and Files...' },
  { ok: true,  text: 'Finished Role-based Manager for Device Events and Files' },
  { ok: true,  text: 'Started UMC metadata daemon' },
  { ok: true,  text: 'Finished RebuildAutomatic' },
  { ok: true,  text: 'Started Network Service' },
  { ok: false, text: 'Starting Wait for Network to be Configured...' },
  { ok: true,  text: 'Started NetworkManager' },
  { ok: true,  text: 'Reached target Network' },
  { ok: true,  text: 'Started User Manager for UID 1000' },
  { ok: true,  text: 'Started D-Bus System Message Bus' },
  { ok: true,  text: 'Reached target Basic System' },
  { ok: true,  text: 'Started Authorization Manager' },
  { ok: true,  text: 'Finished Wait for Network to be Configured' },
  { ok: true,  text: 'Started udev Kernel Device Manager' },
  { ok: true,  text: 'Reached target Device Initialization' },
  { ok: true,  text: 'Started KDE Plasma Display Manager' },
  { ok: true,  text: 'Started KDE Plasma Workspaces' },
  { ok: true,  text: 'Started KDE Plasma Session Manager' },
  { ok: true,  text: 'Reached target Multi-User System' },
  { ok: true,  text: 'Reached target Graphical Interface' },
  { ok: true,  text: 'Started Yoshiem Portfolio' },
  { ok: true,  text: 'Reached target Yoshiem Portfolio — KDE Plasma Desktop' },
]

const SPLASH_DURATION = 2200

export default function LoadingPage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('splash')        
  const [splashFading, setSplashFading] = useState(false)
  const [visibleMessages, setVisibleMessages] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [complete, setComplete] = useState(false)
  const logRef = useRef(null)

  // Splash Boot transition
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setSplashFading(true)
      setTimeout(() => setPhase('boot'), 600)
    }, SPLASH_DURATION)
    return () => clearTimeout(fadeTimer)
  }, [])

  // Boot log message queue
  useEffect(() => {
    if (phase !== 'boot') return

    if (currentIndex >= BOOT_MESSAGES.length) {
      const done = setTimeout(() => setComplete(true), 400)
      return () => clearTimeout(done)
    }

    const delay = currentIndex === 0
      ? 200
      : Math.floor(Math.random() * 100) + 60

    const timer = setTimeout(() => {
      setVisibleMessages(prev => [...prev, BOOT_MESSAGES[currentIndex]])
      setCurrentIndex(prev => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [currentIndex, phase])

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [visibleMessages])

  // Redirect to lock screen when boot is complete
  useEffect(() => {
    if (complete) {
      const redirectTimer = setTimeout(() => {
        navigate('/lockscreen')
      }, 1000)
      return () => clearTimeout(redirectTimer)
    }
  }, [complete, navigate])

  // Splash screen
  if (phase === 'splash') {
    return (
      <div className={`splash-screen ${splashFading ? 'splash-fading' : ''}`}>
        <img
          src={ArchLinuxLogo}
          alt="Arch Linux"
          className="splash-logo"
        />
      </div>
    )
  }

  // Boot log screen
  return (
    <div className="boot-screen">
      <div className="boot-log" ref={logRef}>
        {visibleMessages.map((msg, i) => (
          <div key={i} className="boot-line">
            <span className={`boot-status ${msg.ok ? 'ok' : 'pending'}`}>
              {msg.ok ? '[  OK  ]' : '[ .... ]'}
            </span>
            <span className={`boot-text ${msg.ok ? 'bright' : ''}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {!complete && currentIndex < BOOT_MESSAGES.length && (
          <span className="boot-cursor" />
        )}
      </div>
    </div>
  )
}