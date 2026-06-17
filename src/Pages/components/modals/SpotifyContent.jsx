import { useState, useEffect, useRef } from 'react'
import UserAvatar from '../../../assets/UserAvatar.svg'
import { playlist, subscribe, togglePlay, nextTrack, prevTrack, playTrackWithQueue, seekTo, setVolume, addToQueue, removeFromQueue } from '../../../utils/spotifyPlayer'

const colors = ['from-[#1DB954] to-[#169c46]', 'from-[#E13300] to-[#ff6b35]', 'from-[#9b59b6] to-[#6c3483]', 'from-[#2980b9] to-[#154360]', 'from-[#f39c12] to-[#b7950b]']

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function Header({ searchQuery, onSearchChange }) {
  return (
    <div className="flex items-center justify-center px-5 py-2.5 bg-[#121212] border-b border-white/5 shrink-0">
      <div className="relative w-full max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b3b3b3]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 rounded-full bg-[#242424] text-sm text-white placeholder-[#b3b3b3] outline-none focus:ring-2 focus:ring-white/20 transition-all"
        />
      </div>
    </div>
  )
}

function QueuePanel({ state, onClose }) {
  if (!state || !state.track) return null
  const { track, currentTrack, queue } = state

  const remaining = []
  for (let i = currentTrack + 1; i < playlist.length; i++) {
    if (!queue.includes(i)) remaining.push(i)
  }
  const hasQueue = queue.length > 0 || remaining.length > 0

  return (
    <aside className="w-80 shrink-0 bg-[#181818] border-l border-white/5 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#b3b3b3]">Queue</p>
          <p className="text-[11px] text-[#535353] mt-0.5">{queue.length + remaining.length} songs</p>
        </div>
        <button onClick={onClose} className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3e4446] scrollbar-track-transparent p-3 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b3b3b3] px-1 pb-1">Now Playing</p>
        <div className="flex items-center gap-3 px-3 py-2 rounded bg-white/5">
          <div className={`w-9 h-9 rounded bg-gradient-to-br ${colors[currentTrack % colors.length]} shrink-0 flex items-center justify-center`}>
            <span className="text-white/60 text-xs font-bold">{track.title[0]}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] text-white truncate">{track.title}</p>
            <p className="text-[10px] text-[#b3b3b3] truncate">{track.artist}</p>
          </div>
          <span className="text-[10px] text-[#1DB954] font-medium">Playing</span>
        </div>
        {queue.length > 0 && (
          <>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b3b3b3] px-1 pt-4 pb-1">Next Up</p>
            {queue.map((trackId, i) => {
              const s = playlist[trackId]
              return (
                <div key={`q-${i}`} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 transition-colors group">
                  <span className="text-[11px] text-[#535353] w-4 shrink-0">{i + 1}</span>
                  <button onClick={() => playTrackWithQueue(trackId)} className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer">
                    <div className={`w-9 h-9 rounded bg-gradient-to-br ${colors[trackId % colors.length]} shrink-0 flex items-center justify-center`}>
                      <span className="text-white/50 text-xs font-bold">{s.title[0]}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] text-white truncate">{s.title}</p>
                      <p className="text-[10px] text-[#b3b3b3] truncate">{s.artist}</p>
                    </div>
                  </button>
                  <button onClick={() => removeFromQueue(trackId)} className="text-[#535353] hover:text-white text-[10px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity shrink-0">✕</button>
                </div>
              )
            })}
          </>
        )}
        {remaining.length > 0 && (
          <>
            {queue.length > 0 && <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b3b3b3] px-1 pt-4 pb-1">Next in playlist</p>}
            {queue.length === 0 && <p className="text-[10px] font-semibold uppercase tracking-wider text-[#b3b3b3] px-1 pt-1 pb-1">Next in playlist</p>}
            {remaining.map((trackId, i) => {
              const s = playlist[trackId]
              return (
                <div key={`r-${i}`} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/5 transition-colors group">
                  <span className="text-[11px] text-[#535353] w-4 shrink-0">{i + 1}</span>
                  <button onClick={() => playTrackWithQueue(trackId)} className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer">
                    <div className={`w-9 h-9 rounded bg-gradient-to-br ${colors[trackId % colors.length]} shrink-0 flex items-center justify-center`}>
                      <span className="text-white/50 text-xs font-bold">{s.title[0]}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] text-white truncate">{s.title}</p>
                      <p className="text-[10px] text-[#b3b3b3] truncate">{s.artist}</p>
                    </div>
                  </button>
                  <button onClick={() => addToQueue(trackId)} className="text-[#535353] hover:text-white text-[10px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity shrink-0" title="Add to queue">+</button>
                </div>
              )
            })}
          </>
        )}
        {!hasQueue && (
          <p className="text-xs text-[#535353] px-2 py-4 text-center">End of playlist</p>
        )}
      </div>
    </aside>
  )
}

