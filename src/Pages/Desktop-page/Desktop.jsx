import { useState, useRef, useEffect, useCallback } from 'react'
import BackgroundImage from "../../assets/BackgroundImage.png"
import BottomNav from "../components/BottomNav"
import StartMenu from "../components/StartMenu"
import Window from "../components/Window"
import "./Desktop.css"

// Desktop icons
import FileIcon from "../../assets/FileIcon.svg"
import FolderIcon from "../../assets/FolderIcon.svg"
import SettingsIcon from "../../assets/Settings.svg"
import LifedumpIcon from "../../assets/Lifedump.svg"
import SpotifyIcon from "../../assets/SpotifyIcon .svg"

// Modals contents
import AboutMe from "../components/modals/AboutMe"
import ResumeContent from "../components/modals/ResumeContent"
import ProjectContent from "../components/modals/ProjectContent"
import SettingsContent from "../components/modals/SettingsContent"
import LifedumpContent from "../components/modals/LifedumpContent"
import CertificatesContent from "../components/modals/CertificatesContent"
import SpotifyContent from "../components/modals/SpotifyContent"

const WALLPAPERS = {
  default: { type: 'image', value: BackgroundImage },
  neon: { type: 'gradient', value: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
  nord: { type: 'gradient', value: 'linear-gradient(135deg, #2e3440, #3b4252, #4c566a)' },
  arch: { type: 'gradient', value: 'linear-gradient(135deg, #100e17, #1d182b, #0c2030)' }
}

export default function Desktop() {
  const [windows, setWindows] = useState({
    about: { id: 'about', title: 'About me', icon: FolderIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 60, defaultY: 40, defaultWidth: 680, defaultHeight: 500 },
    resume: { id: 'resume', title: 'Resume.pdf', icon: FileIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 120, defaultY: 60, defaultWidth: 785, defaultHeight: 560 },
    project1: { id: 'project1', title: 'Development', icon: FolderIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 180, defaultY: 80, defaultWidth: 680, defaultHeight: 485 },
    project2: { id: 'project2', title: 'Development', icon: FolderIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 240, defaultY: 100, defaultWidth: 680, defaultHeight: 485 },
    project3: { id: 'project3', title: 'Development', icon: FolderIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 300, defaultY: 120, defaultWidth: 680, defaultHeight: 485 },
    settings: { id: 'settings', title: 'System Settings', icon: SettingsIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 140, defaultY: 50, defaultWidth: 720, defaultHeight: 520 },
    lifedump: { id: 'lifedump', title: 'Lifedump Photos', icon: LifedumpIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 200, defaultY: 70, defaultWidth: 800, defaultHeight: 520 },
    certificates: { id: 'certificates', title: 'Certificates', icon: FolderIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 260, defaultY: 90, defaultWidth: 680, defaultHeight: 520 },
    spotify: { id: 'spotify', title: 'Spotify', icon: SpotifyIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 200, defaultY: 70, defaultWidth: 640, defaultHeight: 480 }
  })

  const [maxZIndex, setMaxZIndex] = useState(10)
  const [activeWindowId, setActiveWindowId] = useState(null)
  const [isStartMenuOpen, setStartMenuOpen] = useState(false)
  
  // Desktop shortcuts (drag from Start Menu)
  const [desktopShortcuts, setDesktopShortcuts] = useState([
    { id: 'resume', title: 'Resume.pdf', icon: FileIcon, x: 3, y: 5 },
    { id: 'about', title: 'About me', icon: FolderIcon, x: 3, y: 28 },
    { id: 'project1', title: 'Project 01', icon: FolderIcon, x: 3, y: 51 },
    { id: 'project2', title: 'Project 02', icon: FolderIcon, x: 3, y: 74 },
    { id: 'project3', title: 'Project 03', icon: FolderIcon, x: 85, y: 28 },
    { id: 'certificates', title: 'Certifications', icon: FolderIcon, x: 85, y: 51 },
  ])

  const dragRef = useRef(null)
  const movedRef = useRef(false)
  const iconRefs = useRef({})

  const handleIconMouseDown = (e, id) => {
    if (e.button !== 0) return
    e.preventDefault()
    movedRef.current = false
    const zone = document.querySelector('.desktop-dropzone')
    if (!zone) return
    const rect = zone.getBoundingClientRect()
    const shortcut = desktopShortcuts.find(s => s.id === id)
    if (!shortcut) return

    const el = iconRefs.current[id]
    if (el) {
      el.classList.add('is-dragging')
      el.style.setProperty('--start-x', `${shortcut.x}%`)
      el.style.setProperty('--start-y', `${shortcut.y}%`)
    }

    dragRef.current = { id, startX: e.clientX, startY: e.clientY, rect, sx: shortcut.x, sy: shortcut.y }
  }

  const handleIconMouseMove = useCallback((e) => {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (Math.hypot(dx, dy) > 3) movedRef.current = true

    const el = iconRefs.current[d.id]
    if (el) {
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }
  }, [])

  const handleIconMouseUp = useCallback(() => {
    const d = dragRef.current
    if (!d) return
    const el = iconRefs.current[d.id]
    if (el) {
      el.classList.remove('is-dragging')
      el.style.removeProperty('--start-x')
      el.style.removeProperty('--start-y')
    }

    if (movedRef.current && el) {
      const match = el.style.transform.match(/translate\(([\d.-]+)px, ([\d.-]+)px\)/)
      if (match) {
        const dx = parseFloat(match[1])
        const dy = parseFloat(match[2])
        const x = Math.max(0, Math.min(92, d.sx + (dx / d.rect.width) * 100))
        const y = Math.max(0, Math.min(90, d.sy + (dy / d.rect.height) * 100))
        el.style.left = `${x}%`
        el.style.top = `${y}%`
        el.style.transform = ''
        setDesktopShortcuts(prev =>
          prev.map(s => s.id === d.id ? { ...s, x, y } : s)
        )
      }
    }
    dragRef.current = null
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleIconMouseMove)
    window.addEventListener('mouseup', handleIconMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleIconMouseMove)
      window.removeEventListener('mouseup', handleIconMouseUp)
    }
  }, [handleIconMouseMove, handleIconMouseUp])

  const handleIconClick = (e, id) => {
    if (movedRef.current) {
      movedRef.current = false
      return
    }
    openWindow(id)
  }

  const handleDropOnDesktop = (e) => {
    const raw = e.dataTransfer.getData('application/x-app')
    if (!raw) return

    const data = JSON.parse(raw)
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const iconMap = {
      about: FolderIcon, resume: FileIcon, project1: FolderIcon,
      project2: FolderIcon, project3: FolderIcon, certificates: FolderIcon, spotify: SpotifyIcon,
    }

    setDesktopShortcuts(prev => {
      if (prev.find(s => s.id === data.id)) return prev
      return [...prev, { id: data.id, title: data.title || data.id, icon: iconMap[data.id] || FolderIcon, x, y }]
    })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  // Wallpaper state
  const [wallpaperId, setWallpaperId] = useState('default')
  const [customWallpaper, setCustomWallpaper] = useState(null)

  const focusWindow = (id) => {
    const nextZ = maxZIndex + 1
    setMaxZIndex(nextZ)
    setActiveWindowId(id)
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ, isMinimized: false }
    }))
  }

  const openWindow = (id) => {
    const nextZ = maxZIndex + 1
    setMaxZIndex(nextZ)
    setActiveWindowId(id)
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: nextZ }
    }))
    setStartMenuOpen(false)
  }

  const closeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }))
    if (activeWindowId === id) {
      const remaining = Object.values(windows)
        .filter(w => w.isOpen && w.id !== id && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex)
      setActiveWindowId(remaining[0]?.id || null)
    }
  }

  const minimizeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }))
    if (activeWindowId === id) {
      const remaining = Object.values(windows)
        .filter(w => w.isOpen && w.id !== id && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex)
      setActiveWindowId(remaining[0]?.id || null)
    }
  }

  const toggleMaximizeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }))
  }

  const handleToggleWindow = (id) => {
    const win = windows[id]
    if (!win.isOpen) {
      openWindow(id)
    } else if (win.isMinimized) {
      focusWindow(id)
    } else if (activeWindowId === id) {
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  }

  const handleSelectWallpaper = (id) => {
    setWallpaperId(id)
  }

  const handleUploadWallpaper = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setCustomWallpaper(url)
    setWallpaperId('custom')
  }

  const currentWp = wallpaperId === 'custom' && customWallpaper
    ? { type: 'image', value: customWallpaper }
    : (WALLPAPERS[wallpaperId] || WALLPAPERS.default)

  return (
    <div 
      className={`w-full h-screen relative overflow-hidden select-none`}
      style={{
        background: currentWp.type === 'gradient' ? currentWp.value : 'initial',
      }}
    >
      {/* Background Image (only renders if type is image) */}
      {currentWp.type === 'image' && (
        <img 
          src={currentWp.value} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" 
        />
      )}

      {/* Desktop Grid Layout */}
      <div className="absolute inset-0 z-10 flex flex-col p-6 pointer-events-none">
        
        {/* Welcome Text Overlay (Slightly faded behind windows) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-95">
          <div className="pointer-events-auto transform translate-y-[-10%] flex flex-col items-center">
            <h1 className="text-white text-[32px] md:text-[41px] font-light tracking-widest">
              <span className="letter">W</span>
              <span className="letter">E</span>
              <span className="letter">L</span>
              <span className="letter">C</span>
              <span className="letter">O</span>
              <span className="letter">M</span>
              <span className="letter">E</span>
              <span className="inline-block">&nbsp;</span>
              <span className="letter">T</span>
              <span className="letter">O</span>
              <span className="inline-block">&nbsp;</span>
              <span className="letter">M</span>
              <span className="letter">Y</span>
            </h1>
            <h1 className="text-white text-[64px] md:text-[80px] font-light mt-2 tracking-widest font-display">
              <span className="letter">P</span>
              <span className="letter">O</span>
              <span className="letter">R</span>
              <span className="letter">T</span>
              <span className="letter">F</span>
              <span className="letter">O</span>
              <span className="letter">L</span>
              <span className="letter">I</span>
              <span className="letter">O</span>
            </h1>
          </div>
        </div>

        {/* Desktop Shortcuts — draggable */}
        <div
          className="flex-1 relative pointer-events-none desktop-dropzone"
          onDrop={handleDropOnDesktop}
          onDragOver={handleDragOver}
        >
          {desktopShortcuts.map((shortcut) => (
            <div
              key={shortcut.id}
              ref={(el) => { iconRefs.current[shortcut.id] = el }}
              className="absolute pointer-events-auto desktop-icon"
              style={{ top: `${shortcut.y}%`, left: `${shortcut.x}%` }}
            >
              <div
                onMouseDown={(e) => handleIconMouseDown(e, shortcut.id)}
                onClick={(e) => handleIconClick(e, shortcut.id)}
                className="flex flex-col items-center p-2.5 rounded-lg border border-transparent w-24 select-none cursor-grab active:cursor-grabbing hover:bg-[#253C48]/60 hover:border-[#3daee9]/20"
              >
                <img
                  src={shortcut.icon}
                  alt={shortcut.title}
                  className="w-14 h-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] pointer-events-none select-none drag-none"
                  draggable="false"
                />
                <span className="text-white text-xs font-semibold mt-2.5 text-center leading-tight drop-shadow-md pointer-events-none select-none">
                  {shortcut.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Render Draggable Windows Manager */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="w-full h-full relative pointer-events-none">
          
          {/* About Me Window */}
          <Window
            {...windows.about}
            isActive={activeWindowId === 'about'}
            onClose={() => closeWindow('about')}
            onMinimize={() => minimizeWindow('about')}
            onMaximize={() => toggleMaximizeWindow('about')}
            onFocus={() => focusWindow('about')}
            centerTitle
            hideIcon
          >
            <AboutMe />
          </Window>

          {/* Resume Window */}
          <Window
            {...windows.resume}
            isActive={activeWindowId === 'resume'}
            onClose={() => closeWindow('resume')}
            onMinimize={() => minimizeWindow('resume')}
            onMaximize={() => toggleMaximizeWindow('resume')}
            onFocus={() => focusWindow('resume')}
            centerTitle
            hideIcon
          >
            <ResumeContent />
          </Window>

          {/* Project 01 Window */}
          <Window
            {...windows.project1}
            isActive={activeWindowId === 'project1'}
            onClose={() => closeWindow('project1')}
            onMinimize={() => minimizeWindow('project1')}
            onMaximize={() => toggleMaximizeWindow('project1')}
            onFocus={() => focusWindow('project1')}
            centerTitle
            hideIcon
          >
            <ProjectContent projectId="project1" />
          </Window>

          {/* Project 02 Window */}
          <Window
            {...windows.project2}
            isActive={activeWindowId === 'project2'}
            onClose={() => closeWindow('project2')}
            onMinimize={() => minimizeWindow('project2')}
            onMaximize={() => toggleMaximizeWindow('project2')}
            onFocus={() => focusWindow('project2')}
            centerTitle
            hideIcon
          >
            <ProjectContent projectId="project2" />
          </Window>

          {/* Project 03 Window */}
          <Window
            {...windows.project3}
            isActive={activeWindowId === 'project3'}
            onClose={() => closeWindow('project3')}
            onMinimize={() => minimizeWindow('project3')}
            onMaximize={() => toggleMaximizeWindow('project3')}
            onFocus={() => focusWindow('project3')}
            centerTitle
            hideIcon
          >
            <ProjectContent projectId="project3" />
          </Window>

          {/* System Settings Window */}
          <Window
            {...windows.settings}
            isActive={activeWindowId === 'settings'}
            onClose={() => closeWindow('settings')}
            onMinimize={() => minimizeWindow('settings')}
            onMaximize={() => toggleMaximizeWindow('settings')}
            onFocus={() => focusWindow('settings')}
            centerTitle
            hideIcon
          >
            <SettingsContent 
              currentWallpaper={wallpaperId}
              onSelectWallpaper={handleSelectWallpaper}
              onUploadWallpaper={handleUploadWallpaper}
            />
          </Window>

          {/* Lifedump Window */}
          <Window
            {...windows.lifedump}
            isActive={activeWindowId === 'lifedump'}
            onClose={() => closeWindow('lifedump')}
            onMinimize={() => minimizeWindow('lifedump')}
            onMaximize={() => toggleMaximizeWindow('lifedump')}
            onFocus={() => focusWindow('lifedump')}
            centerTitle
            hideIcon
          >
            <LifedumpContent />
          </Window>

          {/* Certificates Window */}
          <Window
            {...windows.certificates}
            isActive={activeWindowId === 'certificates'}
            onClose={() => closeWindow('certificates')}
            onMinimize={() => minimizeWindow('certificates')}
            onMaximize={() => toggleMaximizeWindow('certificates')}
            onFocus={() => focusWindow('certificates')}
            centerTitle
            hideIcon
          >
            <CertificatesContent />
          </Window>

          {/* Spotify Window */}
          <Window
            {...windows.spotify}
            isActive={activeWindowId === 'spotify'}
            onClose={() => closeWindow('spotify')}
            onMinimize={() => minimizeWindow('spotify')}
            onMaximize={() => toggleMaximizeWindow('spotify')}
            onFocus={() => focusWindow('spotify')}
            centerTitle
            hideIcon
          >
            <SpotifyContent />
          </Window>

        </div>
      </div>

      {/* KDE Application Launcher (Start Menu) */}
      <StartMenu 
        isOpen={isStartMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenWindow={openWindow}
      />

      {/* Bottom Navigation Taskbar */}
      <div className="absolute bottom-4 inset-x-6 z-50 flex pointer-events-auto">
        <BottomNav 
          windows={windows}
          activeWindowId={activeWindowId}
          onToggleWindow={handleToggleWindow}
          onOpenStartMenu={() => setStartMenuOpen(!isStartMenuOpen)}
          isStartMenuOpen={isStartMenuOpen}
        />
      </div>
    </div>
  )
}