import Enchanted from '../assets/music/Enchanted.mp3'
import ThinkingOfYou from '../assets/music/ThinkingOfYou.mp3'
import WayILovedYou from '../assets/music/WayILovedYou.mp3'
import YouBelongWithMe from '../assets/music/YouBelongWithMe.mp3'
import AboutYou from '../assets/music/AboutYou.mp3'

export const playlist = [
  {
    id: 0,
    title: 'Enchanted',
    artist: 'Taylor Swift',
    src: Enchanted,
    duration: 336,
    lyrics: `This night is sparkling, don't you let it go\nI'm wonderstruck, blushing all the way home\nI'll spend forever wondering if you knew\nI was enchanted to meet you`,
  },
  {
    id: 1,
    title: 'Thinking Of You',
    artist: 'Katy Perry',
    src: ThinkingOfYou,
    duration: 252,
    lyrics: `You're the one that got away\nI still feel it every day\nAnd I'm thinking of you\nWhat we could have been`,
  },
  {
    id: 2,
    title: 'The Way I Loved You',
    artist: 'Taylor Swift',
    src: WayILovedYou,
    duration: 310,
    lyrics: `He is sensible and so incredible\nAnd all my single friends are jealous\nHe says everything I need to hear\nAnd it's like I never even loved you`,
  },
  {
    id: 3,
    title: 'You Belong With Me',
    artist: 'Taylor Swift',
    src: YouBelongWithMe,
    duration: 211,
    lyrics: `If you could see that I'm the one\nWho understands you\nBeen here all along\nSo why can't you see\nYou belong with me`,
  },
  {
    id: 4,
    title: 'About You',
    artist: 'The 1975',
    src: AboutYou,
    duration: 320,
    lyrics: `I know a place where we can go\nI know a place where we can hide\nAnd I'll be there\nAnd you'll be there\nAnd we'll be fine`,
  },
]

const audio = new Audio()
let currentTrack = 0
let isPlaying = false
let volume = 0.5
let queue = []
let listeners = []

export function getAudio() {
  return audio
}

function notify() {
  const track = playlist[currentTrack]
  const progress = track ? audio.currentTime / track.duration : 0
  listeners.forEach(fn => fn({
    currentTrack,
    isPlaying,
    volume,
    progress: Math.min(progress, 1),
    track,
    queue,
    currentTime: audio.currentTime,
  }))
}

export function loadTrack(index) {
  if (index < 0 || index >= playlist.length) return
  currentTrack = index
  const track = playlist[index]
  audio.src = track.src
  audio.currentTime = 0
  if (isPlaying) audio.play().catch(() => {})
  notify()
}

export function togglePlay() {
  if (isPlaying) {
    audio.pause()
  } else {
    if (!audio.src) loadTrack(currentTrack)
    audio.play().catch(() => {})
  }
  isPlaying = !isPlaying
  notify()
}

export function playTrack(index) {
  if (index < 0 || index >= playlist.length) return
  isPlaying = true
  loadTrack(index)
}

export function nextTrack() {
  if (queue.length > 0) {
    const next = queue.shift()
    isPlaying = true
    loadTrack(next)
    return
  }
  playTrack((currentTrack + 1) % playlist.length)
}

export function prevTrack() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0
    notify()
    return
  }
  playTrack((currentTrack - 1 + playlist.length) % playlist.length)
}

export function setVolume(v) {
  volume = Math.max(0, Math.min(1, v))
  audio.volume = volume
  notify()
}

export function seekTo(progress) {
  const track = playlist[currentTrack]
  if (!track) return
  audio.currentTime = progress * track.duration
  notify()
}

export function addToQueue(index) {
  if (index < 0 || index >= playlist.length || index === currentTrack) return
  if (!queue.includes(index)) queue.push(index)
  notify()
}

export function removeFromQueue(index) {
  queue = queue.filter(i => i !== index)
  notify()
}

export function clearQueue() {
  queue = []
  notify()
}

export function reorderQueue(from, to) {
  const item = queue.splice(from, 1)[0]
  queue.splice(to, 0, item)
  notify()
}

audio.addEventListener('timeupdate', notify)
audio.addEventListener('ended', nextTrack)
audio.addEventListener('loadedmetadata', () => {
  notify()
})

export function subscribe(fn) {
  listeners.push(fn)
  const track = playlist[currentTrack]
  fn({
    currentTrack,
    isPlaying,
    volume,
    progress: track ? audio.currentTime / track.duration : 0,
    track,
    queue,
    currentTime: audio.currentTime,
  })
  return () => { listeners = listeners.filter(l => l !== fn) }
}

export function getState() {
  const track = playlist[currentTrack]
  return {
    currentTrack,
    isPlaying,
    volume,
    progress: track ? audio.currentTime / track.duration : 0,
    track,
    queue,
    currentTime: audio.currentTime,
  }
}
