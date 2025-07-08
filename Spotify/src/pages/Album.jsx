"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import SongCard from "../components/SongCard"
import "../styles/album.css"
import downloadCover from "../assets/download.jpeg"
import downloadCover1 from "../assets/download1.jpeg"
import downloadCover2 from "../assets/download 2.jpeg"
import downloadCover3 from "../assets/download3.jpeg"
import downloadCover4 from "../assets/download4.jpg"
import downloadCover5 from "../assets/download5.jpg"
import downloadCover6 from "../assets/download6.jpg"

// All songs data (same as in Home.jsx)
const allSongs = [
  { title: "Peaches", artist: "Justin Bieber", cover: downloadCover, url: "/music/Peaches .mp3" },
  {
    title: "Mood",
    artist: "24kGoldn",
    cover: "https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp",
    url: "/music/24kgoldn - Mood (feat. iann dior).mp3",
  },
  {
    title: "Nagada Sang Dhol",
    artist: "Sanjay Leela Bhansali,Shreya Ghoshal,Osman Mir",
    cover: downloadCover4,
    url: "/music/Nagada Sang Dhol - Goliyon Ki Raasleela Ram Leela 128 Kbps.mp3",
  },
  { title: "Candy", artist: "DojaCat", cover: downloadCover5, url: "/music/Doja-Cat-Candy.mp3" },
  { title: "Levitating", artist: "Dua Lipa", cover: downloadCover2, url: "/music/Dua Lipa - Levitating.mp3" },
  {
    title: "Save Your Tears",
    artist: "The Weeknd",
    cover: downloadCover1,
    url: "/music/Save Your Tears - The Weeknd.mp3",
  },
  {
    title: "Surili Ankhiyon Waale",
    artist: "Rahat Fateh Ali Khan, Suzanne DMello,Sajid-Wajid",
    cover: downloadCover6,
    url: "/music/Surili Akiyon Wale - Veer.mp3",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: downloadCover1,
    url: "/music/The Weeknd - Blinding Lights (Official Audio).mp3",
  },
  { title: "Heat Waves", artist: "Glass Animals", cover: downloadCover3, url: "/music/Heat Waves - Glass Animals.mp3" },
]

// Artist information
const artistInfo = {
  "Justin Bieber": {
    name: "Justin Bieber",
    image: downloadCover,
    bio: 'Canadian singer and songwriter known for hits like "Peaches", "Sorry", and "Love Yourself".',
    genre: "Pop, R&B",
    followers: "69.2M",
  },
  "24kGoldn": {
    name: "24kGoldn",
    image: "https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp",
    bio: 'American rapper, singer, and songwriter known for the viral hit "Mood".',
    genre: "Hip-Hop, Pop",
    followers: "8.5M",
  },
  "The Weeknd": {
    name: "The Weeknd",
    image: downloadCover1,
    bio: "Canadian singer known for his unique blend of R&B, pop, and synthwave.",
    genre: "R&B, Pop, Synthwave",
    followers: "45.8M",
  },
  "Dua Lipa": {
    name: "Dua Lipa",
    image: downloadCover2,
    bio: "British pop sensation known for her deep voice and disco-influenced beats.",
    genre: "Pop, Dance-Pop",
    followers: "32.1M",
  },
  "Glass Animals": {
    name: "Glass Animals",
    image: downloadCover3,
    bio: "English indie rock band known for their psychedelic pop sound.",
    genre: "Indie Rock, Psychedelic Pop",
    followers: "12.3M",
  },
  "Shreya Ghoshal": {
    name: "Shreya Ghoshal",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdeCponDM1xIGoECSGxwPHVRD1GAEvBjuIA&s",
    bio: "One of India's most celebrated playback singers.",
    genre: "Bollywood, Classical",
    followers: "15.7M",
  },
  DojaCat: {
    name: "Doja Cat",
    image: downloadCover5,
    bio: "American rapper, singer, and songwriter known for her versatile music style.",
    genre: "Hip-Hop, Pop, R&B",
    followers: "24.6M",
  },
}

