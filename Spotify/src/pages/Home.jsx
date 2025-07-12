"use client"

import { useState, useRef } from "react"
import "../styles/home.css"
import SongCard from "../components/SongCard"
import AlbumLink from "../components/AlbumLink"
import downloadCover from "../assets/download.jpeg"
import downloadCover1 from "../assets/download1.jpeg"
import downloadCover2 from "../assets/download 2.jpeg"
import downloadCover3 from "../assets/download3.jpeg"
import downloadCover4 from "../assets/download4.jpg"
import downloadCover5 from "../assets/download5.jpg"
import downloadCover6 from "../assets/download6.jpg"
import downloadCover7 from "../assets/images.jpg"

// Featured Artist of the Year
const featuredArtist = {
  name: "Bruno Mars",
  image: "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
  bio: "Crowned the Artist of the Year 2025, Bruno Mars has once again proven his dominance in the global music scene. Known for blending retro funk, R&B, and pop into unforgettable anthems, he mesmerizes audiences with hits that never age and live shows full of energy, soul, and swagger.",
  achievement: "Artist of the Year 2025",
  topSong: "Die with a Smile",
  backgroundImage:
    "https://ca-times.brightspotcdn.com/dims4/default/d2222df/2147483647/strip/true/crop/600x400+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F56%2F14%2Fc5c64130f390b5c3da05f0c5db18%2Fla-et-ms-bruno-mars-billboard-artist-of-the-ye-001",
}

// Song lists (same as before)
const discover = [
  {
    title: "Die With  A Smile",
    artist: "Bruno Mars",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iqorfhMzSGMQ1TRCFBtHND7VhtsX_6SYzQ&s",
    url: "/music/Die With A Smile.mp3",
  },
  { title: "Peaches", artist: "Justin Bieber", cover: downloadCover, url: "/music/Peaches .mp3" },
  {
    title: "Tujh Mei Rab Dikhta Hai",
    artist: "Shreya Ghoshal",
    cover: "https://pagalnew.com/coverimages/Tujh-Mein-Rab-Dikhta-Hai-II-Rab-Ne-Bana-Di-Jodi-500-500.jpg",
    url: "/music/Tujh Mein Rab Dikhta Hai.mp3",
  },
  {
    title: "Mood",
    artist: "24kGoldn",
    cover: "https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp",
    url: "/music/24kgoldn - Mood (feat. iann dior).mp3",
  },
  {
        title: "Mon Majhi Re",
        artist: "Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjwDN8PsmRFpERNlhIkPsPZo8kP7w81V0Z4g&s",
        url: "/music/Mon Majhi Re.mp3",
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
    title: "Hua Mai",
    artist: "Rahat Fateh Ali Khan, Suzanne DMello,Sajid-Wajid",
    cover: downloadCover7,
    url: "/music/Hua Main.mp3",
  },
  
]

const hindi = [
  {
    title: "Nagada Sang Dhol",
    artist: "Sanjay Leela Bhansali,Shreya Ghoshal,Osman Mir",
    cover: downloadCover4,
    url: "/music/Nagada Sang Dhol - Goliyon Ki Raasleela Ram Leela 128 Kbps.mp3",
  },
  {
    title: "Ae Dil Hai Mushkil",
    artist: "Pritam, Arijit Singh",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
    url: "/music/Ae Dil Hai Mushkil.mp3",
  },
  {
    title: "Surili Ankhiyon Waale",
    artist: "Rahat Fateh Ali Khan, Suzanne DMello,Sajid-Wajid",
    cover: downloadCover6,
    url: "/music/Surili Akiyon Wale - Veer.mp3",
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
    title: "Shayad",
    artist: "Pritam, Arijit Singh",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
    url: "/music/Shayad.mp3",
  },
  {
    title: "Hua Mai",
    artist: "Raghav Chaitanya,Pritam",
    cover: downloadCover7,
    url: "/music/Hua Main.mp3",
  },
  {
    title: "Hawayein",
        artist: "Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
        url: "/music/Hawayein.mp3",
      },
      {
    title: "Ami Je Tomar 3.0",
    artist: "Shreya Ghoshal",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyh-Xwc0gP8focfn8281aMhMU_BWu51Im0LQ&s",
    url: "/music/Ami Je Tomar 3.mp3",
  },
 
]

