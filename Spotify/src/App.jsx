"use client"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Player from "./components/Player"
import Home from "./pages/Home"
import Album from "./pages/Album"
import Genre from "./pages/Genre"

import Playlist from "./pages/Playlist"
import Profile from "./pages/Profile"

import downloadCover from "./assets/download.jpeg"
import downloadCover2 from "./assets/download 2.jpeg"
import downloadCover1 from "./assets/download1.jpeg"
import downloadCover3 from "./assets/download3.jpeg"

// Import or define artistBios here (copy from your Home.jsx)
const artistBios = {
  "Justin Bieber": `Justin Bieber is a Canadian singer and songwriter known for hits like "Peaches", "Sorry", and "Love Yourself". He rose to fame after being discovered on YouTube and has since become one of the world's best-selling music artists. His debut album "My World 2.0" established him as a teen idol, and he matured musically with later albums like "Purpose" and "Justice". Known for his smooth vocals, versatile style, and strong fanbase known as "Beliebers", Bieber has won numerous awards including Grammys, Billboard Music Awards, and MTV Video Music Awards.`,
  "24kGoldn": `24kGoldn (real name Golden Landis Von Jones) is an American rapper, singer, and songwriter. He gained massive popularity with the viral TikTok hit "Mood", featuring Iann Dior. His music blends elements of hip-hop, pop, and rock, appealing to a wide Gen Z audience. 24kGoldn began his music career while studying at USC before deciding to pursue music full-time. His debut album "El Dorado" was released in 2021, showcasing his genre-defying style and catchy hooks.`,
  "Shreya Ghoshal": `Shreya Ghoshal is one of India's most celebrated playback singers. She gained national recognition after winning the reality show "Sa Re Ga Ma Pa" as a teenager, and made her Bollywood debut with "Devdas", for which she won a National Film Award. Known for her melodious voice and versatility, Shreya has sung in multiple Indian languages including Hindi, Bengali, Tamil, Telugu, and Malayalam. Over her two-decade-long career, she has received numerous Filmfare and National Awards, and is often referred to as the 'Queen of Melody' in India.`,
  "Dua Lipa": `Dua Lipa is a British pop sensation known for her deep voice, disco-influenced beats, and empowering lyrics. She rose to fame with her debut self-titled album, and gained global recognition with her Grammy-winning second album "Future Nostalgia". Hits like "Don't Start Now", "Levitating", and "New Rules" have cemented her status as a leading pop icon. Beyond music, Dua is also known for her fashion-forward image and activism, including support for refugee rights and women's empowerment.`,
  "The Weeknd": `The Weeknd (real name Abel Tesfaye) is a Canadian singer, songwriter, and producer known for his unique blend of R&B, pop, and synthwave. His rise began with a series of mysterious mixtapes, followed by critically acclaimed albums like "Trilogy", "Starboy", and "After Hours". Known for his haunting falsetto and cinematic style, he has delivered chart-toppers like "Blinding Lights", "The Hills", and "Save Your Tears". The Weeknd has won numerous awards including Grammys and Billboard Music Awards, and performed at the Super Bowl Halftime Show in 2021.`,
  "Glass Animals": `Glass Animals are an English indie rock band formed in Oxford, best known for their psychedelic pop sound and innovative production. Fronted by Dave Bayley, the band gained international acclaim with songs like "Gooey", "Life Itself", and the viral hit "Heat Waves". Their album "Dreamland" explored themes of nostalgia, identity, and personal growth. Glass Animals are praised for their experimental approach to music, vibrant live performances, and unique visuals that complement their storytelling.`,
  "Rahat Fateh Ali Khan": `Rahat Fateh Ali Khan is a globally acclaimed Pakistani vocalist, best known for his command over Qawwali—a devotional form of Sufi music. He is the nephew of the legendary Nusrat Fateh Ali Khan and has carried forward the rich family tradition of soulful music. Apart from Qawwali, Rahat has performed ghazals, classical, and Bollywood playback songs, winning hearts with hits like "O Re Piya", "Teri Ore", and "Afreen Afreen". His emotional depth and vocal mastery have earned him a revered place across South Asia and in international music scenes alike.`,
  "Sanjay Leela Bhansali": `Sanjay Leela Bhansali is a renowned Indian film director, producer, screenwriter, and music composer, celebrated for his grand cinematic vision and emotionally rich storytelling. He made his directorial debut with "Khamoshi: The Musical", but gained massive acclaim with "Hum Dil De Chuke Sanam", followed by masterpieces like "Devdas", "Goliyon Ki Raasleela Ram-Leela", "Bajirao Mastani", and "Padmaavat". Bhansali is known for his opulent sets, intricate costumes, soulful music, and powerful female protagonists. Over his illustrious career, he has won multiple National Film Awards, Filmfare Awards, and Padma Shri, establishing himself as one of India's most influential filmmakers.`,
  "Osman Mir": `Osman Mir is a celebrated Indian playback singer and folk artist, best known for his powerful renditions of devotional, classical, and Sufi music. He hails from Gujarat and initially gained recognition through his performances in traditional Gujarati folk music and bhajans. His breakthrough into mainstream Bollywood came with the soulful track "Moraribapu" and later the immensely popular "Mor Bani Thanghat Kare" in Sanjay Leela Bhansali's *Goliyon Ki Raasleela Ram-Leela*. Known for his deep, soulful voice and command over classical ragas, Osman Mir has a devoted following across India and the Gujarati diaspora. His music is marked by spiritual intensity and emotional depth, making him a prominent voice in devotional and folk circles.`,
  "Pritam": `Pritam Chakraborty, popularly known as Pritam, is a renowned Indian music composer and playback singer, celebrated for his work in Bollywood films. He gained fame with his compositions for movies like "Gangster", "Jab We Met", and "Barfi!", blending Indian classical music with contemporary sounds. Pritam's versatility spans various genres, including rock, pop, and traditional Indian music. He has won numerous awards, including Filmfare Awards and IIFA Awards, and is known for his ability to create memorable melodies that resonate with audiences across generations.`,
  "Arijit Singh": `Arijit Singh is one of the most beloved playback singers in India, known for his soulful and emotive voice. Rising to prominence with songs like "Tum Hi Ho" and "Channa Mereya", he has become the voice behind countless Bollywood romantic hits and continues to captivate audiences with his vocal range and expressive singing style.`,
    "Bruno Mars": `Bruno Mars (real name Peter Gene Hernandez) is a Grammy-winning artist celebrated for blending pop, funk, soul, and R&B into infectious hits. Known for songs like "Uptown Funk", "Just the Way You Are", and "24K Magic", his throwback style and energetic performances have made him one of the most dynamic entertainers in contemporary music.`,
    "Lady Gaga": `Lady Gaga (real name Stefani Joanne Angelina Germanotta) is a multi-talented singer, songwriter, and actress who rose to fame with hits like "Poker Face", "Bad Romance", and "Shallow". Renowned for her bold fashion, genre versatility, and vocal power, she blends pop, dance, rock, and jazz with fearless creativity, earning her global stardom and critical acclaim across music and film.`,

}

