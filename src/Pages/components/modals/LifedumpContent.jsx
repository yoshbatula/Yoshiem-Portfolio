const photos = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  rotate: ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0', '-rotate-1', 'rotate-1', 'rotate-0'][i % 8],
  tape: [true, false, false, true, false, true, false, false][i % 8],
}))

const gradients = [
  'from-cyan-500 to-blue-500', 'from-purple-500 to-pink-500',
  'from-yellow-500 to-red-500', 'from-green-500 to-teal-500',
  'from-indigo-500 to-purple-500', 'from-pink-500 to-rose-500',
  'from-orange-500 to-yellow-500', 'from-teal-500 to-cyan-500',
  'from-blue-500 to-indigo-500', 'from-red-500 to-orange-500',
  'from-lime-500 to-green-500', 'from-violet-500 to-fuchsia-500',
  'from-sky-500 to-indigo-500', 'from-amber-500 to-orange-500',
  'from-emerald-500 to-cyan-500', 'from-fuchsia-500 to-pink-500',
  'from-rose-500 to-amber-500', 'from-violet-500 to-cyan-500',
  'from-orange-500 to-pink-500', 'from-teal-500 to-lime-500',
  'from-indigo-500 to-amber-500', 'from-red-500 to-yellow-500',
  'from-purple-500 to-teal-500', 'from-blue-500 to-rose-500',
]

export default function LifedumpContent() {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#3e4446] scrollbar-track-transparent bg-[#1a1c1e]">
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }} />

      {/* Notebook lined background */}
      <div className="relative" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(61,174,233,0.04) 31px, rgba(61,174,233,0.04) 32px)',
      }}>
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#1a1c1e]/95 backdrop-blur-sm border-b border-[#3e4446] px-5 md:px-8 py-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#3daee9]" />
          <div>
            <h2 className="text-xs md:text-sm font-bold text-white tracking-wide font-mono">lifedump</h2>
            <p className="text-[9px] text-[#7b8f9a] font-mono">{photos.length} photos</p>
          </div>
        </div>

        {/* Polaroid grid */}
        <div className="p-3 md:p-5 lg:p-8">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 md:gap-3 lg:gap-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className={`${photo.rotate} aspect-[3/4] bg-[#f5f0e8] rounded-[2px] p-1.5 pb-5 md:p-2 md:pb-6 shadow-sm hover:shadow-md hover:z-10 transition-all duration-200 hover:scale-[1.04] cursor-pointer relative flex flex-col`}
              >
                {/* Washi tape */}
                {photo.tape && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 md:w-8 md:h-2.5 bg-[#e8d5b4]/50 rounded-sm" />
                )}

                {/* Photo area */}
                <div className="flex-1 bg-[#2a2f32] rounded-[1px] overflow-hidden min-h-0">
                  <div className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]} opacity-70`} />
                </div>

                {/* Label */}
                <p className="text-center text-[6px] md:text-[7px] text-[#8a7e6e] font-mono tracking-wide select-none pt-1 md:pt-1.5">
                  lifedump_{String(photo.id).padStart(3, '0')}.jpg
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
