"use client"

import { useState } from "react"
import "../styles/genre.css"
import SongCard from "../components/SongCard"
import downloadCover from "../assets/download.jpeg"
import downloadCover1 from "../assets/download1.jpeg"
import downloadCover2 from "../assets/download 2.jpeg"
import downloadCover3 from "../assets/download3.jpeg"
import downloadCover4 from "../assets/download4.jpg"
import downloadCover5 from "../assets/download5.jpg"
import downloadCover6 from "../assets/download6.jpg"

// Genre data with songs categorized by genre
const genreData = {
  pop: {
    name: "Pop",
    description: "Popular music with catchy melodies and mainstream appeal",
    color: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
    icon: "🎵",
    songs: [
      { title: "Peaches", artist: "Justin Bieber", cover: downloadCover, url: "/music/Peaches .mp3" },
      {
        title: "Blinding Lights",
        artist: "The Weeknd",
        cover: downloadCover1,
        url: "/music/The Weeknd - Blinding Lights (Official Audio).mp3",
      },
      { title: "Levitating", artist: "Dua Lipa", cover: downloadCover2, url: "/music/Dua Lipa - Levitating.mp3" },
      {
        title: "Save Your Tears",
        artist: "The Weeknd",
        cover: downloadCover1,
        url: "/music/Save Your Tears - The Weeknd.mp3",
      },
    ],
  },
  hiphop: {
    name: "Hip-Hop",
    description: "Rhythmic spoken lyrics with strong beats and urban culture",
    color: "linear-gradient(135deg, #4ECDC4, #44A08D)",
    icon: "🎤",
    songs: [
      {
        title: "Mood",
        artist: "24kGoldn",
        cover: "https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp",
        url: "/music/24kgoldn - Mood (feat. iann dior).mp3",
      },
      { title: "Candy", artist: "DojaCat", cover: downloadCover5, url: "/music/Doja-Cat-Candy.mp3" },
    ],
  },
  bollywood: {
    name: "Bollywood",
    description: "Indian film music with rich melodies and cultural expressions",
    color: "linear-gradient(135deg, #FFE66D, #FF9A56)",
    icon: "🎭",
    songs: [
      {
        title: "Nagada Sang Dhol",
        artist: "Sanjay Leela Bhansali,Shreya Ghoshal,Osman Mir",
        cover: downloadCover4,
        url: "/music/Nagada Sang Dhol - Goliyon Ki Raasleela Ram Leela 128 Kbps.mp3",
      },
      {
        title: "Surili Ankhiyon Waale",
        artist: "Rahat Fateh Ali Khan, Suzanne DMello,Sajid-Wajid",
        cover: downloadCover6,
        url: "/music/Surili Akiyon Wale - Veer.mp3",
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
    ],
  },
  indie: {
    name: "Indie",
    description: "Independent music with unique and experimental sounds",
    color: "linear-gradient(135deg, #A8E6CF, #7FCDCD)",
    icon: "🎸",
    songs: [
      {
        title: "Heat Waves",
        artist: "Glass Animals",
        cover: downloadCover3,
        url: "/music/Heat Waves - Glass Animals.mp3",
      },
    ],
  },
  electronic: {
    name: "Electronic",
    description: "Digital music with synthesized sounds and electronic beats",
    color: "linear-gradient(135deg, #B19CD9, #C9A9DD)",
    icon: "🎹",
    songs: [],
  },
  rock: {
    name: "Rock",
    description: "Guitar-driven music with powerful vocals and strong rhythms",
    color: "linear-gradient(135deg, #FF8A80, #FF7043)",
    icon: "🎸",
    songs: [
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
    ],
  },
}

// Mood-based playlists
const moodPlaylists = {
  happy: {
    name: "Happy Vibes",
    description: "Upbeat songs to boost your mood",
    color: "linear-gradient(135deg, #FFD93D, #FF9A56)",
    icon: "😊",
    songs: [
      { title: "Peaches", artist: "Justin Bieber", cover: downloadCover, url: "/music/Peaches .mp3" },
      { title: "Levitating", artist: "Dua Lipa", cover: downloadCover2, url: "/music/Dua Lipa - Levitating.mp3" },
      {
        title: "Mood",
        artist: "24kGoldn",
        cover: "https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp",
        url: "/music/24kgoldn - Mood (feat. iann dior).mp3",
      },
      
    ],
  },
  chill: {
    name: "Chill Out",
    description: "Relaxing songs for a peaceful time",
    color: "linear-gradient(135deg, #6BCF7F, #4D9DE0)",
    icon: "🌿",
    songs: [
      {
        title: "Heat Waves",
        artist: "Glass Animals",
        cover: downloadCover3,
        url: "/music/Heat Waves - Glass Animals.mp3",
      },
      {
        title: "Save Your Tears",
        artist: "The Weeknd",
        cover: downloadCover1,
        url: "/music/Save Your Tears - The Weeknd.mp3",
      },
    ],
  },
  romantic: {
    name: "Romantic",
    description: "Love songs for special moments",
    color: "linear-gradient(135deg, #FFB3BA, #FFDFBA)",
    icon: "💕",
    songs: [
      {
        title: "Surili Ankhiyon Waale",
        artist: "Rahat Fateh Ali Khan, Suzanne DMello,Sajid-Wajid",
        cover: downloadCover6,
        url: "/music/Surili Akiyon Wale - Veer.mp3",
      },
      {
        title: "Save Your Tears",
        artist: "The Weeknd",
        cover: downloadCover1,
        url: "/music/Save Your Tears - The Weeknd.mp3",
      },
      {
        title: "Jao Pakhi Bolo",
        artist: "Shreya Ghoshal",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdeCponDM1xIGoECSGxwPHVRD1GAEvBjuIA&s",
        url: "/music/Jao Pakhi.mp3",
      },
    ],
  },
  energetic: {
    name: "Energetic",
    description: "High-energy songs for workouts and motivation",
    color: "linear-gradient(135deg, #FF6B6B, #4ECDC4)",
    icon: "⚡",
    songs: [
      {
        title: "Blinding Lights",
        artist: "The Weeknd",
        cover: downloadCover1,
        url: "/music/The Weeknd - Blinding Lights (Official Audio).mp3",
      },
      {
        title: "Nagada Sang Dhol",
        artist: "Sanjay Leela Bhansali,Shreya Ghoshal,Osman Mir",
        cover: downloadCover4,
        url: "/music/Nagada Sang Dhol - Goliyon Ki Raasleela Ram Leela 128 Kbps.mp3",
      },
    ],
  },
  sad: {
    name: "Sad Songs",
    description: "Emotional tracks for reflective moments",
    color: "linear-gradient(135deg,rgb(207, 44, 44),rgb(216, 226, 225))",
    icon: "❤️‍🩹",
    songs: [
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
        title: "Ae Dil Hai Mushkil",
        artist: "Pritam, Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
        url: "/music/Ae Dil Hai Mushkil.mp3",
      },
    ],
  },
}