function AnimatedLyrics({ state, compact }) {
  if (!state || !state.track) return null
  const { track, currentTime } = state
  const lines = track.lyrics
  const totalChars = lines.reduce((s, l) => s + l.text.length, 0)
  let charAcc = 0
  let currentLine = lines.length - 1
  for (let i = 0; i < lines.length; i++) {
    const endTime = ((charAcc + lines[i].text.length) / totalChars) * track.duration
    if (currentTime < endTime) { currentLine = i; break }
    charAcc += lines[i].text.length
  }
  const containerRef = useRef(null)
  const lineRefs = useRef([])
  lineRefs.current = lineRefs.current.slice(0, lines.length)
  const rafRef = useRef(null)

  useEffect(() => {
    const el = lineRefs.current[currentLine]
    if (!el || !containerRef.current) return
    const container = containerRef.current
    const targetScroll = el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2

    cancelAnimationFrame(rafRef.current)
    const step = () => {
      const current = container.scrollTop
      const diff = targetScroll - current
      if (Math.abs(diff) < 0.5) {
        container.scrollTop = targetScroll
        return
      }
      container.scrollTop += diff * 0.12
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [currentLine])

  return (
    <div ref={containerRef} className={`relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#3e4446] scrollbar-track-transparent px-8 ${compact ? 'py-2' : 'py-12'}`}>
      <div className="sticky top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#121212] to-transparent z-10 pointer-events-none" />
      <div className={`w-full max-w-lg mx-auto ${compact ? 'space-y-0.5' : 'space-y-1'}`}>
        {lines.map((line, i) => {
          const diff = i - currentLine
          const isPast = diff < 0
          const isCurrent = diff === 0
          const isFuture = diff > 0
          return (
            <p
              key={i}
              ref={el => { lineRefs.current[i] = el }}
              className={`transition-all duration-500 ease-out leading-relaxed py-0.5 ${
                isCurrent
                  ? 'text-white translate-y-0 ' + (compact ? 'text-base font-semibold' : 'text-xl font-bold') + ' scale-100 opacity-100'
                  : isPast
                    ? 'text-[#454545] ' + (compact ? 'text-sm' : 'text-[15px]') + ' scale-90 opacity-25'
                    : 'text-[#6a6a6a] ' + (compact ? 'text-sm' : 'text-[15px]') + ' scale-95 opacity-40'
              }`}
            >
              {line.text}
            </p>
          )
        })}
      </div>
      <div className="sticky bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none" />
    </div>
  )
}

function LyricsPage({ state }) {
  if (!state || !state.track) return null
  const { track } = state
  return (
    <div className="flex flex-col h-full">
      <div className="text-center pt-8 pb-4 shrink-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#b3b3b3]">{track.title}</p>
        <p className="text-sm text-[#535353]">{track.artist}</p>
      </div>
      <AnimatedLyrics state={state} />
    </div>
  )
}

function PlayerBar({ state, showQueue, onToggleQueue, showLyrics, onToggleLyrics, onShowNowPlaying }) {
  if (!state || !state.track) return null
  const { track, isPlaying, progress, volume, currentTime } = state
  const barRef = useRef(null)
  const dragging = useRef(false)

  function seekFromEvent(e) {
    const r = barRef.current.getBoundingClientRect()
    const p = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
    seekTo(p)
  }

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    function onDown(e) {
      dragging.current = true
      seekFromEvent(e)
    }
    function onMove(e) {
      if (!dragging.current) return
      seekFromEvent(e)
    }
    function onUp() {
      dragging.current = false
    }
    el.addEventListener('mousedown', onDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    return () => {
      el.removeEventListener('mousedown', onDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  return (
    <div className="h-[72px] shrink-0 bg-[#181818] border-t border-white/5 flex items-center px-4 gap-4 relative">
      <button onClick={onShowNowPlaying} className="flex items-center gap-3 min-w-0 w-[30%] text-left cursor-pointer group">
        <div className={`w-12 h-12 rounded bg-gradient-to-br ${colors[track.id % colors.length]} shrink-0 flex items-center justify-center`}>
          <span className="text-white/40 text-lg font-bold">{track.title[0]}</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white truncate group-hover:underline">{track.title}</p>
          <p className="text-[11px] text-[#b3b3b3] truncate">{track.artist}</p>
        </div>
      </button>

      <div className="flex flex-col items-center gap-1 flex-1 max-w-[40%]">
        <div className="flex items-center gap-4">
          <button onClick={prevTrack} className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
          </button>
          <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            {isPlaying ? (
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            ) : (
              <svg className="w-4 h-4 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
          <button onClick={nextTrack} className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-[10px] text-[#b3b3b3] font-mono w-8 text-right">{formatTime(state.currentTime)}</span>
          <div ref={barRef} className="relative flex-1 h-1 bg-[#535353] rounded-full group cursor-pointer">
            <div className="h-full bg-white rounded-full group-hover:bg-[#1DB954] transition-colors relative" style={{ width: `${progress * 100}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>
          <span className="text-[10px] text-[#b3b3b3] font-mono w-8">{formatTime(track.duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 w-[30%]">
        <button onClick={onToggleLyrics} className={`p-1.5 rounded transition-colors cursor-pointer ${showLyrics ? 'text-[#1DB954]' : 'text-[#b3b3b3] hover:text-white'}`} title="Lyrics">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>
        <button onClick={onToggleQueue} className={`p-1.5 rounded transition-colors cursor-pointer ${showQueue ? 'text-[#1DB954]' : 'text-[#b3b3b3] hover:text-white'}`} title="Queue">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>
        <svg className="w-4 h-4 text-[#b3b3b3] ml-2" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5z" /></svg>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={e => setVolume(Number(e.target.value))}
          style={{ background: `linear-gradient(to right, #fff 0%, #fff ${volume * 100}%, #535353 ${volume * 100}%, #535353 100%)` }}
          className="w-20 h-1 appearance-none rounded-full outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0 hover:[&::-webkit-slider-thumb]:opacity-100 transition-all"
        />
      </div>
    </div>
  )
}

function NowPlaying({ state }) {
  if (!state || !state.track) return null
  const { track } = state

  return (
    <div className="p-8 flex gap-8 items-start">
      <div className={`w-60 h-60 rounded bg-gradient-to-br ${colors[track.id % colors.length]} shrink-0 flex items-center justify-center shadow-2xl`}>
        <span className="text-7xl text-white/30 font-bold">{track.title[0]}</span>
      </div>
      <div className="flex-1 min-w-0 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#b3b3b3] mb-1">Now Playing</p>
          <h1 className="text-3xl font-bold text-white leading-tight">{track.title}</h1>
          <p className="text-sm text-[#b3b3b3]">{track.artist}</p>
        </div>
        <div className="max-h-72">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#b3b3b3] mb-2">Lyrics</p>
          <AnimatedLyrics state={state} compact />
        </div>
      </div>
    </div>
  )
}

function Sidebar({ activeNav, onNavChange }) {
  const items = [
    { id: 'home', label: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
    { id: 'library', label: 'Your Library', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  ]

  return (
    <div className="w-[180px] shrink-0 bg-[#000000] flex flex-col py-4 px-3 select-none">
      <nav className="space-y-1">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-semibold transition-colors cursor-pointer text-left ${
              activeNav === item.id ? 'text-white bg-white/10' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill={activeNav === item.id ? '#fff' : 'currentColor'}>
              <path d={item.icon} />
            </svg>
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="flex-1" />
      <div className="px-3 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <img src={UserAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          <div className="min-w-0">
            <p className="text-xs text-white font-medium truncate">Yoshiem</p>
            <p className="text-[10px] text-[#b3b3b3] truncate">{playlist.length} songs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomeView() {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#1DB954] to-[#169c46] flex items-center justify-center">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#b3b3b3]">Playlist</p>
          <h1 className="text-2xl font-bold text-white">Liked Songs</h1>
          <p className="text-[11px] text-[#b3b3b3] mt-0.5">{playlist.length} songs</p>
        </div>
      </div>
      <div className="space-y-0.5">
        {playlist.map((s, i) => (
          <div key={i} className="group flex items-center gap-3 px-4 py-2 rounded hover:bg-white/5 transition-colors">
            <button onClick={() => playTrackWithQueue(i)} className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer">
              <div className={`w-10 h-10 rounded bg-gradient-to-br ${colors[i % colors.length]} shrink-0 flex items-center justify-center relative`}>
                <span className="text-white/60 text-sm font-bold group-hover:hidden">{s.title[0]}</span>
                <svg className="w-4 h-4 text-white hidden group-hover:block" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white truncate">{s.title}</p>
                <p className="text-[12px] text-[#b3b3b3] truncate">{s.artist}</p>
              </div>
            </button>
            <span className="text-[12px] text-[#b3b3b3] w-12 text-right">{formatTime(s.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LibraryView({ state, searchQuery }) {
  if (!state) return null
  const { currentTrack, isPlaying } = state

  const filtered = searchQuery
    ? playlist.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.artist.toLowerCase().includes(searchQuery.toLowerCase()))
    : playlist

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-white mb-4">Your Library</h1>
      {filtered.length === 0 ? (
        <p className="text-sm text-[#535353]">No results for &ldquo;{searchQuery}&rdquo;</p>
      ) : (
        <div className="space-y-0.5">
          {filtered.map(s => {
            const originalIndex = playlist.indexOf(s)
            return (
              <div key={originalIndex} className="group flex items-center gap-3 px-4 py-2 rounded hover:bg-white/5 transition-colors">
                <button onClick={() => playTrackWithQueue(originalIndex)} className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer">
                  <div className={`w-10 h-10 rounded bg-gradient-to-br ${colors[originalIndex % colors.length]} shrink-0 flex items-center justify-center`}>
                    {originalIndex === currentTrack && isPlaying ? (
                      <span className="text-white text-sm">♫</span>
                    ) : (
                      <span className="text-white/60 text-sm font-bold">{s.title[0]}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm truncate ${originalIndex === currentTrack ? 'text-[#1DB954]' : 'text-white'}`}>{s.title}</p>
                    <p className="text-[12px] text-[#b3b3b3] truncate">{s.artist}</p>
                  </div>
                </button>
                <span className="text-[12px] text-[#b3b3b3] w-12 text-right">{formatTime(s.duration)}</span>
                <button
                  onClick={() => addToQueue(originalIndex)}
                  className="text-[#535353] hover:text-white text-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity w-8 text-center"
                  title="Add to queue"
                >⋮</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function SpotifyContent() {
  const [state, setState] = useState(null)
  const [activeNav, setActiveNav] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [showQueue, setShowQueue] = useState(false)
  const [showLyrics, setShowLyrics] = useState(false)

  useEffect(() => {
    const unsub = subscribe(s => setState({ ...s }))
    return unsub
  }, [])

  const prevTrack = useRef(-1)
  const currentTrack = state?.currentTrack
  const isPlaying = state?.isPlaying

  useEffect(() => {
    if (currentTrack == null) return
    const trackChanged = currentTrack !== prevTrack.current
    prevTrack.current = currentTrack
    if (trackChanged && isPlaying) {
      setShowQueue(true)
    }
  }, [currentTrack, isPlaying])

  if (!state) return null

  const toggleQueue = () => setShowQueue(v => !v)
  const toggleLyrics = () => setShowLyrics(v => !v)

  const closeQueue = () => setShowQueue(false)

  const rightPanel = showQueue
    ? <QueuePanel state={state} onClose={closeQueue} />
    : null

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white select-none">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="flex flex-1 min-h-0">
        <Sidebar activeNav={showLyrics ? '' : activeNav} onNavChange={v => { setActiveNav(v); setSearchQuery(''); setShowLyrics(false) }} />
        <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3e4446] scrollbar-track-transparent">
          {showLyrics && <LyricsPage state={state} />}
          {!showLyrics && activeNav === 'home' && <HomeView />}
          {!showLyrics && activeNav === 'now-playing' && <NowPlaying state={state} />}
          {!showLyrics && activeNav === 'library' && <LibraryView state={state} searchQuery={searchQuery} />}
        </main>
        {rightPanel}
      </div>
      <PlayerBar
        state={state}
        showQueue={showQueue}
        onToggleQueue={toggleQueue}
        showLyrics={showLyrics}
        onToggleLyrics={toggleLyrics}
        onShowNowPlaying={() => setActiveNav('now-playing')}
      />
    </div>
  )
}
