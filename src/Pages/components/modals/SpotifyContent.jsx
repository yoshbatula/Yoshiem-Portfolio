import { useState, useEffect } from 'react'
import UserAvatar from '../../../assets/UserAvatar.svg'
import SpotifyIcon from '../../../assets/SpotifyIcon .svg'
import { playlist, subscribe, togglePlay, nextTrack, prevTrack, playTrack, setVolume } from '../../../utils/spotifyPlayer'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const navItems = [
  { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { id: 'library', label: 'Your Library', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
]

function Sidebar({ activeNav, onNavChange }) {
  return (
    <div className="w-[180px] shrink-0 bg-[#000000] flex flex-col py-4 px-3 select-none">
      <div className="mb-6 px-2">
        <img src={SpotifyIcon} alt="Spotify" className="h-8" />
      </div>
      <nav className="space-y-1">
        {navItems.map(item => (
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
            <p className="text-[10px] text-[#b3b3b3] truncate">Playlist</p>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-[#b3b3b3] leading-relaxed">
          {playlist.length} songs · ~{Math.round(playlist.reduce((a, s) => a + s.duration, 0) / 60)} min
        </div>
      </div>
    </div>
  )
}

function NowPlayingBar({ state }) {
  if (!state) return null
  const { track, isPlaying, volume, progress } = state

  return (
    <div className="h-[72px] shrink-0 bg-[#181818] border-t border-[#282828] flex items-center px-4 gap-4 select-none">
      <div className="flex items-center gap-3 min-w-[180px] max-w-[280px]">
        <div className="w-12 h-12 rounded bg-gradient-to-br from-[#1DB954] to-[#169c46] shrink-0 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white font-medium truncate hover:underline cursor-pointer">{track.title}</p>
          <p className="text-[11px] text-[#b3b3b3] truncate hover:underline hover:text-white cursor-pointer">{track.artist}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center gap-1 max-w-[600px] mx-auto">
        <div className="flex items-center gap-4">
          <button className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 4v16l17-8z" />
            </svg>
          </button>
          <button onClick={prevTrack} className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            {isPlaying ? (
              <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button onClick={nextTrack} className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
          <button className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
          </button>
        </div>
        <div className="w-full flex items-center gap-2">
          <span className="text-[10px] text-[#b3b3b3] font-mono w-8 text-right">{formatTime(progress * track.duration)}</span>
          <div className="flex-1 h-1 bg-[#535353] rounded-full group cursor-pointer">
            <div className="h-full bg-white rounded-full group-hover:bg-[#1DB954] transition-colors relative" style={{ width: `${progress * 100}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-[10px] text-[#b3b3b3] font-mono w-8">{formatTime(track.duration)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 min-w-[120px] justify-end">
        <button className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15.536 8.464a5 5 0 010 7.072M11.93 12h.01" />
          </svg>
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors cursor-pointer">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
          </svg>
        </button>
        <svg className="w-4 h-4 text-[#b3b3b3]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.49 4.49 0 002.5-3.5z" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          style={{
            background: `linear-gradient(to right, #fff 0%, #fff ${volume * 100}%, #535353 ${volume * 100}%, #535353 100%)`,
          }}
          className="w-20 h-1 appearance-none rounded-full outline-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:opacity-0
            hover:[&::-webkit-slider-thumb]:opacity-100 transition-all"
        />
      </div>
    </div>
  )
}

function HomeView() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Good evening</h1>
      <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded overflow-hidden transition-colors cursor-pointer group w-[280px]">
        <div className="w-16 h-16 bg-gradient-to-br from-[#1DB954] to-[#0d4721] shrink-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-white/80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <span className="text-sm text-white font-semibold">Liked Songs</span>
      </div>
    </div>
  )
}

function SearchView() {
  const [query, setQuery] = useState('')
  const filtered = query
    ? playlist.filter(s => s.title.toLowerCase().includes(query.toLowerCase()) || s.artist.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">Search</h1>
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#b3b3b3]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] focus:bg-white text-black text-sm rounded-full py-3 pl-10 pr-4 outline-none transition-colors placeholder:text-[#b3b3b3] focus:placeholder:text-black"
        />
      </div>
      {query ? (
        <div className="space-y-1">
          {filtered.length === 0 && <p className="text-sm text-[#b3b3b3]">No results found for "{query}"</p>}
          {filtered.map((s, i) => (
            <button
              key={i}
              onClick={() => playTrack(playlist.indexOf(s))}
              className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded bg-gradient-to-br from-[#1DB954] to-[#169c46] shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-white truncate">{s.title}</p>
                <p className="text-[12px] text-[#b3b3b3] truncate">{s.artist}</p>
              </div>
              <span className="text-sm text-[#b3b3b3] ml-auto">{formatTime(s.duration)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-sm text-[#b3b3b3]">Start typing to search songs and artists...</div>
      )}
    </div>
  )
}

function LibraryView({ currentTrack, isPlaying, state }) {
  return (
    <div className="p-6">
      <div className="flex items-end gap-5 mb-8">
        <div className="w-52 h-52 rounded bg-gradient-to-br from-[#1DB954] to-[#0d4721] shrink-0 flex items-center justify-center shadow-2xl">
          <svg className="w-20 h-20 text-white/60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider">Playlist</p>
          <h1 className="text-4xl font-bold text-white leading-tight">Liked Songs</h1>
          <p className="text-sm text-[#b3b3b3]">Yoshiem · {playlist.length} songs</p>
        </div>
      </div>
      <div className="flex items-center px-4 py-2 text-[11px] text-[#b3b3b3] uppercase tracking-wider font-semibold border-b border-white/10 mb-1">
        <span className="w-8 text-center">#</span>
        <span className="flex-1">Title</span>
        <span className="w-16 text-right">Duration</span>
      </div>
      <div className="space-y-0.5">
        {playlist.map((s, i) => (
          <button
            key={i}
            onClick={() => playTrack(i)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded group transition-colors text-left cursor-pointer ${
              i === currentTrack ? 'bg-white/10' : 'hover:bg-white/5'
            }`}
          >
            <span className={`w-8 text-center text-sm ${i === currentTrack ? 'text-[#1DB954]' : 'text-[#b3b3b3] group-hover:hidden'}`}>
              {i === currentTrack && isPlaying ? (
                <span className="text-[#1DB954] text-lg leading-none">♫</span>
              ) : (
                i + 1
              )}
            </span>
            <span className="w-8 text-center text-sm text-[#b3b3b3] hidden group-hover:inline">
              {i === currentTrack ? '' : <svg className="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
            </span>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-[#1DB954] to-[#169c46] shrink-0 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className={`text-sm truncate ${i === currentTrack ? 'text-[#1DB954]' : 'text-white'}`}>{s.title}</p>
                <p className="text-[12px] text-[#b3b3b3] truncate">{s.artist}</p>
              </div>
            </div>
            <span className={`text-sm w-16 text-right ${i === currentTrack ? 'text-[#1DB954]' : 'text-[#b3b3b3]'}`}>{formatTime(s.duration)}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function SpotifyContent() {
  const [state, setState] = useState(null)
  const [activeNav, setActiveNav] = useState('home')

  useEffect(() => {
    const unsub = subscribe(s => setState({ ...s }))
    return unsub
  }, [])

  if (!state) return null

  const { currentTrack, isPlaying } = state

  const renderView = () => {
    switch (activeNav) {
      case 'home': return <HomeView />
      case 'search': return <SearchView />
      case 'library': return <LibraryView currentTrack={currentTrack} isPlaying={isPlaying} state={state} />
      default: return <HomeView />
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#121212] text-white select-none">
      <div className="flex flex-1 min-h-0">
        <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
      <NowPlayingBar state={state} />
    </div>
  )
}
