import { useState } from 'react';
import '../styles/songcard.css';
import { savePlaylistsToStorage, loadPlaylistsFromStorage } from '../utils/localStorage';

function SongCard({ song, setCurrentSong, showRemove = false, onRemove }) {
  const [showControls, setShowControls] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handlePlay = (e) => {
    e.stopPropagation();
    if (setCurrentSong) {
      setCurrentSong(song);
    }
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    setShowPlaylistModal(true);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  const addToExistingPlaylist = (playlistId) => {
    // Load current playlists from localStorage
    const playlists = loadPlaylistsFromStorage();
    
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === playlistId) {
        // Check if song already exists in playlist
        const songExists = playlist.songs.some(s => s.title === song.title && s.artist === song.artist);
        if (!songExists) {
          return {
            ...playlist,
            songs: [...playlist.songs, song]
          };
        }
      }
      return playlist;
    });
    
    // Save to localStorage
    savePlaylistsToStorage(updatedPlaylists);
    
    // Also update window.playlistData for backward compatibility
    window.playlistData = updatedPlaylists;
    
    setShowPlaylistModal(false);
  };

  const createNewPlaylist = () => {
    if (newPlaylistName.trim() === '') return;
    
    // Load current playlists from localStorage
    const playlists = loadPlaylistsFromStorage();
    
    const newPlaylist = {
      id: Date.now(),
      name: newPlaylistName.trim(),
      songs: [song],
      createdAt: new Date().toLocaleDateString()
    };
    
    const updatedPlaylists = [...playlists, newPlaylist];
    
    // Save to localStorage
    savePlaylistsToStorage(updatedPlaylists);
    
    // Also update window.playlistData for backward compatibility
    window.playlistData = updatedPlaylists;
    
    setNewPlaylistName('');
    setShowCreateForm(false);
    setShowPlaylistModal(false);
  };

  // Load playlists from localStorage instead of window.playlistData
  const existingPlaylists = loadPlaylistsFromStorage();

  return (
    <>
      <div
        className="song-card"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        style={{ position: 'relative' }}
      >
        <img src={song.cover} alt={song.title} />
        
        {showControls && (
          <div className="song-controls">
            <button
              className="play-btn"
              onClick={handlePlay}
              title="Play song"
            >
              <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </button>
            
            {!showRemove && (
              <button
                className="playlist-btn"
                onClick={handleAddToPlaylist}
                title="Add to playlist"
              >
                <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </button>
            )}
            
            {showRemove && (
              <button
                className="remove-btn"
                onClick={handleRemove}
                title="Remove from playlist"
              >
                <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            )}
          </div>
        )}
        
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>

      {/* Playlist Modal */}
      {showPlaylistModal && (
        <div className="playlist-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add to Playlist</h3>
              <button 
                className="close-modal"
                onClick={() => setShowPlaylistModal(false)}
              >
                ✖
              </button>
            </div>
            
            <div className="modal-body">
              <div className="song-preview">
                <img src={song.cover} alt={song.title} />
                <div>
                  <h4>{song.title}</h4>
                  <p>{song.artist}</p>
                </div>
              </div>
              
              {existingPlaylists.length > 0 && (
                <div className="existing-playlists">
                  <h4>Add to existing playlist:</h4>
                  <div className="playlist-options">
                    {existingPlaylists.map(playlist => (
                      <button
                        key={playlist.id}
                        className="playlist-option"
                        onClick={() => addToExistingPlaylist(playlist.id)}
                      >
                        <span>{playlist.name}</span>
                        <small>{playlist.songs.length} songs</small>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="create-new-section">
                {!showCreateForm ? (
                  <button 
                    className="create-new-btn"
                    onClick={() => setShowCreateForm(true)}
                  >
                    + Create New Playlist
                  </button>
                ) : (
                  <div className="create-form">
                    <input
                      type="text"
                      placeholder="Enter playlist name"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && createNewPlaylist()}
                      autoFocus
                    />
                    <div className="form-buttons">
                      <button 
                        onClick={createNewPlaylist}
                        disabled={!newPlaylistName.trim()}
                      >
                        Create
                      </button>
                      <button 
                        onClick={() => {
                          setShowCreateForm(false);
                          setNewPlaylistName('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SongCard;