import { useState, useEffect } from 'react'
import UserAvatar from '../../../assets/UserAvatar.svg'
import { playlist, subscribe, togglePlay, nextTrack, prevTrack, playTrack, seekTo, setVolume, addToQueue, removeFromQueue } from '../../../utils/spotifyPlayer'

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

function PlayerBar({ state }) {
  if (!state || !state.track) return null
  const { track, isPlaying, progress, volume } = state

  return (
    <div className="h-[72px] shrink-0 bg-[#181818] border-t border-white/5 flex items-center px-4 gap-4">
      <div className="flex items-center gap-3 min-w-0 w-[30%]">
        <div className={`w-12 h-12 rounded bg-gradient-to-br ${colors[track.id % colors.length]} shrink-0 flex items-center justify-center`}>
          <span className="text-white/40 text-lg font-bold">{track.title[0]}</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white truncate">{track.title}</p>
          <p className="text-[11px] text-[#b3b3b3] truncate">{track.artist}</p>
        </div>
      </div>

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
          <div className="relative flex-1 h-1 bg-[#535353] rounded-full group cursor-pointer" onClick={e => seekTo(e.nativeEvent.offsetX / e.currentTarget.offsetWidth)}>
            <div className="h-full bg-white rounded-full group-hover:bg-[#1DB954] transition-colors relative" style={{ width: `${progress * 100}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-[10px] text-[#b3b3b3] font-mono w-8">{formatTime(track.duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 w-[30%]">
        <svg className="w-4 h-4 text-[#b3b3b3]" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5z" /></svg>
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
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#b3b3b3] mb-2">Lyrics</p>
          <div className="text-sm text-[#b3b3b3] leading-relaxed whitespace-pre-line italic border-l-2 border-[#1DB954] pl-4 max-h-48 overflow-y-auto">
            {track.lyrics}
          </div>
        </div>
        <QueueViewCompact state={state} />
      </div>
    </div>
  )
}

function QueueViewCompact({ state }) {
  const { queue } = state
  if (queue.length === 0) return null

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#b3b3b3] mb-2">Next Up ({queue.length})</p>
      <div className="space-y-1 max-h-36 overflow-y-auto">
        {queue.map((trackId, i) => {
          const s = playlist[trackId]
          return (
            <div key={i} className="flex items-center gap-3 px-2 py-1 rounded hover:bg-white/5 transition-colors group">
              <span className="text-[10px] text-[#535353] w-3">{i + 1}</span>
              <div className={`w-7 h-7 rounded bg-gradient-to-br ${colors[trackId % colors.length]} shrink-0 flex items-center justify-center`}>
                <span className="text-white/60 text-[10px] font-bold">{s.title[0]}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-white truncate">{s.title}</p>
                <p className="text-[10px] text-[#b3b3b3] truncate">{s.artist}</p>
              </div>
              <button onClick={() => removeFromQueue(trackId)} className="text-[#535353] hover:text-white text-[10px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Sidebar({ activeNav, onNavChange }) {
  const items = [
    { id: 'home', label: 'Home', icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
    { id: 'now-playing', label: 'Now Playing', icon: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' },
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

function HomeView({ onPlay }) {
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
            <button onClick={() => { playTrack(i); onPlay() }} className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer">
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

function LibraryView({ state, searchQuery, onPlay }) {
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
                <button onClick={() => { playTrack(originalIndex); onPlay() }} className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer">
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

  useEffect(() => {
    const unsub = subscribe(s => setState({ ...s }))
    return unsub
  }, [])

  if (!state) return null

  const handlePlay = () => setActiveNav('now-playing')

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white select-none">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="flex flex-1 min-h-0">
        <Sidebar activeNav={activeNav} onNavChange={v => { setActiveNav(v); setSearchQuery('') }} />
        <main className="flex-1 overflow-y-auto">
          {activeNav === 'home' && <HomeView onPlay={handlePlay} />}
          {activeNav === 'now-playing' && <NowPlaying state={state} />}
          {activeNav === 'library' && <LibraryView state={state} searchQuery={searchQuery} onPlay={handlePlay} />}
        </main>
      </div>
      <PlayerBar state={state} />
    </div>
  )
}
