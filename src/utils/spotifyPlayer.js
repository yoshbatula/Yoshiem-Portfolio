export const playlist = [
  { title: 'Blinding Lights', artist: 'The Weeknd', freq: 440, duration: 216 },
  { title: 'Shape of You', artist: 'Ed Sheeran', freq: 523, duration: 233 },
  { title: 'Bohemian Rhapsody', artist: 'Queen', freq: 392, duration: 354 },
  { title: 'Stairway to Heaven', artist: 'Led Zeppelin', freq: 587, duration: 482 },
  { title: 'Hotel California', artist: 'Eagles', freq: 659, duration: 391 },
]

let ctx = null
let osc = null
let gain = null
let currentTrack = 0
let isPlaying = false
let volume = 0.5
let startTime = 0
let elapsed = 0
let timerId = null
let listeners = []

function notify() {
  listeners.forEach(fn => fn({
    currentTrack,
    isPlaying,
    volume,
    progress: getProgress(),
    track: playlist[currentTrack],
  }))
}

function getProgress() {
  const track = playlist[currentTrack]
  if (!track) return 0
  return Math.min(elapsed / track.duration, 1)
}

function stopOsc() {
  if (osc) { try { osc.stop() } catch {}; osc = null }
  if (timerId) { clearInterval(timerId); timerId = null }
}

function startOsc() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()

  stopOsc()

  const track = playlist[currentTrack]
  osc = ctx.createOscillator()
  gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(track.freq, ctx.currentTime)
  gain.gain.setValueAtTime(volume, ctx.currentTime)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start()

  startTime = ctx.currentTime
  timerId = setInterval(() => {
    elapsed = ctx.currentTime - startTime
    if (elapsed >= track.duration) {
      nextTrack()
      return
    }
    notify()
  }, 200)
  isPlaying = true
  notify()
}

export function togglePlay() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()

  if (isPlaying) {
    stopOsc()
    elapsed = ctx.currentTime - startTime
    isPlaying = false
  } else {
    if (ctx.state === 'suspended') ctx.resume()
    startOsc()
  }
  notify()
}

export function playTrack(index) {
  if (index < 0 || index >= playlist.length) return
  currentTrack = index
  elapsed = 0
  if (isPlaying) startOsc()
  notify()
}

export function nextTrack() {
  playTrack((currentTrack + 1) % playlist.length)
}

export function prevTrack() {
  playTrack((currentTrack - 1 + playlist.length) % playlist.length)
}

export function setVolume(v) {
  volume = Math.max(0, Math.min(1, v))
  if (gain) gain.gain.setValueAtTime(volume, ctx.currentTime)
  notify()
}

export function seekTo(progress) {
  const track = playlist[currentTrack]
  if (!track) return
  elapsed = progress * track.duration
  if (isPlaying) startOsc()
  notify()
}

export function subscribe(fn) {
  listeners.push(fn)
  fn({
    currentTrack,
    isPlaying,
    volume,
    progress: getProgress(),
    track: playlist[currentTrack],
  })
  return () => { listeners = listeners.filter(l => l !== fn) }
}

export function getState() {
  return {
    currentTrack,
    isPlaying,
    volume,
    progress: getProgress(),
    track: playlist[currentTrack],
  }
}
