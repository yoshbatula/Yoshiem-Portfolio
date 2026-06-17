import KDEPLASMAICON from "../../assets/KDEPLASMAICON.svg"
import SettingsIcon from "../../assets/Settings.svg"
import LifedumpIcon from "../../assets/Lifedump.svg"
import Speaker from "../../assets/SpeakerIcon.svg"
import EthernetIcon from "../../assets/EthernetIcon.svg"
import MicrophoneIcon from "../../assets/Microphone.svg"
import SpotifyIcon from "../../assets/SpotifyIcon .svg"
import { useState, useEffect, useRef } from 'react'

export default function BottomNav({
  windows = {},
  activeWindowId = null,
  onToggleWindow = () => {},
  onOpenStartMenu = () => {},
  isStartMenuOpen = false,
  isMaximized = false
}) {
  const [time, setTime] = useState(new Date())
  const [activePopup, setActivePopup] = useState(null)
  const [volume, setVolume] = useState(75)
  const [muted, setMuted] = useState(false)
  const [micVolume, setMicVolume] = useState(80)
  const [wifiEnabled, setWifiEnabled] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [ethernetConnected, setEthernetConnected] = useState(true)
  const [connecting, setConnecting] = useState(null)
  const [wifiNetwork, setWifiNetwork] = useState(null)
  const popupRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target) && !e.target.closest('[data-tray]')) {
        setActivePopup(null)
      }
    }
    if (activePopup) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activePopup])

  const togglePopup = (name) => {
    setActivePopup(activePopup === name ? null : name)
    if (activePopup !== name) setSearchQuery('')
  }

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
    <div className={`px-4 w-full h-14 bg-[#242729]/95 backdrop-blur-md border border-[#3e4446]/50 flex flex-row items-center gap-3 shadow-xl select-none ${isMaximized ? '' : 'rounded-[10px]'}`}>
      
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

        {/* Spotify shortcut */}
        <button 
          onClick={() => onToggleWindow('spotify')}
          className={`p-1.5 rounded transition-all cursor-pointer ${
            windows['spotify']?.isOpen && activeWindowId === 'spotify' 
              ? 'bg-[#3daee9]/20 border border-[#3daee9]/40' 
              : 'hover:bg-white/10'
          }`}
          title="Spotify"
        >
          <img src={SpotifyIcon} alt="Spotify Icon" className="w-8 h-8" />
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
      <div className="flex flex-row items-center gap-4 text-[#eff0f1] select-none shrink-0 relative">
        <div className="flex items-center gap-2" ref={popupRef}>
          {/* Volume Tray */}
          <div className="relative">
            <button
              data-tray="volume"
              onClick={() => togglePopup('volume')}
              className={`p-1 rounded transition-colors cursor-pointer relative ${activePopup === 'volume' ? 'bg-white/15' : 'hover:bg-white/10'}`}
              title="Volume"
            >
              <img src={Speaker} alt="Speaker Icon" className="w-7 h-7" />
              {activePopup === 'volume' && (
                <div className="absolute top-0 left-[10%] right-[10%] h-[2.5px] bg-[#3daee9] rounded-b" />
              )}
            </button>

            {activePopup === 'volume' && (
              <div className="absolute bottom-full right-0 mb-2 w-72 bg-[#1d1f21] border border-[#3e4446] rounded-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#3e4446] bg-[#1d1f21]">
                  <p className="text-[12px] font-semibold text-[#eff0f1] text-center tracking-wide">Audio Volume</p>
                </div>

                <div className="p-3 space-y-4 bg-[#25282a]">
                  {/* Output Devices */}
                  <div>
                    <p className="text-[9px] tracking-[0.12em] text-[#596b75] uppercase font-semibold mb-2">Output Devices</p>

                    {/* Speaker output */}
                    <div className="flex items-center gap-3 bg-[#1d1f21] rounded px-3 py-2.5">
                      <img src={Speaker} alt="" className="w-5 h-5 shrink-0" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={muted ? 0 : volume}
                        onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false) }}
                        style={{ background: `linear-gradient(to right, #3daee9 0%, #3daee9 ${muted ? 0 : volume}%, #3e4446 ${muted ? 0 : volume}%, #3e4446 100%)` }}
                        className="flex-1 h-1 appearance-none rounded-full outline-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                          [&::-webkit-slider-thumb]:bg-[#25282a] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#3daee9]
                          [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
                      />
                      <span className="text-[11px] text-[#eff0f1] font-mono w-8 text-right shrink-0">
                        {muted ? 0 : volume}%
                      </span>
                    </div>
                  </div>

                  {/* Input Devices */}
                  <div>
                    <p className="text-[9px] tracking-[0.12em] text-[#596b75] uppercase font-semibold mb-2">Input Devices</p>

                    {/* Microphone input */}
                    <div className="flex items-center gap-3 bg-[#1d1f21] rounded px-3 py-2.5">
                      <img src={MicrophoneIcon} alt="" className="w-5 h-5 shrink-0 object-contain" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={micVolume}
                        onChange={(e) => setMicVolume(Number(e.target.value))}
                        style={{ background: `linear-gradient(to right, #3daee9 0%, #3daee9 ${micVolume}%, #3e4446 ${micVolume}%, #3e4446 100%)` }}
                        className="flex-1 h-1 appearance-none rounded-full outline-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                          [&::-webkit-slider-thumb]:bg-[#25282a] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#3daee9]
                          [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125"
                      />
                      <span className="text-[11px] text-[#eff0f1] font-mono w-8 text-right shrink-0">{micVolume}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Network Tray */}
          <div className="relative">
            <button
              data-tray="network"
              onClick={() => togglePopup('network')}
              className={`p-1 rounded transition-colors cursor-pointer relative ${activePopup === 'network' ? 'bg-white/15' : 'hover:bg-white/10'}`}
              title="Network"
            >
              <div className="relative">
                <img src={EthernetIcon} alt="Ethernet Icon" className="w-7 h-7" />
                {!ethernetConnected && !wifiNetwork && (
                  <svg className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 text-[#da4453]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                )}
              </div>
              {activePopup === 'network' && (
                <div className="absolute top-0 left-[10%] right-[10%] h-[2.5px] bg-[#3daee9] rounded-b" />
              )}
            </button>

            {activePopup === 'network' && (
              <div className="absolute bottom-full right-0 mb-2 w-72 bg-[#1d1f21] border border-[#3e4446] rounded-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#3e4446]">
                  <p className="text-[12px] font-semibold text-[#eff0f1] text-center tracking-wide">Networks</p>
                </div>

                <div className="p-3 space-y-3">
                  {/* WiFi Toggle + Search Row */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setWifiEnabled(!wifiEnabled)}
                      className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${
                        wifiEnabled ? 'bg-[#3daee9]' : 'bg-[#3e4446]'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                          wifiEnabled ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <svg className="w-5 h-5 text-[#eff0f1] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12.55a11 11 0 0114.08 0" />
                      <path d="M1.42 9a16 16 0 0121.16 0" />
                      <path d="M8.53 16.11a6 6 0 016.95 0" />
                      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
                    </svg>
                    <div className="relative flex-1">
                      <svg className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#7b8f9a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search networks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#25282a] border border-[#3e4446] rounded text-[11px] text-[#eff0f1] pl-7 pr-2.5 py-1.5 outline-none placeholder:text-[#596b75] focus:border-[#3daee9]/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Connected */}
                  <div>
                    <p className="text-[9px] tracking-[0.12em] text-[#596b75] uppercase font-semibold mb-1.5">Connected</p>
                    <div className="space-y-1">
                      {/* Ethernet - always visible */}
                      <div className={`flex items-center justify-between rounded px-3 py-2 ${ethernetConnected ? 'bg-[#25282a]' : 'bg-[#25282a]/50'}`}>
                        <div className="flex items-center gap-2.5">
                          <img src={EthernetIcon} alt="" className={`w-4 h-4 ${ethernetConnected ? '' : 'opacity-40'}`} />
                          <span className={`text-[11px] ${ethernetConnected ? 'text-[#eff0f1]' : 'text-[#7b8f9a]'}`}>
                            {ethernetConnected ? 'wired connect' : 'disconnected'}
                          </span>
                        </div>
                        <button
                          onClick={() => { setEthernetConnected(!ethernetConnected); setConnecting(null) }}
                          className={`text-[10px] font-medium transition-colors cursor-pointer ${ethernetConnected ? 'text-[#da4453] hover:text-[#e05a68]' : 'text-[#3daee9] hover:text-[#6bc1f0]'}`}
                        >
                          {ethernetConnected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>

                      {/* WiFi - only when active */}
                      {wifiNetwork && (
                        <div className="flex items-center justify-between bg-[#25282a] rounded px-3 py-2">
                          <div className="flex items-center gap-2.5">
                            <svg className={`w-4 h-4 ${connecting === wifiNetwork ? 'text-[#7b8f9a]' : 'text-[#3daee9]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12.55a11 11 0 0114.08 0" />
                              <path d="M1.42 9a16 16 0 0121.16 0" />
                              <path d="M8.53 16.11a6 6 0 016.95 0" />
                              <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
                            </svg>
                            <span className={`text-[11px] ${connecting === wifiNetwork ? 'text-[#7b8f9a]' : 'text-[#eff0f1]'}`}>
                              {wifiNetwork}
                              {connecting === wifiNetwork && (
                                <span className="ml-2 text-[10px] text-[#596b75]">connecting...</span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {connecting === wifiNetwork && (
                              <svg className="w-3.5 h-3.5 animate-spin text-[#3daee9]" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            )}
                            <button
                              onClick={() => { setWifiNetwork(null); setConnecting(null) }}
                              className="text-[10px] text-[#da4453] hover:text-[#e05a68] font-medium transition-colors cursor-pointer"
                            >
                              Disconnect
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Available */}
                  {wifiEnabled && (
                    <div>
                      <p className="text-[9px] tracking-[0.12em] text-[#596b75] uppercase font-semibold mb-1.5">Available</p>
                      {['yoshiem-portfolio']
                        .filter((net) => net !== wifiNetwork)
                        .filter((net) => net.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((net) => (
                          <div key={net} className="flex items-center justify-between bg-[#25282a] rounded px-3 py-2 transition-colors">
                            <div className="flex items-center gap-2.5">
                              <svg className="w-4 h-4 text-[#7b8f9a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12.55a11 11 0 0114.08 0" />
                                <path d="M1.42 9a16 16 0 0121.16 0" />
                                <path d="M8.53 16.11a6 6 0 016.95 0" />
                                <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
                              </svg>
                              <span className="text-[11px] text-[#eff0f1]">{net}</span>
                            </div>
                            <button
                              onClick={() => {
                                setWifiNetwork(net)
                                if (ethernetConnected) {
                                  setConnecting(net)
                                }
                              }}
                              disabled={connecting !== null}
                              className="text-[10px] text-[#3daee9] hover:text-[#6bc1f0] font-medium transition-colors cursor-pointer disabled:hidden"
                            >
                              {connecting === net ? (
                                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                              ) : 'Connect'}
                            </button>
                          </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

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