const artistImages = {
  "Justin Bieber": downloadCover,
  "Sanjay Leela Bhansali":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLIwzGGTyJ_e8rl0KLRcrW6UcwdjqTEx43nQ&s",
  "24kGoldn": "https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp",
  "Shreya Ghoshal": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdeCponDM1xIGoECSGxwPHVRD1GAEvBjuIA&s",
  "Dua Lipa": downloadCover2,
  "The Weeknd": downloadCover1,
  "Glass Animals": downloadCover3,
  "Rahat Fateh Ali Khan": "https://fankaronline.com/content/uploads/2016/07/Rahat-Fateh-Ali-Khan.png",
  "Pritam": "https://stat4.bollywoodhungama.in/wp-content/uploads/2025/02/620x450-4842-1-354x199.jpg",
  "Arijit": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69kbXgwYDwS_6dhgRdRIVHSV2HekIZWDsFQ&s",
  "Bruno Mars": "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
}

function App() {
  const [currentSong, setCurrentSong] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [playlist, setPlaylist] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [repeatMode, setRepeatMode] = useState("off")
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false)

  const handleSongSelect = (song, autoPlay = false) => {
    setCurrentSong(song)
    setShowSidebar(true)
    setShouldAutoPlay(autoPlay)
  }

  const handleGenreSongSelect = (song, autoPlay = false) => {
    setCurrentSong(song)
    setShouldAutoPlay(autoPlay)
  }

  const closeSidebar = () => {
    setShowSidebar(false)
  }

  const handleNext = () => {
    if (playlist.length > 0) {
      if (repeatMode === "all" && currentIndex === playlist.length - 1) {
        setCurrentIndex(0)
        setCurrentSong(playlist[0])
        setShouldAutoPlay(true)
      } else if (currentIndex < playlist.length - 1) {
        const nextIndex = currentIndex + 1
        setCurrentIndex(nextIndex)
        setCurrentSong(playlist[nextIndex])
        setShouldAutoPlay(true)
      }
    }
  }

  const handlePrevious = () => {
    if (playlist.length > 0) {
      if (repeatMode === "all" && currentIndex === 0) {
        const lastIndex = playlist.length - 1
        setCurrentIndex(lastIndex)
        setCurrentSong(playlist[lastIndex])
        setShouldAutoPlay(true)
      } else if (currentIndex > 0) {
        const prevIndex = currentIndex - 1
        setCurrentIndex(prevIndex)
        setCurrentSong(playlist[prevIndex])
        setShouldAutoPlay(true)
      }
    }
  }

  return (
    <>
      <div className={`app-layout${showSidebar ? " bio-open" : ""}`}>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home setCurrentSong={handleSongSelect} />} />
            <Route
              path="/album/:id"
              element={
                <Album
                  setCurrentSong={handleSongSelect}
                  setPlaylist={setPlaylist}
                  setCurrentIndex={setCurrentIndex}
                  currentSong={currentSong}
                  playlist={playlist}
                  currentIndex={currentIndex}
                  repeatMode={repeatMode}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              }
            />
            <Route
              path="/genre/:type"
              element={
                <Genre
                  setCurrentSong={handleGenreSongSelect}
                  setPlaylist={setPlaylist}
                  setCurrentIndex={setCurrentIndex}
                  currentSong={currentSong}
                  playlist={playlist}
                  currentIndex={currentIndex}
                  repeatMode={repeatMode}
                  setRepeatMode={setRepeatMode}
                />
              }
            />
           
            <Route
              path="/playlist/:id"
              element={
                <Playlist
                  setCurrentSong={handleGenreSongSelect}
                  setPlaylist={setPlaylist}
                  setCurrentIndex={setCurrentIndex}
                  currentSong={currentSong}
                  playlist={playlist}
                  currentIndex={currentIndex}
                  repeatMode={repeatMode}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                />
              }
            />
            <Route path="/profile" element={<Profile />} /> {/* ✅ Profile route added */}
          </Routes>
        </div>

        {/* Sidebar for song info and artist bio */}
        {showSidebar && currentSong && (
          <div className="artist-bio-sidebar">
            <button className="close-bio" onClick={closeSidebar}>
              ✖
            </button>
            <div className="sidebar-song-info" style={{ textAlign: "center", marginBottom: 24 }}>
              <img
                src={currentSong.cover || "/placeholder.svg"}
                alt={currentSong.title}
                style={{ width: 100, height: 100, borderRadius: 12, objectFit: "cover", marginBottom: 10 }}
              />
              <h2 style={{ margin: 0, fontSize: 22 }}>{currentSong.title}</h2>
              <p style={{ color: "#b3b3b3", margin: "8px 0 0 0", fontSize: 16 }}>{currentSong.artist}</p>
            </div>
            <div className="sidebar-artist-info">
              {currentSong.artist.split(",").map((artist) => {
                const name = artist.trim()
                const img =
                  artistImages[name] ||
                  `https://ui-avatars.com/api/?background=0b0d7e&color=fff&name=${encodeURIComponent(name)}`
                const bio = artistBios[name]
                return (
                  <div key={name} style={{ display: "flex", gap: 12, marginBottom: 18 }}>
                    <img
                      src={img}
                      alt={name}
                      style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                      <h3 style={{ margin: 0, fontSize: 18 }}>{name}</h3>
                      <p style={{ color: "#ccc", fontSize: 14, margin: "6px 0 0 0" }}>
                        {bio || "No bio available."}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <Player
        currentSong={currentSong}
        playlist={playlist}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
        setCurrentIndex={setCurrentIndex}
        setCurrentSong={setCurrentSong}
        repeatMode={repeatMode}
        setRepeatMode={setRepeatMode}
        shouldAutoPlay={shouldAutoPlay}
        setShouldAutoPlay={setShouldAutoPlay}
      />
    </>
  )
}

export default App
