import KDEPLASMAICON from "../../assets/KDEPLASMAICON.svg"
import SettingsIcon from "../../assets/Settings.svg"
import LifedumpIcon from "../../assets/Lifedump.svg"
import Speaker from "../../assets/SpeakerIcon.svg"
import EthernetIcon from "../../assets/EthernetIcon.svg"
import { useState, useEffect } from 'react'

export default function BottomNav({
  windows = {},
  activeWindowId = null,
  onToggleWindow = () => {},
  onOpenStartMenu = () => {},
  isStartMenuOpen = false
}) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Format time to 12-hour format with AM/PM
  const formatTime = (date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
    return `${hours}:${minutes} ${ampm}`
  }

  // Format date to MM/DD/YYYY
  const formatDate = (date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Filter windows that are currently open in the taskbar
  const openWindows = Object.values(windows).filter(w => w.isOpen)

  return (
    <div className="px-4 w-full h-14 bg-[#242729]/95 backdrop-blur-md border border-[#3e4446]/50 rounded-[10px] flex flex-row items-center gap-3 shadow-xl select-none">
      
      {/* Quick Launch Icons */}
      <div className="flex items-center gap-1">
        {/* Plasma launcher button */}
        <button 
          onClick={onOpenStartMenu}
          className="p-1.5 rounded hover:bg-white/10 transition-colors cursor-pointer relative border border-transparent"
          title="Application Menu"
        >
          <img src={KDEPLASMAICON} alt="KDE Plasma Icon" className="w-8 h-8" />
          {isStartMenuOpen && (
            <div className="absolute top-0 left-[5%] right-[5%] h-[2.5px] bg-[#3daee9] rounded-b" />
          )}
        </button>

        {/* Settings shortcut */}
        <button 
          onClick={() => onToggleWindow('settings')}
          className={`p-1.5 rounded transition-all cursor-pointer ${
            windows['settings']?.isOpen && activeWindowId === 'settings' 
              ? 'bg-[#3daee9]/20 border border-[#3daee9]/40' 
              : 'hover:bg-white/10'
          }`}
          title="System Settings"
        >
          <img src={SettingsIcon} alt="Settings Icon" className="w-8 h-8" />
        </button>

        {/* Lifedump shortcut */}
        <button 
          onClick={() => onToggleWindow('lifedump')}
          className={`p-1.5 rounded transition-all cursor-pointer ${
            windows['lifedump']?.isOpen && activeWindowId === 'lifedump' 
              ? 'bg-[#3daee9]/20 border border-[#3daee9]/40' 
              : 'hover:bg-white/10'
          }`}
          title="Lifedump Photos"
        >
          <img src={LifedumpIcon} alt="Lifedump Icon" className="w-8 h-8" />
        </button>
      </div>

      {/* Taskbar divider */}
      {openWindows.length > 0 && <div className="w-[1px] h-6 bg-[#3e4446]" />}

      {/* Active Windows Taskbar List */}
      <div className="flex-1 flex flex-row items-center gap-2 overflow-x-auto scrollbar-none">
        {openWindows.map((win) => {
          const isActive = activeWindowId === win.id
          const isMinimized = win.isMinimized

          return (
            <button
              key={win.id}
              onClick={() => onToggleWindow(win.id)}
              className={`flex items-center gap-2 px-3 h-9 rounded transition-all max-w-[160px] text-xs font-medium cursor-pointer border relative ${
                isActive 
                  ? 'bg-[#3daee9]/20 border-[#3daee9] text-white' 
                  : isMinimized
                    ? 'bg-[#1b1e20]/40 border-transparent text-[#eff0f1]/55 hover:bg-[#31363b]'
                    : 'bg-[#31363b]/60 border-[#3e4446] text-[#eff0f1] hover:bg-[#31363b]'
              }`}
            >
              {win.icon && (
                <img 
                  src={win.icon} 
                  alt="" 
                  className={`w-4 h-4 object-contain ${isMinimized ? 'opacity-50' : 'opacity-100'}`} 
                />
              )}
              <span className="truncate">{win.title}</span>
              
              {/* Active indicator line (matching the start menu launcher) */}
              {isActive && (
                <div className="absolute top-0 left-[20%] right-[20%] h-[2.5px] bg-[#3daee9] rounded-b" />
              )}
            </button>
          )
        })}
      </div>

      {/* System Tray (Right Side) */}
      <div className="flex flex-row items-center gap-4 text-[#eff0f1] select-none shrink-0">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer" title="Volume">
            <img src={Speaker} alt="Speaker Icon" className="w-7 h-7" />
          </button>
          <button className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer" title="Network">
            <img src={EthernetIcon} alt="Ethernet Icon" className="w-7 h-7" />
          </button>
        </div>

        {/* Date & Time Widget */}
        <div className="flex flex-col items-end justify-center pl-2 border-l border-[#3e4446] h-8 text-[11px] font-medium leading-tight">
          <span>{formatTime(time)}</span>
          <span className="text-[#a5a6a7] text-[10px] mt-0.5">{formatDate(time)}</span>
        </div>
      </div>
    </div>
  )
}