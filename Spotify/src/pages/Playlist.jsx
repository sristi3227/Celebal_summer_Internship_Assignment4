"use client"

import { useState, useEffect } from "react"
import "../styles/playlist.css"
import SongCard from "../components/SongCard"
import { savePlaylistsToStorage, loadPlaylistsFromStorage } from "../utils/localStorage"

function Playlist({
  setCurrentSong,
  setPlaylist,
  setCurrentIndex,
  currentIndex,
  currentSong,
  playlist,
  repeatMode,
  onNext,
  onPrevious,
}) {
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState("")

  // Load playlists from localStorage on component mount
  useEffect(() => {
    const savedPlaylists = loadPlaylistsFromStorage()
    setPlaylists(savedPlaylists)

    // Also sync with window.playlistData for backward compatibility
    window.playlistData = savedPlaylists
  }, [])

  // Save playlists to localStorage whenever playlists change
  useEffect(() => {
    savePlaylistsToStorage(playlists)
    window.playlistData = playlists
  }, [playlists])

  // Listen for changes from other components (like SongCard)
  useEffect(() => {
    const checkForUpdates = () => {
      const currentPlaylists = loadPlaylistsFromStorage()
      // Only update if the data has actually changed
      if (JSON.stringify(currentPlaylists) !== JSON.stringify(playlists)) {
        setPlaylists(currentPlaylists)
      }
    }

    // Check for updates every 500ms
    const interval = setInterval(checkForUpdates, 500)

    return () => clearInterval(interval)
  }, [playlists])

  const createPlaylist = () => {
    if (newPlaylistName.trim() === "") return

    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName.trim(),
      songs: [],
      createdAt: new Date().toLocaleDateString(),
    }

    const updatedPlaylists = [...playlists, newPlaylist]
    setPlaylists(updatedPlaylists)
    setNewPlaylistName("")
    setShowCreateForm(false)
    setSelectedPlaylist(newPlaylist)
  }

  const deletePlaylist = (playlistId) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      const updatedPlaylists = playlists.filter((p) => p.id !== playlistId)
      setPlaylists(updatedPlaylists)

      if (selectedPlaylist && selectedPlaylist.id === playlistId) {
        setSelectedPlaylist(null)
        // Clear player if this playlist was being played
        setPlaylist([])
        setCurrentSong(null)
        setCurrentIndex(0)
      }
    }
  }

  const removeSongFromPlaylist = (playlistId, songIndex) => {
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: playlist.songs.filter((_, index) => index !== songIndex),
        }
      }
      return playlist
    })

    setPlaylists(updatedPlaylists)

    // Update selected playlist if it's the one being modified
    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      const updatedPlaylist = {
        ...selectedPlaylist,
        songs: selectedPlaylist.songs.filter((_, index) => index !== songIndex),
      }
      setSelectedPlaylist(updatedPlaylist)

      // Update player playlist if this playlist is currently playing
      setPlaylist(updatedPlaylist.songs)

      // If the removed song was currently playing, adjust the current index
      if (setCurrentIndex) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= songIndex && prevIndex > 0) {
            return prevIndex - 1
          }
          return prevIndex
        })
      }
    }
  }

  // Play entire playlist starting from a specific song
  const playPlaylist = (playlist, startIndex = 0) => {
    if (playlist.songs.length === 0) return

    setPlaylist(playlist.songs)
    setCurrentSong(playlist.songs[startIndex])
    setCurrentIndex(startIndex)
  }

  // Play a specific song from the playlist
  const playSongFromPlaylist = (song, playlist, songIndex) => {
    setPlaylist(playlist.songs)
    setCurrentSong(song)
    setCurrentIndex(songIndex)
  }

  return (
    <div className="playlist-page">
      <div className="playlist-header">
        <h1>My Playlists</h1>
        <button className="create-playlist-btn" onClick={() => setShowCreateForm(true)}>
          + Create Playlist
        </button>
      </div>

      {/* Create Playlist Form */}
      {showCreateForm && (
        <div className="create-playlist-form">
          <div className="form-content">
            <h3>Create New Playlist</h3>
            <input
              type="text"
              placeholder="Enter playlist name"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && createPlaylist()}
              autoFocus
            />
            <div className="form-actions">
              <button onClick={createPlaylist} disabled={!newPlaylistName.trim()}>
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false)
                  setNewPlaylistName("")
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="playlist-container">
        {/* Playlist List */}
        <div className="playlist-list">
          <h2>All Playlists ({playlists.length})</h2>
          {playlists.length === 0 ? (
            <p className="no-playlists">No playlists created yet. Create your first playlist!</p>
          ) : (
            playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={`playlist-item ${selectedPlaylist?.id === playlist.id ? "selected" : ""}`}
                onClick={() => setSelectedPlaylist(playlist)}
              >
                <div className="playlist-info">
                  <h4>{playlist.name}</h4>
                  <p>
                    {playlist.songs.length} songs • Created {playlist.createdAt}
                  </p>
                </div>
                <div className="playlist-actions">
                  {playlist.songs.length > 0 && (
                    <button
                      className="play-playlist-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        playPlaylist(playlist, 0)
                      }}
                      title="Play playlist"
                    >
                      ▶️
                    </button>
                  )}
                  <button
                    className="delete-playlist-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      deletePlaylist(playlist.id)
                    }}
                    title="Delete playlist"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Playlist Details */}
        <div className="playlist-details">
          {selectedPlaylist ? (
            <>
              <div className="playlist-header-detail">
                <h2>{selectedPlaylist.name}</h2>
                <p>
                  {selectedPlaylist.songs.length} songs • Created {selectedPlaylist.createdAt}
                </p>
                {selectedPlaylist.songs.length > 0 && (
                  <button
                    className="play-all-btn"
                    onClick={() => playPlaylist(selectedPlaylist, 0)}
                    style={{
                      marginTop: 10,
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    ▶️ Play All
                  </button>
                )}
              </div>

              {selectedPlaylist.songs.length === 0 ? (
                <p className="no-songs">This playlist is empty. Add some songs!</p>
              ) : (
                <div className="playlist-songs">
                  {selectedPlaylist.songs.map((song, index) => (
                    <div key={index} className="playlist-song-item">
                      <div className="song-index" style={{ marginRight: 10, color: "#666" }}>
                        {index + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <SongCard
                          song={song}
                          setCurrentSong={(selectedSong) => playSongFromPlaylist(selectedSong, selectedPlaylist, index)}
                          showRemove={true}
                          onRemove={() => removeSongFromPlaylist(selectedPlaylist.id, index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-selection">
              <h3>Select a playlist to view its songs</h3>
              <p>Choose a playlist from the list on the left to see its contents.</p>
            </div>
          )}
        </div>
      </div>
      <br/><br/><br/>
    </div>
  )
}

export default Playlist
