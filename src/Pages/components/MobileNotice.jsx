import { useState, useEffect } from 'react'

export default function MobileNotice() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (!isMobile) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm flex flex-col bg-[#242729]/95 backdrop-blur-md rounded-lg overflow-hidden border border-[#3e4446] shadow-2xl select-none font-mono">
        <div className="flex items-center h-9 px-3 border-b border-[#3e4446] bg-[#1b1e20]">
          <span className="absolute inset-x-0 text-center text-sm font-medium text-[#eff0f1] tracking-wide truncate pointer-events-none">
            System Notice
          </span>
          <div className="ml-auto flex items-center gap-1.5 relative z-10">
            <div className="w-6 h-6 flex items-center justify-center opacity-40">
              <svg className="w-4 h-4 text-[#eff0f1]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#31363b] p-5 space-y-4">
          <div className="flex items-center justify-center py-4">
            <svg className="w-28 h-28 text-[#4a5568]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
              <line x1="7" y1="7" x2="17" y2="17" stroke="#da4453" strokeWidth="1.8" />
              <circle cx="7" cy="7" r="0.01" fill="#da4453" />
            </svg>
          </div>

          <p className="text-[13px] text-[#eff0f1] text-center leading-relaxed">
            This portfolio is a <span className="text-[#3daee9] font-semibold">Arch Linux desktop OS simulation</span>. For the full experience with all features and specs, please visit on a <span className="text-[#3daee9] font-semibold">laptop or PC</span>.
          </p>

          <div className="flex items-center gap-2 justify-center pt-1">
            <div className="h-[5px] w-8 rounded-sm bg-[#3daee9]" />
            <div className="h-[5px] w-8 rounded-sm bg-[#3daee9]" />
            <div className="h-[5px] w-8 rounded-sm bg-[#4a5568]" />
            <div className="h-[5px] w-8 rounded-sm bg-[#4a5568]" />
            <div className="h-[5px] w-8 rounded-sm bg-[#4a5568]" />
          </div>

          <p className="text-[10px] text-[#7b8f9a] text-center tracking-[0.12em] uppercase font-medium pt-1">
            Mobile viewport detected
          </p>
        </div>
      </div>
    </div>
  )
}
