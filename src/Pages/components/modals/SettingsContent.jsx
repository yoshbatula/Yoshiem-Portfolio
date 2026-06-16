import { useRef } from 'react'
import ArchLinuxLogo from '../../../assets/ArchLinuxLogo.svg'

export default function SettingsContent({
  currentWallpaper,
  onSelectWallpaper,
  onUploadWallpaper,
}) {
  const fileInputRef = useRef(null)
  const systemInfoRef = useRef(null)

  const wallpapers = [
    { id: 'default', name: 'Plasma Wave', type: 'image' },
    { id: 'neon', name: 'Deep Neon Aurora', type: 'gradient', value: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
    { id: 'nord', name: 'Nordic Frost', type: 'gradient', value: 'linear-gradient(135deg, #2e3440, #3b4252, #4c566a)' },
    { id: 'arch', name: 'Arch Cyberpunk', type: 'gradient', value: 'linear-gradient(135deg, #100e17, #1d182b, #0c2030)' },
  ]

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/yosh.batula.35', icon: 'f' },
    { label: 'Instagram', href: 'https://www.instagram.com/yoshiem_/', icon: 'ig' },
    { label: 'GitHub', href: 'https://github.com/yoshbatula', icon: 'gh' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/yoshbatula', icon: 'in' },
    { label: 'Gmail', href: 'mailto:yoshbatula2@gmail.com', icon: 'gm' },
  ]

  return (
    <div className="flex h-full text-[#eff0f1] font-sans selection:bg-[#3daee9]">
      {/* Settings Sidebar */}
      <div className="w-48 bg-[#212426] border-r border-[#3e4446] p-4 flex flex-col gap-1 shrink-0 select-none text-xs">
        <div className="font-semibold text-gray-400 uppercase tracking-wider px-2.5 pb-2 mb-2 border-b border-[#3e4446]">Appearance</div>
        <button className="w-full text-left px-2.5 py-2 rounded bg-[#3daee9]/15 text-[#3daee9] font-medium border border-[#3daee9]/30">
          Desktop Background
        </button>
        <div className="font-semibold text-gray-400 uppercase tracking-wider px-2.5 pb-2 mt-4 mb-2 border-b border-[#3e4446]">System</div>
        <button
          onClick={() => systemInfoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="w-full text-left px-2.5 py-2 rounded hover:bg-[#31363b] text-gray-300 transition-colors"
        >
          System Information
        </button>
      </div>

      {/* Settings Details Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3e4446] scrollbar-track-transparent p-6 space-y-8">

        {/* Desktop Background */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-l-3 border-[#3daee9] pl-3">Desktop Background</h3>
          <div className="grid grid-cols-2 gap-4">
            {wallpapers.map((wp) => {
              const isSelected = currentWallpaper === wp.id
              return (
                <button
                  key={wp.id}
                  onClick={() => onSelectWallpaper(wp.id)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 text-left group transition-all cursor-pointer ${
                    isSelected ? 'border-[#3daee9] shadow-[0_0_10px_rgba(61,174,233,0.3)]' : 'border-[#3e4446] hover:border-[#eff0f1]/50'
                  }`}
                  style={{
                    background: wp.type === 'gradient' ? wp.value : 'initial',
                    backgroundColor: wp.type === 'image' ? '#212426' : 'initial'
                  }}
                >
                  {wp.type === 'image' && (
                    <div className="absolute inset-0 bg-[#31363b] flex items-center justify-center font-bold text-xs text-[#eff0f1]/30">
                      [ PLASMA DEFAULT ]
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-xs px-2.5 py-1.5 text-xs font-semibold text-white flex justify-between items-center">
                    <span>{wp.name}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#3daee9] ring-4 ring-[#3daee9]/30" />
                    )}
                  </div>
                </button>
              )
            })}

            {/* Upload custom wallpaper */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`relative h-24 rounded-lg overflow-hidden border-2 border-dashed text-left group transition-all cursor-pointer ${
                currentWallpaper === 'custom' ? 'border-[#3daee9] shadow-[0_0_10px_rgba(61,174,233,0.3)]' : 'border-[#3e4446] hover:border-[#eff0f1]/50'
              }`}
            >
              <div className="absolute inset-0 bg-[#212426] flex flex-col items-center justify-center gap-1">
                <svg className="w-6 h-6 text-[#7b8f9a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-[10px] text-[#7b8f9a] font-semibold">Upload Image</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-xs px-2.5 py-1.5 text-xs font-semibold text-white flex justify-between items-center">
                <span>Custom</span>
                {currentWallpaper === 'custom' && (
                  <span className="w-2 h-2 rounded-full bg-[#3daee9] ring-4 ring-[#3daee9]/30" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onUploadWallpaper}
              />
            </button>
          </div>
        </div>

        {/* System Information */}
        <div ref={systemInfoRef} className="space-y-4">
          <h3 className="text-sm font-bold text-white border-l-3 border-[#3daee9] pl-3">System Information</h3>
          <div className="bg-[#1b1e20] p-4 rounded border border-[#3e4446] font-mono text-xs flex flex-col md:flex-row gap-6 items-center">
            {/* Logo */}
            <div className="w-24 h-24 shrink-0 flex items-center justify-center">
              <img src={ArchLinuxLogo} alt="Arch Linux" className="w-20 h-20 object-contain" />
            </div>
            {/* Specs */}
            <div className="space-y-1 text-gray-300">
              <div className="text-white font-bold"><span className="text-[#3daee9]">yoshiem</span>@<span className="text-[#3daee9]">archportfolio</span></div>
              <div className="text-gray-500">------------------</div>
              <div><span className="text-[#3daee9] font-semibold">OS</span>: Arch Linux x86_64</div>
              <div><span className="text-[#3daee9] font-semibold">Host</span>: Yoshiem Virtual Portfolio v1.0.0</div>
              <div><span className="text-[#3daee9] font-semibold">DE</span>: KDE Plasma 6.0.5 (Wayland)</div>
              <div className="text-gray-500">------------------</div>
              {socialLinks.map((link) => (
                <div key={link.label}>
                  <span className="text-[#3daee9] font-semibold">{link.label}</span>:{' '}
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[#7b8f9a] hover:text-[#3daee9] transition-colors">
                    {link.href.replace(/^https?:\/\//, '').replace(/^mailto:/, '')}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
