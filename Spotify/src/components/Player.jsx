"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "../styles/player.css"

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
  const [isShuffled, setIsShuffled] = useState(false)

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

  // Shuffle toggle
  const toggleShuffle = () => {
    setIsShuffled(!isShuffled)
    // You can implement shuffle logic here or pass it to parent component
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
        return "🔂"
      case "all":
        return "🔁"
      default:
        return "🔁"
    }
  }

  // Get volume icon based on level
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return "🔇"
    if (volume < 0.3) return "🔈"
    if (volume < 0.7) return "🔉"
    return "🔊"
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
            className={`control-btn shuffle ${isShuffled ? "active" : ""}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            🔀
          </button>
          <button
            className="control-btn previous"
            disabled={!currentSong || !canGoPrevious}
            onClick={handlePrevious}
            title="Previous song"
          >
            ⏮
          </button>
          <button
            className="control-btn play-pause"
            disabled={!currentSong}
            onClick={togglePlayPause}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶️"}
          </button>
          <button
            className="control-btn next"
            disabled={!currentSong || !canGoNext}
            onClick={handleNext}
            title="Next song"
          >
            ⏭
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