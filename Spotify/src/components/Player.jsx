"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/player.css"

// SVG Icons as React components
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
)

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
)

const PreviousIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </svg>
)

const NextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
)

const ShuffleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
  </svg>
)

const RepeatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
  </svg>
)

const RepeatOneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">1</text>
  </svg>
)

const VolumeHighIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
)

const VolumeMediumIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
  </svg>
)

const VolumeLowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3z"/>
  </svg>
)

const VolumeMuteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>
)

function Player({
  currentSong,
  playlist,
  currentIndex,
  onNext,
  onPrevious,
  setCurrentIndex,
  setCurrentSong,
  repeatMode,
  setRepeatMode,
}) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [previousVolume, setPreviousVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  // Play new song automatically when currentSong changes
  useEffect(() => {
    if (audioRef.current && currentSong?.url) {
      audioRef.current.load()
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }
  }, [currentSong])

  // Update progress as song plays
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => setProgress(audio.currentTime)
    const setAudioDuration = () => setDuration(audio.duration || 0)

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", setAudioDuration)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", setAudioDuration)
    }
  }, [currentSong])

  // Handle song end with repeat modes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      if (repeatMode === "one") {
        // Repeat current song
        audio.currentTime = 0
        audio.play()
        return
      }

      if (repeatMode === "all" && playlist && playlist.length > 0) {
        // Repeat playlist - go to next song or loop back to first
        if (currentIndex < playlist.length - 1) {
          // Play next song
          if (onNext) {
            onNext()
          }
        } else {
          // We're at the last song, loop back to first song
          if (setCurrentIndex && setCurrentSong) {
            setCurrentIndex(0)
            setCurrentSong(playlist[0])
          }
        }
        return
      }

      // Normal mode - play next if available
      if (playlist && playlist.length > 0 && onNext && currentIndex < playlist.length - 1) {
        onNext()
      } else {
        // End of playlist in normal mode
        setIsPlaying(false)
      }
    }

    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [repeatMode, playlist, currentIndex, onNext, setCurrentIndex, setCurrentSong])

  // Play/Pause controls
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      handlePause()
    } else {
      handlePlay()
    }
  }

  // Previous song
  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious()
    }
  }

  // Next song
  const handleNext = () => {
    if (onNext) {
      onNext()
    }
  }

  // Seek in audio
  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value
      setProgress(e.target.value)
    }
  }

  // Repeat mode toggle
  const handleRepeat = () => {
    if (setRepeatMode) {
      setRepeatMode((prev) => {
        if (prev === "off") return "one"
        if (prev === "one") return "all"
        return "off"
      })
    }
  }

  // Volume control
  const handleVolumeChange = (e) => {
    const vol = Number.parseFloat(e.target.value)
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
    setIsMuted(vol === 0)
  }

  // Mute/Unmute
  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume)
      setIsMuted(false)
      if (audioRef.current) {
        audioRef.current.volume = previousVolume
      }
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setIsMuted(true)
      if (audioRef.current) {
        audioRef.current.volume = 0
      }
    }
  }

  // Sync play/pause state if user uses native controls
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)

    return () => {
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
    }
  }, [])

  // Update loop property when repeat mode changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = repeatMode === "one"
    }
  }, [repeatMode])

  // Format time helper
  const formatTime = (sec) => {
    if (isNaN(sec)) return "0:00"
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? "0" : ""}${s}`
  }

  // Check if previous/next buttons should be enabled
  const canGoPrevious = playlist && playlist.length > 0 && (currentIndex > 0 || repeatMode === "all")
  const canGoNext = playlist && playlist.length > 0 && (currentIndex < playlist.length - 1 || repeatMode === "all")

  // Get repeat icon based on mode
  const getRepeatIcon = () => {
    switch (repeatMode) {
      case "one":
        return <RepeatOneIcon />
      case "all":
        return <RepeatIcon />
      default:
        return <RepeatIcon />
    }
  }

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeMuteIcon />
    if (volume < 0.3) return <VolumeLowIcon />
    if (volume < 0.7) return <VolumeMediumIcon />
    return <VolumeHighIcon />
  }

  return (
    <div className="player-bar">
      {/* Left Section - Song Info */}
      <div className="player-section player-song-info">
        {currentSong ? (
          <div className="song-details">
            <div className="song-title">{currentSong.title}</div>
            <div className="song-artist">{currentSong.artist}</div>
            <div className="song-meta">
              {currentSong.albumId && (
                <Link to={`/album/${currentSong.albumId}`} className="album-link">
                  View Album
                </Link>
              )}
              {playlist && playlist.length > 0 && (
                <span className="playlist-position">
                  {currentIndex + 1} of {playlist.length}
                  {repeatMode === "all" && " (Repeat All)"}
                  {repeatMode === "one" && " (Repeat One)"}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="no-song">No song playing</div>
        )}
      </div>

      {/* Center Section - Main Controls */}
      <div className="player-section player-controls-main">
        <div className="control-buttons">
          <button
            className="control-btn previous"
            disabled={!currentSong || !canGoPrevious}
            onClick={handlePrevious}
            title="Previous song"
          >
            <PreviousIcon />
          </button>
          <button
            className="control-btn play-pause"
            disabled={!currentSong}
            onClick={togglePlayPause}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            className="control-btn next"
            disabled={!currentSong || !canGoNext}
            onClick={handleNext}
            title="Next song"
          >
            <NextIcon />
          </button>
          <button
            className={`control-btn repeat ${repeatMode !== "off" ? "active" : ""}`}
            onClick={handleRepeat}
            title={`Repeat: ${repeatMode}`}
          >
            {getRepeatIcon()}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <span className="time-display">{formatTime(progress)}</span>
          <input
            type="range"
            className="progress-bar"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            disabled={!currentSong}
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Section - Volume Control */}
      <div className="player-section player-volume">
        <div className="volume-control">
          <button
            className="control-btn volume-btn"
            onClick={toggleMute}
            onMouseEnter={() => setShowVolumeSlider(true)}
            title="Volume"
          >
            {getVolumeIcon()}
          </button>
          <div
            className={`volume-slider-container ${showVolumeSlider ? "visible" : ""}`}
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <input
              type="range"
              className="volume-slider"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      {currentSong && currentSong.url && <audio ref={audioRef} src={currentSong.url} />}
    </div>
  )
}

export default Player