function Album({ setCurrentSong }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [albumSongs, setAlbumSongs] = useState([])
  const [artist, setArtist] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Decode the artist name from URL
    const artistName = decodeURIComponent(id)

    // Find songs by this artist (including collaborations)
    const songsByArtist = allSongs.filter((song) => song.artist.toLowerCase().includes(artistName.toLowerCase()))

    // Get artist info
    const artistData = artistInfo[artistName] || {
      name: artistName,
      image: songsByArtist[0]?.cover || "/placeholder.svg",
      bio: "Artist information not available.",
      genre: "Various",
      followers: "N/A",
    }

    setAlbumSongs(songsByArtist)
    setArtist(artistData)
  }, [id])

  const handlePlayAll = () => {
    if (albumSongs.length > 0) {
      setCurrentSong(albumSongs[0])
      setIsPlaying(true)
    }
  }

  const handleShuffle = () => {
    if (albumSongs.length > 0) {
      const shuffledIndex = Math.floor(Math.random() * albumSongs.length)
      setCurrentSong(albumSongs[shuffledIndex])
      setIsPlaying(true)
    }
  }

  if (!artist || albumSongs.length === 0) {
    return (
      <div className="album-page">
        <div className="album-not-found">
          <h2>Album Not Found</h2>
          <p>No songs found for this artist.</p>
          <button onClick={() => navigate("/")} className="back-home-btn">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="album-page">
      {/* Album Header */}
      <div className="album-header">
        <div className="album-cover">
          <img src={artist.image || "/placeholder.svg"} alt={artist.name} />
        </div>

        <div className="album-info">
          <span className="album-type">Artist</span>
          <h1 className="album-title">{artist.name}</h1>
          <div className="album-meta">
            <span className="followers">{artist.followers} monthly listeners</span>
            <span className="separator">•</span>
            <span className="genre">{artist.genre}</span>
            <span className="separator">•</span>
            <span className="song-count">{albumSongs.length} songs</span>
          </div>
          <p className="album-description">{artist.bio}</p>
        </div>
      </div>

      {/* Album Controls */}
      <div className="album-controls">
        <button className="play-all-btn" onClick={handlePlayAll}>
          <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
            <polygon points="6,4 20,12 6,20" />
          </svg>
          Play All
        </button>

        <button className="shuffle-btn" onClick={handleShuffle}>
          <svg width="20" height="20" fill="#b3b3b3" viewBox="0 0 24 24">
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
          </svg>
          Shuffle
        </button>

        <button className="more-options-btn">
          <svg width="20" height="20" fill="#b3b3b3" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </div>

      {/* Songs List */}
      <div className="album-songs">
        <div className="songs-header">
          <div className="song-number">#</div>
          <div className="song-title">Title</div>
          <div className="song-duration">Duration</div>
        </div>

        <div className="songs-list">
          {albumSongs.map((song, index) => (
            <div key={index} className="album-song-row">
              <div className="song-number">{index + 1}</div>
              <div className="song-details">
                <img src={song.cover || "/placeholder.svg"} alt={song.title} className="song-thumbnail" />
                <div className="song-text">
                  <h4 className="song-title">{song.title}</h4>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </div>
              <div className="song-actions">
                <button className="play-song-btn" onClick={() => setCurrentSong(song)} title="Play song">
                  <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </button>
              </div>
              <div className="song-duration">3:24</div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Artists */}
      <div className="related-section">
        <h2>Popular Songs</h2>
        <div className="song-grid">
          {albumSongs.slice(0, 6).map((song, index) => (
            <SongCard key={index} song={song} setCurrentSong={setCurrentSong} />
          ))}
        </div>
      </div>
      <br/><br/><br/>
    </div>
    
  )
}

export default Album
