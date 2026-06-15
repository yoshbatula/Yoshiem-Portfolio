import { useState, useRef, useEffect } from 'react'

export default function Window({
  id,
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  isActive,
  zIndex,
  children,
  defaultWidth = 680,
  defaultHeight = 460,
  defaultX = 120,
  defaultY = 80,
}) {
  const [position, setPosition] = useState({ x: defaultX, y: defaultY })
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight })
  const windowRef = useRef(null)

  // Align window position on load or if it gets off screen
  useEffect(() => {
    // Ensure window isn't completely off screen on mount
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const x = Math.max(20, Math.min(defaultX, screenWidth - 100))
    const y = Math.max(20, Math.min(defaultY, screenHeight - 100))
    setPosition({ x, y })
  }, [])

  if (!isOpen) return null
  if (isMinimized) return null

  // Handle Dragging
  const handleMouseDown = (e) => {
    onFocus()
    
    // Do not drag if clicking control buttons
    if (e.target.closest('.window-control-btn')) return
    if (isMaximized) return

    e.preventDefault()
    const startX = e.clientX
    const startY = e.clientY
    const initialX = position.x
    const initialY = position.y

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX
      const deltaY = moveEvent.clientY - startY
      
      setPosition({
        x: initialX + deltaX,
        y: Math.max(0, initialY + deltaY), // Keep titlebar reachable
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle Resizing
  const handleResizeMouseDown = (e) => {
    onFocus()
    e.preventDefault()
    e.stopPropagation()

    if (isMaximized) return

    const startX = e.clientX
    const startY = e.clientY
    const initialWidth = size.width
    const initialHeight = size.height

    const handleMouseMove = (moveEvent) => {
      const nextWidth = Math.max(400, initialWidth + (moveEvent.clientX - startX))
      const nextHeight = Math.max(300, initialHeight + (moveEvent.clientY - startY))
      
      setSize({
        width: nextWidth,
        height: nextHeight,
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Handle Double Click Title Bar to Maximize
  const handleTitleDoubleClick = () => {
    onMaximize()
  }

  // Window styles depending on state
  const windowStyle = isMaximized
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'calc(100vh - 60px)', // Leave room for bottom navigation
        zIndex,
      }
    : {
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      }

  return (
    <div
      ref={windowRef}
      style={windowStyle}
      onClick={onFocus}
      className={`flex flex-col bg-[#242729]/95 backdrop-blur-md rounded-lg overflow-hidden border border-[#3e4446] shadow-2xl transition-shadow duration-200 select-none ${
        isActive ? 'border-[#3daee9] shadow-[0_0_15px_rgba(61,174,233,0.25)]' : 'opacity-90'
      }`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={handleTitleDoubleClick}
        className={`flex items-center justify-between h-9 px-3 cursor-move border-b border-[#3e4446] ${
          isActive ? 'bg-[#1b1e20]' : 'bg-[#212426]'
        }`}
      >
        {/* Title & Icon */}
        <div className="flex items-center gap-2">
          {icon && <img src={icon} alt="" className="w-4.5 h-4.5 object-contain" />}
          <span className="text-sm font-medium text-[#eff0f1] tracking-wide truncate max-w-[250px]">
            {title}
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex items-center gap-1.5">
          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="window-control-btn w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors group"
            title="Minimize"
          >
            <div className="w-2.5 h-[1.5px] bg-[#a5a6a7] group-hover:bg-[#fdbc40] transition-colors" />
          </button>

          {/* Maximize */}
          <button
            onClick={onMaximize}
            className="window-control-btn w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors group"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <div className="w-2.5 h-2.5 border-[1.5px] border-[#a5a6a7] group-hover:border-[#2ecc71] transition-colors relative">
                <div className="absolute top-[2px] left-[2px] w-1 h-1 border-[1px] border-[#a5a6a7] group-hover:border-[#2ecc71]" />
              </div>
            ) : (
              <div className="w-2.5 h-2.5 border-[1.5px] border-[#a5a6a7] group-hover:border-[#2ecc71] transition-colors rounded-[1px]" />
            )}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="window-control-btn w-6 h-6 rounded-full hover:bg-[#da4453] flex items-center justify-center transition-colors group"
            title="Close"
          >
            <svg
              className="w-2.5 h-2.5 text-[#a5a6a7] group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#31363b] text-[#eff0f1] font-sans selection:bg-[#3daee9] selection:text-white">
        {children}
      </div>

      {/* Resize Handle (only visible and interactive if not maximized) */}
      {!isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-50 group"
        >
          {/* Subtle resize grip lines */}
          <svg className="w-2 h-2 text-[#eff0f1]/20 group-hover:text-[#3daee9] transition-colors" viewBox="0 0 10 10">
            <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="4" x2="4" y2="10" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  )
}
