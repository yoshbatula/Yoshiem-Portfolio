import { useState, useEffect, useRef } from 'react'
import './Boot-page.css'
import ArchLogo from '../../assets/ArchLinuxLogo.svg'

const KERNEL_LINES = [
  { text: 'Linux version 6.12.6-arch1-1 (linux@archlinux) (gcc 14.2.1, GNU ld (GNU Binutils) 2.44.0) #1 SMP PREEMPT_DYNAMIC Wed, 18 Dec 2024 16:46:47 +0000' },
  { text: 'Command line: BOOT_IMAGE=/vmlinuz-linux root=UUID=a1b2c3d4-e5f6-7890-abcd-ef1234567890 rw quiet loglevel=3' },
  { text: 'x86/fpu: Supporting XSAVE feature 0x001: x87 floating point registers' },
  { text: 'x86/fpu: Supporting XSAVE feature 0x002: SSE registers' },
  { text: 'x86/fpu: Enabled xstate features 0x2f, context size is 960 bytes using xsave area' },
]

const BOOT_MESSAGES = [
  { ok: true,  text: 'Loaded initial ramdisk' },
  { ok: true,  text: 'udev: Kernel Device Manager initialized' },
  { ok: true,  text: 'Started Journal Service' },
  { ok: true,  text: 'Reached target Local File Systems' },
  { ok: false, text: 'Starting Network Manager...' },
  { ok: true,  text: 'Started Network Manager' },
  { ok: true,  text: 'Started User Login Management' },
  { ok: true,  text: 'Reached target Network' },
  { ok: true,  text: 'Reached target Multi-User System' },
  { ok: false, text: 'Starting Plymouth splash screen...' },
  { ok: true,  text: 'Started Plymouth splash screen' },
  { ok: false, text: 'Starting KDE Plasma Display Manager...' },
  { ok: true,  text: 'Started KDE Plasma Display Manager' },
  { ok: false, text: 'Starting KDE Plasma Desktop...' },
  { ok: true,  text: 'Started KDE Plasma Desktop' },
  { ok: false, text: 'Loading Yoshiem Portfolio...' },
]

const SPLASH_DURATION = 3500

export default function BootPage() {
  const [phase, setPhase] = useState('splash')
  const [splashVisible, setSplashVisible] = useState(true)
  const [kernelIndex, setKernelIndex] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState([])
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [complete, setComplete] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashVisible(false)
      setTimeout(() => setPhase('boot'), 600)
    }, SPLASH_DURATION)
    return () => clearTimeout(splashTimer)
  }, [])

  useEffect(() => {
    if (phase !== 'kernel') return
    if (kernelIndex >= KERNEL_LINES.length) {
      const t = setTimeout(() => setPhase('boot'), 600)
      return () => clearTimeout(t)
    }

    const delay = kernelIndex === 0 ? 400 : 120 + Math.random() * 180
    const timer = setTimeout(() => {
      setKernelIndex(prev => prev + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [kernelIndex, phase])

  useEffect(() => {
    if (phase !== 'boot') return

    if (messageIndex >= BOOT_MESSAGES.length) {
      const t = setTimeout(() => setComplete(true), 800)
      return () => clearTimeout(t)
    }

    const delay = messageIndex === 0 ? 500 : 200 + Math.random() * 350
    const timer = setTimeout(() => {
      setVisibleMessages(prev => [...prev, BOOT_MESSAGES[messageIndex]])
      setProgress(((messageIndex + 1) / BOOT_MESSAGES.length) * 100)
      setMessageIndex(prev => prev + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [messageIndex, phase])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [kernelIndex, visibleMessages])

  if (phase === 'splash') {
    return (
      <div className={`splash-screen ${splashVisible ? 'splash-visible' : 'splash-hidden'}`}>
        <div className="splash-logo-wrap">
          <img src={ArchLogo} alt="Arch Linux" />
        </div>
      </div>
    )
  }

  return (
    <div className={`boot-page ${complete ? 'boot-complete' : ''}`}>
      <div className="boot-header">
        <div className="boot-header-logo">
          <img src={ArchLogo} alt="Arch Linux" />
        </div>
        <div className="boot-title">Arch Linux</div>
        <div className="boot-release">rolling — kernel 6.12.6-arch1-1</div>
        <div className="boot-separator">{'─'.repeat(64)}</div>
      </div>

      <div className="boot-body" ref={bodyRef}>
        {KERNEL_LINES.slice(0, kernelIndex).map((line, i) => (
          <div key={`k-${i}`} className="kernel-line dim">
            <span className="kernel-label">[{String(i + 1).padStart(5, '0')}]</span>
            <span>{line.text}</span>
          </div>
        ))}

        {phase === 'boot' && kernelIndex >= KERNEL_LINES.length && (
          <>
            <div className="kernel-line" style={{ color: '#555' }}>
              <span className="kernel-label">[00006]</span>
              <span>Run /sbin/init as init process</span>
            </div>
            {visibleMessages.map((msg, i) => (
              <div key={i} className="boot-line">
                <span className={`boot-status ${msg.ok ? 'ok' : 'pending'}`}>
                  {msg.ok ? '[  OK  ]' : '[ .... ]'}
                </span>
                <span className={`boot-text ${!msg.ok && 'warn'}`}>{msg.text}</span>
              </div>
            ))}
            {!complete && messageIndex < BOOT_MESSAGES.length && (
              <span className="boot-cursor">_</span>
            )}
          </>
        )}
      </div>

      <div className="boot-footer">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress-text">
          {complete
            ? 'Welcome to Yoshiem Portfolio'
            : phase === 'kernel'
              ? `Loading kernel... ${Math.round((kernelIndex / KERNEL_LINES.length) * 100)}%`
              : `Starting up... ${Math.round(progress)}%`}
        </div>
      </div>
    </div>
  )
}
