import { useState, useRef, useEffect } from 'react'
import MinimizeIcon from '../../assets/Minimize.svg'
import MaximizeIcon from '../../assets/Maximaze.svg'
import ExitIcon from '../../assets/Exit.svg'

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
  centerTitle = false,
  hideIcon = false,
}) {
  const [position, setPosition] = useState({ x: defaultX, y: defaultY })
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight })
  const windowRef = useRef(null)

  // Center window on load
  useEffect(() => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const x = Math.max(20, (screenWidth - defaultWidth) / 2)
    const y = Math.max(20, (screenHeight - defaultHeight - 70) / 2)
    setPosition({ x, y })
  }, [])

  if (!isOpen) return null

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
      className={`pointer-events-auto flex flex-col bg-[#242729]/95 backdrop-blur-md rounded-lg overflow-hidden border border-[#3e4446] shadow-2xl transition-shadow duration-200 select-none ${
        isMinimized ? 'hidden' : ''
      } ${
        isActive ? '' : 'opacity-90'
      }`}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={handleTitleDoubleClick}
        className={`relative flex items-center h-9 px-3 cursor-move border-b border-[#3e4446] ${
          isActive ? 'bg-[#1b1e20]' : 'bg-[#212426]'
        }`}
      >
        {/* Title — left or centered */}
        {centerTitle ? (
          <span className="absolute inset-x-0 text-center text-sm font-medium text-[#eff0f1] tracking-wide truncate pointer-events-none">
            {title}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            {!hideIcon && icon && <img src={icon} alt="" className="w-4.5 h-4.5 object-contain" />}
            <span className="text-sm font-medium text-[#eff0f1] tracking-wide truncate max-w-[250px]">
              {title}
            </span>
          </div>
        )}

        {/* Window Controls — always right-aligned */}
        <div
          className="ml-auto flex items-center gap-1.5 relative z-10"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="window-control-btn w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-70 cursor-pointer"
            title="Minimize"
          >
            <img src={MinimizeIcon} alt="Minimize" className="w-4 h-4 object-contain" />
          </button>

          {/* Maximize */}
          <button
            onClick={onMaximize}
            className="window-control-btn w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-70 cursor-pointer"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            <img src={MaximizeIcon} alt="Maximize" className="w-4 h-4 object-contain" />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="window-control-btn w-6 h-6 flex items-center justify-center transition-opacity hover:opacity-70 cursor-pointer"
            title="Close"
          >
            <img src={ExitIcon} alt="Close" className="w-4 h-4 object-contain" />
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
