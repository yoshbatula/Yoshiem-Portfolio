import ArchLinuxLogo from '../../../assets/ArchLinuxLogo.svg'

export default function SettingsContent({ 
  currentWallpaper, 
  onSelectWallpaper, 
  systemTheme, 
  onToggleTheme 
}) {
  const wallpapers = [
    { id: 'default', name: 'Plasma Wave', type: 'image' },
    { id: 'neon', name: 'Deep Neon Aurora', type: 'gradient', value: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
    { id: 'nord', name: 'Nordic Frost', type: 'gradient', value: 'linear-gradient(135deg, #2e3440, #3b4252, #4c566a)' },
    { id: 'arch', name: 'Arch Cyberpunk', type: 'gradient', value: 'linear-gradient(135deg, #100e17, #1d182b, #0c2030)' },
  ]

  return (
    <div className="flex h-full text-[#eff0f1] font-sans selection:bg-[#3daee9]">
      {/* Settings Sidebar */}
      <div className="w-48 bg-[#212426] border-r border-[#3e4446] p-4 flex flex-col gap-1 shrink-0 select-none text-xs">
        <div className="font-semibold text-gray-400 uppercase tracking-wider px-2.5 pb-2 mb-2 border-b border-[#3e4446]">Appearance</div>
        <button className="w-full text-left px-2.5 py-2 rounded bg-[#3daee9]/15 text-[#3daee9] font-medium border border-[#3daee9]/30">
          Wallpaper &amp; Theme
        </button>
        <div className="font-semibold text-gray-400 uppercase tracking-wider px-2.5 pb-2 mt-4 mb-2 border-b border-[#3e4446]">System</div>
        <button className="w-full text-left px-2.5 py-2 rounded hover:bg-[#31363b] text-gray-300 transition-colors">
          System Information
        </button>
      </div>

      {/* Settings Details Area */}
      <div className="flex-1 overflow-auto p-6 space-y-8">
        
        {/* Wallpapers Selection */}
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
                  {/* Overlay name */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-xs px-2.5 py-1.5 text-xs font-semibold text-white flex justify-between items-center">
                    <span>{wp.name}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#3daee9] ring-4 ring-[#3daee9]/30" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Theme Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white border-l-3 border-[#3daee9] pl-3">System Theme</h3>
          <div className="bg-[#212426] p-4 rounded border border-[#3e4446] flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-white">Breeze Dark Mode</div>
              <div className="text-[11px] text-[#a5a6a7]">Switch between darkness and light themes.</div>
            </div>
            <button 
              onClick={onToggleTheme}
              className="px-4 py-1.5 bg-[#3daee9] hover:bg-[#299cd1] text-white rounded font-medium text-xs transition-colors cursor-pointer"
            >
              {systemTheme === 'dark' ? 'Switch to Breeze Light' : 'Switch to Breeze Dark'}
            </button>
          </div>
        </div>

        {/* Neofetch System Information */}
        <div className="space-y-4">
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
              <div><span className="text-[#3daee9] font-semibold">Kernel</span>: 6.9.3-arch1-1</div>
              <div><span className="text-[#3daee9] font-semibold">Uptime</span>: 1 hour, 15 mins</div>
              <div><span className="text-[#3daee9] font-semibold">Shell</span>: bash 5.2.26</div>
              <div><span className="text-[#3daee9] font-semibold">DE</span>: KDE Plasma 6.0.5 (Wayland)</div>
              <div><span className="text-[#3daee9] font-semibold">WM</span>: KWin</div>
              <div><span className="text-[#3daee9] font-semibold">CPU</span>: Intel Core i9-14900K (24) @ 5.80GHz</div>
              <div><span className="text-[#3daee9] font-semibold">Memory</span>: 3.48 GiB / 31.25 GiB (11%)</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