const madeForYou = [
  { title: "Peaches", artist: "Justin Bieber", cover: downloadCover, url: "/music/Peaches .mp3" },
  {
    title: "Mood",
    artist: "24kGoldn",
    cover: "https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp",
    url: "/music/24kgoldn - Mood (feat. iann dior).mp3",
  },
   {
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: downloadCover1,
    url: "/music/The Weeknd - Blinding Lights (Official Audio).mp3",
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
  { title: "Heat Waves", artist: "Glass Animals", cover: downloadCover3, url: "/music/Heat Waves - Glass Animals.mp3" },
]

const topArtists = [
  
  { name: "Bruno Mars", img: "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd" },
  { name: "Justin Bieber", img: downloadCover },
  { name: "Arijit Singh", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s" },
  {
    name: "Shreya Ghoshal",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdeCponDM1xIGoECSGxwPHVRD1GAEvBjuIA&s",
  },
  { name: "Dua Lipa", img: downloadCover2 },
  { name: "Pritam", img: "https://stat4.bollywoodhungama.in/wp-content/uploads/2025/02/620x450-4842-1-354x199.jpg" },
  { name: "The Weeknd", img: downloadCover1 },
  { name: "24kGoldn", img: "https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp" },
  { name: "Rahat Fateh Ali Khan", img: "https://fankaronline.com/content/uploads/2016/07/Rahat-Fateh-Ali-Khan.png" },

]

const bengali = [
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
        title: "Mon Majhi Re",
        artist: "Arijit Singh",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjwDN8PsmRFpERNlhIkPsPZo8kP7w81V0Z4g&s",
        url: "/music/Mon Majhi Re.mp3",
      },
]



// Artist bios (same as before)
const artistBios = {
  "Bruno Mars": `Bruno Mars (real name Peter Gene Hernandez) is a Grammy-winning artist celebrated for blending pop, funk, soul, and R&B into infectious hits. Known for songs like "Uptown Funk", "Just the Way You Are", and "24K Magic", his throwback style and energetic performances have made him one of the most dynamic entertainers in contemporary music.`,
  "Justin Bieber": `Justin Bieber is a Canadian singer and songwriter known for hits like "Peaches", "Sorry", and "Love Yourself". He rose to fame after being discovered on YouTube and has since become one of the world's best-selling music artists.`,
  "24kGoldn": `24kGoldn (real name Golden Landis Von Jones) is an American rapper, singer, and songwriter. He gained massive popularity with the viral TikTok hit "Mood".`,
  "Shreya Ghoshal": `Shreya Ghoshal is one of India's most celebrated playback singers, known for her melodious voice and versatility in Indian cinema.`,
  "Arijit Singh": `Arijit Singh is one of the most beloved playback singers in India, known for his soulful and emotive voice. Rising to prominence with songs like "Tum Hi Ho" and "Channa Mereya", he has become the voice behind countless Bollywood romantic hits and continues to captivate audiences with his vocal range and expressive singing style.`,
  "Dua Lipa": `Dua Lipa is a British pop sensation known for her deep voice, disco-influenced beats, and empowering lyrics. She rose to fame with her debut self-titled album.`,
  "The Weeknd": `The Weeknd (real name Abel Tesfaye) is a Canadian singer known for his unique blend of R&B, pop, and synthwave. Famous for hits like "Blinding Lights".`,
  "Glass Animals": `Glass Animals are an English indie rock band best known for their psychedelic pop sound and hits like "Heat Waves".`,
  "Rahat Fateh Ali Khan": `Rahat Fateh Ali Khan is a globally acclaimed Pakistani vocalist, best known for his command over Qawwali and Bollywood hits like "O Re Piya" and "Afreen Afreen".`,
  "Pritam": `Pritam is one of Bollywood's most successful music composers, renowned for crafting chart-topping soundtracks across genres—from romantic ballads to upbeat dance numbers. With hits in movies like "Ae Dil Hai Mushkil", "Barfi!", and "Jab We Met", his music has become a defining part of modern Indian cinema.`,
}

const artistImages = topArtists.reduce((acc, artist) => {
  acc[artist.name] = artist.img
  return acc
}, {})

function Home({ setCurrentSong }) {
  const [search, setSearch] = useState("")
  const [selectedArtist, setSelectedArtist] = useState("")
  const [showBio, setShowBio] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const artistsRowRef = useRef(null)

  const allSongs = [...discover]
  const filterFn = (s) =>
    selectedArtist
      ? s.artist.toLowerCase().includes(selectedArtist.toLowerCase())
      : s.title.toLowerCase().includes(search.toLowerCase()) || s.artist.toLowerCase().includes(search.toLowerCase())

  const filteredSongs = allSongs.filter(filterFn)

  // Calculate scroll parameters
  const cardWidth = 152
  const visibleCards = Math.floor((artistsRowRef.current?.offsetWidth || 800) / cardWidth)
  const maxScroll = Math.max(0, (topArtists.length - visibleCards) * cardWidth)

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - cardWidth * 2)
    setScrollPosition(newPosition)
    if (artistsRowRef.current) {
      artistsRowRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    const newPosition = Math.min(maxScroll, scrollPosition + cardWidth * 2)
    setScrollPosition(newPosition)
    if (artistsRowRef.current) {
      artistsRowRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className={`home${showBio ? " bio-open" : ""}`}>
      {/* Hero Section - Featured Artist */}
      <div className="hero-section" style={{ backgroundImage: `url(${featuredArtist.backgroundImage})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-badge">{featuredArtist.achievement}</span>
              <h1 className="hero-title">{featuredArtist.name}</h1>
              <p className="hero-bio">{featuredArtist.bio}</p>
              <div className="hero-stats">
                <span className="hero-stat">Top Hit: {featuredArtist.topSong}</span>
              </div>
              <AlbumLink artist={featuredArtist.name} className="hero-album-btn">
                View Full Album
              </AlbumLink>
            </div>
            <div className="hero-image">
              <img src={featuredArtist.image || "/placeholder.svg"} alt={featuredArtist.name} />
              <div className="hero-image-glow"></div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Top Artists */}
      <div className="top-artists-section">
        <h2>Top Artists</h2>
        <div className="top-artists-container">
          <button className="scroll-arrow left" onClick={scrollLeft} disabled={scrollPosition <= 0}>
            ‹
          </button>
          <div className="top-artists-row" ref={artistsRowRef}>
            {topArtists.map((artist, i) => (
              <div key={i} className="artist-card-container">
                <div
                  className={`artist-card${selectedArtist === artist.name ? " selected" : ""}`}
                  onClick={() => {
                    setSelectedArtist(artist.name)
                    setShowBio(true)
                  }}
                  style={{ cursor: "pointer" }}
                  title={`Show songs by ${artist.name}`}
                >
                  <img src={artist.img || "/placeholder.svg"} alt={artist.name} />
                  <span>{artist.name}</span>
                </div>
                <AlbumLink artist={artist.name} className="view-album-link">
                  View Album
                </AlbumLink>
              </div>
            ))}
          </div>
          <button className="scroll-arrow right" onClick={scrollRight} disabled={scrollPosition >= maxScroll}>
            ›
          </button>
        </div>
        {selectedArtist && (
          <button className="clear-artist" onClick={() => setSelectedArtist("")} style={{ marginTop: 16 }}>
            Clear Filter
          </button>
        )}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for songs or artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2" fill="none" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#fff" strokeWidth="2" />
          </svg>
        </button>
      </div>


      {/* Songs Section */}
      {discover.filter(filterFn).length > 0 && (
        <>
          <h1>Discover</h1>
          <div className="row">
            {discover.filter(filterFn).map((s, i) => (
              <SongCard key={i} song={s} setCurrentSong={setCurrentSong} />
            ))}
          </div>
        </>
      )}


      {madeForYou.filter(filterFn).length > 0 && (
        <>
          <h1>Made for You</h1>
          <div className="row">
            {madeForYou.filter(filterFn).map((s, i) => (
              <SongCard key={i} song={s} setCurrentSong={setCurrentSong} />
            ))}
          </div>
        </>
      )}

      {hindi.filter(filterFn).length > 0 && (
        <>
          <h1>Hindi Mixes for you</h1>
          <div className="row">
            {hindi.filter(filterFn).map((s, i) => (
              <SongCard key={i} song={s} setCurrentSong={setCurrentSong} />
            ))}
            
          </div>
          
        </>
      )}
      {bengali.filter(filterFn).length > 0 && (
          <>
            <h1>Bengali Mixes for you</h1>
            <div className="row">
              {bengali.filter(filterFn).map((s, i) => (
                <SongCard key={i} song={s} setCurrentSong={setCurrentSong} />
              ))}
            </div>
          </>
        )}

      {/* Artist Bio Sidebar - same as before */}
      {showBio && (
        <div className="artist-bio-sidebar">
          <button className="close-bio" onClick={() => setShowBio(false)}>
            ✖
          </button>
          {(() => {
            const song = discover.find((s) => s.artist.includes(selectedArtist))
            const artistWithBio = selectedArtist
            const artistImage = artistImages[artistWithBio]
            return (
              <>
                <h2 style={{ marginBottom: 8 }}>{artistWithBio}</h2>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {artistImage && (
                    <img
                      src={artistImage || "/placeholder.svg"}
                      alt={artistWithBio}
                      style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover" }}
                    />
                  )}
                  <h3 style={{ margin: 0 }}>{artistWithBio}</h3>
                </div>
                <p style={{ color: "#ccc", fontSize: 15, marginTop: 12 }}>
                  {artistBios[artistWithBio] || "No bio available."}
                </p>
                <AlbumLink artist={artistWithBio} className="view-full-album-btn">
                  View Full Album
                </AlbumLink>
              </>
            )
          })()}
        </div>
      )}

      {filteredSongs.length === 0 && <p>No songs found.</p>}

      <br/><br/><br/>
    </div>
  )
}

export default Home
