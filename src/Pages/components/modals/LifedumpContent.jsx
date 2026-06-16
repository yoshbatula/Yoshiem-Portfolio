import { useState, useCallback, useEffect } from 'react'

const imageModules = import.meta.glob('../../../assets/Lifedump*.jpeg', { eager: true, query: '?url', import: 'default' })
const sortedImages = Object.entries(imageModules)
  .sort(([a], [b]) => {
    const na = parseInt(a.match(/(\d+)/)?.[1] || '0')
    const nb = parseInt(b.match(/(\d+)/)?.[1] || '0')
    return na - nb
  })
  .map(([, url]) => url)

const photos = sortedImages.map((url, i) => ({
  id: i + 1,
  url,
  rotate: ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0', '-rotate-1', 'rotate-1', 'rotate-0'][i % 8],
  tape: [true, false, false, true, false, true, false, false][i % 8],
}))

export default function LifedumpContent() {
  const [selected, setSelected] = useState(null)

  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(() => {
    setSelected(p => p > 1 ? p - 1 : photos.length)
  }, [])
  const next = useCallback(() => {
    setSelected(p => p < photos.length ? p + 1 : 1)
  }, [])

  useEffect(() => {
    if (!selected) return
    const handler = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selected, close, prev, next])

  const current = selected ? photos.find(p => p.id === selected) : null

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
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelected(photo.id)}
                className={`${photo.rotate} aspect-[3/4] bg-[#f5f0e8] rounded-[2px] p-1.5 pb-5 md:p-2 md:pb-6 shadow-sm hover:shadow-md hover:z-10 transition-all duration-200 hover:scale-[1.04] cursor-pointer relative flex flex-col`}
              >
                {photo.tape && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2 md:w-8 md:h-2.5 bg-[#e8d5b4]/50 rounded-sm" />
                )}
                <div className="flex-1 bg-[#2a2f32] rounded-[1px] overflow-hidden min-h-0">
                  <img src={photo.url} alt={photo.alt || ''} className="w-full h-full object-cover" />
                </div>
                <p className="text-center text-[6px] md:text-[7px] text-[#8a7e6e] font-mono tracking-wide select-none pt-1 md:pt-1.5">
                  lifedump_{String(photo.id).padStart(3, '0')}.jpg
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          {/* Film grain on modal */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }} />

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all text-lg"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 text-[10px] text-white/50 font-mono bg-black/40 px-2 py-1 rounded">
            {current.id} / {photos.length}
          </div>

          {/* Notebook polaroid frame */}
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-[85vw] max-h-[85vh] bg-[#f5f0e8] rounded-sm p-3 pb-8 md:p-4 md:pb-10 shadow-2xl"
          >
            {/* Notebook lines inside frame */}
            <div className="absolute inset-0 rounded-sm pointer-events-none opacity-[0.04]" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(0,0,0,0.3) 23px, rgba(0,0,0,0.3) 24px)',
            }} />

            {/* Washi tape top */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-[#e8d5b4]/60 rounded-sm" />

            {/* Image */}
            <div className="max-w-full max-h-[70vh] overflow-hidden rounded-[1px] shadow-inner">
              <img
                src={current.url}
                alt={current.alt || ''}
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Label */}
            <p className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center text-[9px] md:text-[10px] text-[#8a7e6e] font-mono tracking-wide">
              lifedump_{String(current.id).padStart(3, '0')}.jpg
            </p>
          </div>

          {/* Prev/Next buttons */}
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all text-lg"
          >
            ‹
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all text-lg"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