function Genre({ setCurrentSong, setPlaylist, setCurrentIndex, currentIndex, currentSong, playlist }) {
  const [selectedGenre, setSelectedGenre] = useState(null)
  const [selectedMood, setSelectedMood] = useState(null)
  const [activeTab, setActiveTab] = useState("genres")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter songs based on search term
  const filterSongs = (songs) => {
    if (!searchTerm) return songs
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Play all songs from a genre/mood
  const playAll = (songs, startIndex = 0) => {
    if (songs.length === 0) {
      console.warn("No songs available to play")
      return
    }

    console.log("Playing all songs:", songs)
    console.log("Starting at index:", startIndex)

    // Set the playlist first
    setPlaylist(songs)
    // Set the current song with autoplay enabled
    setCurrentSong(songs[startIndex], true)
    // Set the current index
    setCurrentIndex(startIndex)
  }

  // Play a specific song from the collection
  const playSong = (song, songs) => {
    console.log("Playing song:", song)
    console.log("From playlist:", songs)

    // Find the correct index of the song in the original songs array
    const songIndex = songs.findIndex((s) => s.title === song.title && s.artist === song.artist && s.url === song.url)

    if (songIndex === -1) {
      console.error("Song not found in playlist")
      return
    }

    // Set the playlist first
    setPlaylist(songs)
    // Set the current song with autoplay enabled
    setCurrentSong(song, true)
    // Set the current index
    setCurrentIndex(songIndex)
  }

  // Handle song card click - this is what SongCard calls
  const handleSongCardClick = (song) => {
    let currentSongs = []

    // Determine which songs list we're currently viewing
    if (selectedGenre) {
      currentSongs = genreData[selectedGenre].songs
    } else if (selectedMood) {
      currentSongs = moodPlaylists[selectedMood].songs
    } else {
      // If no specific genre/mood selected, create a playlist with just this song
      currentSongs = [song]
    }

    // Apply search filter if active
    const filteredSongs = filterSongs(currentSongs)

    // Play the song within the context of the current filtered songs
    playSong(song, filteredSongs)
  }

  const renderGenreGrid = () => (
    <div className="genre-grid">
      {Object.entries(genreData).map(([key, genre]) => (
        <div
          key={key}
          className={`genre-card ${selectedGenre === key ? "selected" : ""}`}
          style={{ background: genre.color }}
          onClick={() => setSelectedGenre(selectedGenre === key ? null : key)}
        >
          <div className="genre-icon">{genre.icon}</div>
          <h3>{genre.name}</h3>
          <p>{genre.songs.length} songs</p>
          <div className="genre-description">{genre.description}</div>
        </div>
      ))}
    </div>
  )

  const renderMoodGrid = () => (
    <div className="mood-grid">
      {Object.entries(moodPlaylists).map(([key, mood]) => (
        <div
          key={key}
          className={`mood-card ${selectedMood === key ? "selected" : ""}`}
          style={{ background: mood.color }}
          onClick={() => setSelectedMood(selectedMood === key ? null : key)}
        >
          <div className="mood-icon">{mood.icon}</div>
          <h3>{mood.name}</h3>
          <p>{mood.songs.length} songs</p>
          <div className="mood-description">{mood.description}</div>
        </div>
      ))}
    </div>
  )

  const renderSongList = (songs, title) => {
    const filteredSongs = filterSongs(songs)

    return (
      <div className="song-list-section">
        <div className="section-header">
          <h2>{title}</h2>
          {filteredSongs.length > 0 && (
            <button className="play-all-btn" onClick={() => playAll(filteredSongs, 0)}>
              ▶️ Play All
            </button>
          )}
        </div>

        {songs.length === 0 ? (
          <p className="no-songs">No songs available in this category.</p>
        ) : filteredSongs.length === 0 ? (
          <p className="no-songs">No songs match your search.</p>
        ) : (
          <div className="songs-grid">
            {filteredSongs.map((song, index) => (
              <SongCard
                key={`${song.title}-${song.artist}-${index}`}
                song={song}
                setCurrentSong={() => handleSongCardClick(song)}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="genre-page">
      <div className="genre-header">
        <h1>Music Explorer</h1>
        <p>Discover music by genre or mood</p>

        
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "genres" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("genres")
            setSelectedMood(null)
          }}
        >
          Genres
        </button>
        <button
          className={`tab-btn ${activeTab === "moods" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("moods")
            setSelectedGenre(null)
          }}
        >
          Moods
        </button>
      </div>

      <div className="genre-content">
        {activeTab === "genres" ? (
          <>
          
            {!selectedGenre ? (
              <div className="genre-overview">
                <h2>Browse by Genre</h2>
                {renderGenreGrid()}
              </div>
            ) : (
              <div className="genre-details">
                <button className="back-btn" onClick={() => setSelectedGenre(null)}>
                  ← Back to Genres
                </button>
                {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="genre-search"
          />
        </div>
                {renderSongList(genreData[selectedGenre].songs, genreData[selectedGenre].name)}
              </div>
            )}
          </>
        ) : (
          <>
            {!selectedMood ? (
              <div className="mood-overview">
                <h2>Browse by Mood</h2>
                {renderMoodGrid()}
              </div>
            ) : (
              <div className="mood-details">
                <button className="back-btn" onClick={() => setSelectedMood(null)}>
                  ← Back to Moods
                </button>
                {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="genre-search"
          />
        </div>
                {renderSongList(moodPlaylists[selectedMood].songs, moodPlaylists[selectedMood].name)}
              </div>
            )}
          </>
        )}
      </div>

      <br />
      <br />
      <br />
    </div>
  )
}

export default Genre
