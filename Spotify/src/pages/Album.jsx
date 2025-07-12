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
import downloadCover7 from "../assets/images.jpg"

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
{
    title: "Hua Mai",
    artist: "Raghav Chaitanya,Pritam",
    cover: downloadCover7,
    url: "/music/Hua Main.mp3",
  },
  {
        title: "Bojhena Se Bojhena",
        artist: "Arijit Singh",
        cover: "https://upload.wikimedia.org/wikipedia/en/5/54/It_is_the_poster_of_the_film_Bojhena_Shey_Bojhena.jpg",
        url: "/music/Bojhena-Se-Bojhena.mp3",
      },
      {
        title: "Jao Pakhi Bolo",
        artist: "Shreya Ghoshal",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdeCponDM1xIGoECSGxwPHVRD1GAEvBjuIA&s",
        url: "/music/Jao Pakhi.mp3",
      },
      {
        title: "Megher Paalok",
        artist: "Shreya Ghoshal",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdeCponDM1xIGoECSGxwPHVRD1GAEvBjuIA&s",
        url: "/music/Megher-Palok.mp3",
      },
      {
        title: "Ae Dil Hai Mushkil",
        artist: "Pritam, Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
        url: "/music/Ae Dil Hai Mushkil.mp3",
      },
      {
        title: "Shayad",
        artist: "Pritam, Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
        url: "/music/Shayad.mp3",
      },
      {
        title: "Hawayein",
        artist: "Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
        url: "/music/Hawayein.mp3",
      },
      {
        title: "Mon Majhi Re",
        artist: "Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjwDN8PsmRFpERNlhIkPsPZo8kP7w81V0Z4g&s",
        url: "/music/Mon Majhi Re.mp3",
      },
      {
    title: "Die With  A Smile",
    artist: "Bruno Mars,Lady Gaga",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iqorfhMzSGMQ1TRCFBtHND7VhtsX_6SYzQ&s",
    url: "/music/Die With A Smile.mp3",
  },
   {
    title: "Talking To The Moon",
    artist: "Bruno Mars",
    cover: "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    url: "/music/Talking To The Moon.mp3",
  },
  
  {
    title: "Just The Way You Are",
    artist: "Bruno Mars",
    cover: "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    url: "/music/Just The Way You Are.mp3",
  },
  {
    title: "Saibo",
    artist: "Shreya Ghoshal, Tochi Raina",
    cover: "https://pagalnew.com/coverimages/Saibo-Shor-in-the-City-Original-Motion-Picture-Soundtrack-500-500.jpg",
    url: "/music/Saibo.mp3",
  },
  {
    title: "Ajnabi Hawayein",
    artist: "Shreya Ghoshal",
    cover: "https://pagalfree.com/images/128Ajnabi%20Hawaayein%20Bekrara%20Bahein%20-%20Shaapit%20128%20Kbps.jpg",
    url: "/music/Ajnabi Hawaayein.mp3",
  },
  {
    title: "Tujh Mei Rab Dikhta Hai",
    artist: "Shreya Ghoshal",
    cover: "https://pagalnew.com/coverimages/Tujh-Mein-Rab-Dikhta-Hai-II-Rab-Ne-Bana-Di-Jodi-500-500.jpg",
    url: "/music/Tujh Mein Rab Dikhta Hai.mp3",
  },
  {
    title: "Ami Je Tomar 3.0",
    artist: "Shreya Ghoshal",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyh-Xwc0gP8focfn8281aMhMU_BWu51Im0LQ&s",
    url: "/music/Ami Je Tomar 3.mp3",
  },
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
  "Pritam": {
    name: "Pritam",
    image: "https://stat4.bollywoodhungama.in/wp-content/uploads/2025/02/620x450-4842-1-354x199.jpg",
    bio: "Pritam Chakraborty, also known as Pritam, is an Indian music composer, record producer and music director for Bollywood films",
    genre: "Bollywood, Pop",
    followers: "44.9M",
  },
  "Bruno Mars": {
    name: "Bruno Mars",
    image: "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
    bio: "Bruno Mars is an American singer, songwriter, and performer known for his retro-inspired sound, smooth vocals, and electrifying stage presence",
    genre: "Funk, Pop",
    followers: "56.9M",
  },
  "Arijit Singh": {
    name: "Arijit Singh", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
    bio: "Indian playback singer, music composer and record producer.",
    genre: "Bollywood, Pop",
    followers: "50.2M",
  },
  DojaCat: {
    name: "Doja Cat",
    image: downloadCover5,
    bio: "American rapper, singer, and songwriter known for her versatile music style.",
    genre: "Hip-Hop, Pop, R&B",
    followers: "24.6M",
  },
   

}

function Album({
  setCurrentSong,
  setPlaylist,
  setCurrentIndex,
  currentSong,
  playlist,
  currentIndex,
  repeatMode,
  onNext,
  onPrevious,
}) {
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
      // Set up the playlist with all album songs
      setPlaylist(albumSongs)
      setCurrentIndex(0)
      setCurrentSong(albumSongs[0])
      setIsPlaying(true)
    }
  }

  const handleShuffle = () => {
    if (albumSongs.length > 0) {
      // Create shuffled playlist
      const shuffledSongs = [...albumSongs].sort(() => Math.random() - 0.5)
      setPlaylist(shuffledSongs)
      setCurrentIndex(0)
      setCurrentSong(shuffledSongs[0])
      setIsPlaying(true)
    }
  }

  const handleSongSelect = (song, index) => {
    // Set up playlist and play selected song
    setPlaylist(albumSongs)
    setCurrentIndex(index)
    setCurrentSong(song)
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

      </div>

      {/* Songs List */}
      <div className="album-songs">
        <div className="songs-header">
          <div className="song-number">#</div>
          <div className="song-title">Title</div>
          
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
                <button className="play-song-btn" onClick={() => handleSongSelect(song, index)} title="Play song">
                  <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </button>
              </div>
              
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
      <br />
      <br />
      <br />
    </div>
  )
}

export default Album
