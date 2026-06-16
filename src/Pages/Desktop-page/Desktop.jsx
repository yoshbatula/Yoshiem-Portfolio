import { useState } from 'react'
import BackgroundImage from "../../assets/BackgroundImage.png"
import BottomNav from "../components/BottomNav"
import StartMenu from "../components/StartMenu"
import Window from "../components/Window"

// Desktop icons
import FileIcon from "../../assets/FileIcon.svg"
import FolderIcon from "../../assets/FolderIcon.svg"
import SettingsIcon from "../../assets/Settings.svg"
import LifedumpIcon from "../../assets/Lifedump.svg"

// Modals contents
import AboutMe from "../components/modals/AboutMe"
import ResumeContent from "../components/modals/ResumeContent"
import ProjectContent from "../components/modals/ProjectContent"
import SettingsContent from "../components/modals/SettingsContent"
import LifedumpContent from "../components/modals/LifedumpContent"

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
    lifedump: { id: 'lifedump', title: 'Lifedump Journal', icon: LifedumpIcon, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, defaultX: 200, defaultY: 70, defaultWidth: 680, defaultHeight: 500 }
  })

  const [maxZIndex, setMaxZIndex] = useState(10)
  const [activeWindowId, setActiveWindowId] = useState(null)
  const [isStartMenuOpen, setStartMenuOpen] = useState(false)
  
  // Wallpaper state
  const [wallpaperId, setWallpaperId] = useState('default')
  // Theme state
  const [systemTheme, setSystemTheme] = useState('dark')

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
    setStartMenuOpen(false) // Close launcher when app opens
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

  const handleToggleTheme = () => {
    setSystemTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const currentWp = WALLPAPERS[wallpaperId] || WALLPAPERS.default

  return (
    <div 
      className={`w-full h-screen relative overflow-hidden select-none transition-all duration-300 ${
        systemTheme === 'light' ? 'light-theme' : ''
      }`}
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
          <div className="transform translate-y-[-10%] flex flex-col items-center">
            <h1 className="text-white text-[32px] md:text-[41px] font-light tracking-widest">WELCOME TO MY</h1>
            <h1 className="text-white text-[64px] md:text-[80px] font-light mt-2 tracking-widest font-display">PORTFOLIO</h1>
          </div>
        </div>

        {/* Desktop Shortcuts (Grid placements using pointer-events-auto) */}
        <div className="flex-1 relative pointer-events-none">
          
          {/* Resume Icon */}
          <div className="absolute top-[5%] left-[3%] pointer-events-auto">
            <button 
              onClick={() => openWindow('resume')}
              className="flex flex-col items-center p-2.5 rounded-lg hover:bg-[#253C48] border border-transparent hover:border-[#3daee9]/30 w-24 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <img src={FileIcon} alt="Resume" className="w-14 h-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform" />
              <span className="text-white text-xs font-semibold mt-2.5 text-center leading-tight drop-shadow-md">Resume.pdf</span>
            </button>
          </div>

          {/* About Me */}
          <div className="absolute top-[28%] left-[3%] pointer-events-auto">
            <button 
              onClick={() => openWindow('about')}
              className="flex flex-col items-center p-2.5 rounded-lg hover:bg-[#253C48] border border-transparent hover:border-[#3daee9]/30 w-24 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <img src={FolderIcon} alt="About Me" className="w-14 h-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform" />
              <span className="text-white text-xs font-semibold mt-2.5 text-center leading-tight drop-shadow-md">About me</span>
            </button>
          </div>

          {/* Project 01 */}
          <div className="absolute top-[5%] right-[3%] pointer-events-auto">
            <button 
              onClick={() => openWindow('project1')}
              className="flex flex-col items-center p-2.5 rounded-lg hover:bg-[#253C48] border border-transparent hover:border-[#3daee9]/30 w-24 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <img src={FolderIcon} alt="Project 01" className="w-14 h-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform" />
              <span className="text-white text-xs font-semibold mt-2.5 text-center leading-tight drop-shadow-md">Project 01</span>
            </button>
          </div>

          {/* Project 02 */}
          <div className="absolute top-[28%] right-[3%] pointer-events-auto">
            <button 
              onClick={() => openWindow('project2')}
              className="flex flex-col items-center p-2.5 rounded-lg hover:bg-[#253C48] border border-transparent hover:border-[#3daee9]/30 w-24 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <img src={FolderIcon} alt="Project 02" className="w-14 h-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform" />
              <span className="text-white text-xs font-semibold mt-2.5 text-center leading-tight drop-shadow-md">Project 02</span>
            </button>
          </div>

          {/* Project 03 */}
          <div className="absolute top-[51%] right-[3%] pointer-events-auto">
            <button 
              onClick={() => openWindow('project3')}
              className="flex flex-col items-center p-2.5 rounded-lg hover:bg-[#253C48] border border-transparent hover:border-[#3daee9]/30 w-24 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            >
              <img src={FolderIcon} alt="Project 03" className="w-14 h-14 drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform" />
              <span className="text-white text-xs font-semibold mt-2.5 text-center leading-tight drop-shadow-md">Project 03</span>
            </button>
          </div>

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
          >
            <SettingsContent 
              currentWallpaper={wallpaperId}
              onSelectWallpaper={handleSelectWallpaper}
              systemTheme={systemTheme}
              onToggleTheme={handleToggleTheme}
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
          >
            <LifedumpContent />
          </Window>

        </div>
      </div>

      {/* KDE Application Launcher (Start Menu) */}
      <StartMenu 
        isOpen={isStartMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenWindow={openWindow}
        windows={windows}
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