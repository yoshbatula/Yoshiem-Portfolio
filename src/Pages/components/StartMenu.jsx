import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FileIcon from '../../assets/FileIcon.svg'
import FolderIcon from '../../assets/FolderIcon.svg'
import UserAvatar from '../../assets/UserAvatar.svg'
import Lifedump from '../../assets/Lifedump.svg'
import Settings from '../../assets/Settings.svg'
export default function StartMenu({
  isOpen,
  onClose,
  onOpenWindow,
}) {
  const navigate = useNavigate()
  const menuRef = useRef(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All Applications')

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('button')) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Define categories and their icons
  const categories = [
    {
      name: 'All Applications',
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      )
    },
    {
      name: 'Development',
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A1.5 1.5 0 0020 20l-5.91-5.91m-2.67 1.08c-.7-.7-.82-1.78-.36-2.61l4.89-4.89a2.5 2.5 0 10-3.53-3.53L7.53 7.93c-.83.46-1.91.34-2.61-.36a2.61 2.61 0 10-3.69 3.69c.7.7 1.78.82 2.61.36l4.89 4.89a2.5 2.5 0 103.53 3.53l3.96-3.96" />
        </svg>
      )
    },
    {
      name: 'Education',
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      )
    },
    {
      name: 'Contact',
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      )
    }
  ]


  // Applications list with their specific categories
  const appList = [
    { id: 'project1', title: 'Project 01', type: 'folder', icon: FolderIcon, categories: ['All Applications', 'Development'] },
    { id: 'project2', title: 'Project 02', type: 'folder', icon: FolderIcon, categories: ['All Applications', 'Development'] },
    { id: 'project3', title: 'Project 03', type: 'folder', icon: FolderIcon, categories: ['All Applications', 'Development'] },
    { id: 'resume', title: 'Resume.pdf', type: 'file', icon: FileIcon, categories: ['All Applications'] },
    { id: 'lifedump', title: 'Lifedump', type: 'folder', icon: Lifedump, categories: ['All Applications'] },
    { id: 'about', title: 'About me', type: 'folder', icon: FolderIcon, categories: ['All Applications', 'Education'] },
    { id: 'settings', title: 'System Settings', type: 'folder', icon: Settings, categories: ['Contact', 'All Applications'] }
  ]

  // Filter apps by search term and active category tab
  const filteredApps = appList.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = app.categories.includes(activeCategory)
    return matchesSearch && matchesCategory
  })

  const handleAppClick = (id) => {
    onOpenWindow(id)
    onClose()
  }

  const handleSleep = () => {
    alert("Entering standby/sleep mode... (Simulated)")
    onClose()
  }

  const handleRestart = () => {
    // Reboot the simulated OS by navigating to the loader page
    navigate('/')
    onClose()
  }

  const handleShutdown = () => {
    navigate('/shutdown')
    onClose()
  }

  return (
    <div 
      ref={menuRef}
      className="absolute bottom-[72px] left-6 w-[580px] h-[530px] bg-[#212326]/95 backdrop-blur-md border border-[#2d3034] rounded-lg shadow-2xl flex flex-col overflow-hidden z-[999] select-none text-[#eff0f1] font-mono"
    >
      {/* Header Area */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-[#2d3034] shrink-0">
        {/* User profile details */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#1b1d20] border border-[#2d3034] p-0.5 flex items-center justify-center">
            <img src={UserAvatar} alt="Avatar" className="w-full h-full object-contain" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-white">Yoshiem</span>
        </div>

        {/* Search Input Box */}
        <div className="relative w-64">
          <input 
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1b1d20] border border-[#2d3034] rounded px-3 py-1.5 pl-8 text-xs text-[#eff0f1] focus:outline-none focus:ring-1 focus:ring-[#3daee9] placeholder-gray-500"
            autoFocus
          />
          <svg className="absolute left-2.5 top-2 w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 flex min-h-0">
        
        {/* Left Category Sidebar */}
        <div className="w-[220px] border-r border-[#2d3034] py-3.5 px-2 flex flex-col gap-1 shrink-0 bg-[#212326]/30">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveCategory(cat.name)
                  setSearch('')
                }}
                className={`w-full flex items-center gap-3.5 px-4.5 py-2.5 rounded text-xs transition-all text-left cursor-pointer border ${
                  isActive 
                    ? 'bg-[#2a2d32] border-[#2d3034] text-white border-l-2 border-l-[#3daee9]' 
                    : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {cat.icon}
                <span className="font-semibold tracking-wide">{cat.name}</span>
              </button>
            )
          })}
        </div>

        {/* Right Applications Grid */}
        <div className="flex-1 overflow-y-auto p-5 content-start">
          <div className="grid grid-cols-3 gap-y-6 gap-x-2 justify-items-center">
            {filteredApps.length > 0 ? (
              filteredApps.map((app, index) => (
                <button
                  key={`${app.id}-${index}`}
                  onClick={() => handleAppClick(app.id)}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('application/x-app', JSON.stringify({ id: app.id, title: app.title }))
                    e.dataTransfer.effectAllowed = 'copy'
                  }}
                  className="flex flex-col items-center gap-2 p-2.5 rounded-lg border border-transparent hover:bg-[#253C48] hover:border-[#3daee9]/30 hover:scale-[1.02] active:scale-[0.98] transition-all w-24 text-center cursor-pointer group"
                >
                  {app.type === 'discover' ? (
                    app.icon
                  ) : (
                    <img 
                      src={app.icon} 
                      alt="" 
                      className="w-12 h-12 object-contain shrink-0 group-hover:scale-105 transition-transform" 
                    />
                  )}
                  <span className="text-[11px] text-white leading-tight break-words max-w-[85px] tracking-wide font-mono">
                    {app.title}
                  </span>
                </button>
              ))
            ) : (
              <div className="col-span-3 py-16 text-center text-xs text-gray-500 w-full">
                No apps found in this category
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Footer Area */}
      <div className="h-14 border-t border-[#2d3034] flex items-center justify-between px-5 shrink-0 bg-[#1b1d20]/10 select-none">
        
        {/* Left Side: Applications Tab Indicator */}
        <div className="relative h-full flex items-center">
          <button className="flex items-center gap-2 text-xs font-semibold text-white px-2 py-1 hover:text-[#3daee9] transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            <span>Applications</span>
          </button>
          {/* Blue line highlight under active tab */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#3daee9]" />
        </div>

        {/* Right Side: System Power Controls */}
        <div className="flex items-center gap-4 text-xs font-semibold text-gray-400">
          {/* Sleep */}
          <button 
            onClick={handleSleep}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title="Sleep"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
            <span>Sleep</span>
          </button>

          {/* Restart */}
          <button 
            onClick={handleRestart}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title="Restart"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span>Restart</span>
          </button>

          {/* Shutdown */}
          <button 
            onClick={handleShutdown}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            title="Shut Down"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
            </svg>
            <span>Shutdown</span>
          </button>
        </div>

      </div>

    </div>
  )
}
