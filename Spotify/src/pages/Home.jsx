import { useState, useRef } from 'react';
import '../styles/home.css';
import SongCard from '../components/SongCard';
import downloadCover from '../assets/download.jpeg';
import downloadCover1 from '../assets/download1.jpeg';
import downloadCover2 from '../assets/download 2.jpeg';
import downloadCover3 from '../assets/download3.jpeg';
import downloadCover4 from '../assets/download4.jpg';
import downloadCover5 from '../assets/download5.jpg';
import downloadCover6 from '../assets/download6.jpg';

// Song lists
const discover = [
  { title: 'Peaches', artist: 'Justin Bieber', cover: downloadCover, url: '/music/Peaches .mp3' },
  { title: 'Mood', artist: '24kGoldn', cover: 'https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp', url: '/music/24kgoldn - Mood (feat. iann dior).mp3' },
  { title: 'Nagada Sang Dhol', artist: 'Sanjay Leela Bhansali,Shreya Ghoshal,Osman Mir', cover: downloadCover4, url: '/music/Nagada Sang Dhol - Goliyon Ki Raasleela Ram Leela 128 Kbps.mp3' },
  { title: 'Candy', artist: 'DojaCat', cover: downloadCover5, url: '/music/Doja-Cat-Candy.mp3' },
  { title: 'Levitating', artist: 'Dua Lipa', cover: downloadCover2, url: '/music/Dua Lipa - Levitating.mp3' },
  { title: 'Save Your Tears', artist: 'The Weeknd', cover: downloadCover1, url: '/music/Save Your Tears - The Weeknd.mp3' },
  { title: 'Surili Ankhiyon Waale', artist: 'Rahat Fateh Ali Khan, Suzanne DMello,Sajid-Wajid', cover: downloadCover6, url: '/music/Surili Akiyon Wale - Veer.mp3' },
];

const jumpBack = [
  { title: 'Blinding Lights', artist: 'The Weeknd', cover: downloadCover1, url: '/music/The Weeknd - Blinding Lights (Official Audio).mp3' },
  { title: 'Heat Waves', artist: 'Glass Animals', cover: downloadCover3, url: '/music/Heat Waves - Glass Animals.mp3' },
];

const madeForYou = [
    { title: 'Peaches', artist: 'Justin Bieber', cover: downloadCover, url: '/music/Peaches .mp3' },
  { title: 'Mood', artist: '24kGoldn', cover: 'https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp', url: '/music/24kgoldn - Mood (feat. iann dior).mp3' },
  { title: 'Nagada Sang Dhol', artist: 'Sanjay Leela Bhansali,Shreya Ghoshal,Osman Mir', cover: downloadCover4, url: '/music/Nagada Sang Dhol - Goliyon Ki Raasleela Ram Leela 128 Kbps.mp3' },
];

const topArtists = [
  { name: 'Justin Bieber', img: downloadCover },
  { name: '24kGoldn', img: 'https://pendujatt.com.se/uploads/album/el-dorado-24kgoldn.webp' },
  { name: 'Shreya Ghoshal', img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJdeCponDM1xIGoECSGxwPHVRD1GAEvBjuIA&s" },
  { name: 'Dua Lipa', img: downloadCover2 },
  { name: 'The Weeknd', img: downloadCover1 },
  { name: 'Glass Animals', img: downloadCover3 },
  { name: 'Rahat Fateh Ali Khan', img: "https://fankaronline.com/content/uploads/2016/07/Rahat-Fateh-Ali-Khan.png" },
];

// 🎤 Artist bios
const artistBios = {
  'Justin Bieber': `Justin Bieber is a Canadian singer and songwriter known for hits like "Peaches", "Sorry", and "Love Yourself". He rose to fame after being discovered on YouTube and has since become one of the world's best-selling music artists.`,
  '24kGoldn': `24kGoldn (real name Golden Landis Von Jones) is an American rapper, singer, and songwriter. He gained massive popularity with the viral TikTok hit "Mood".`,
  'Shreya Ghoshal': `Shreya Ghoshal is one of India's most celebrated playback singers, known for her melodious voice and versatility in Indian cinema.`,
  'Dua Lipa': `Dua Lipa is a British pop sensation known for her deep voice, disco-influenced beats, and empowering lyrics. She rose to fame with her debut self-titled album.`,
  'The Weeknd': `The Weeknd (real name Abel Tesfaye) is a Canadian singer known for his unique blend of R&B, pop, and synthwave. Famous for hits like "Blinding Lights".`,
  'Glass Animals': `Glass Animals are an English indie rock band best known for their psychedelic pop sound and hits like "Heat Waves".`,
  'Rahat Fateh Ali Khan': `Rahat Fateh Ali Khan is a globally acclaimed Pakistani vocalist, best known for his command over Qawwali and Bollywood hits like "O Re Piya" and "Afreen Afreen".`,
};

// 🖼️ Create a map of artist names to images
const artistImages = topArtists.reduce((acc, artist) => {
  acc[artist.name] = artist.img;
  return acc;
}, {});

function Home({ setCurrentSong }) {
  const [search, setSearch] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [showBio, setShowBio] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const artistsRowRef = useRef(null);

  const allSongs = [...discover];

  const filterFn = s =>
    (selectedArtist
      ? s.artist.toLowerCase().includes(selectedArtist.toLowerCase())
      : s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.artist.toLowerCase().includes(search.toLowerCase())
    );

  const filteredSongs = allSongs.filter(filterFn);

  // Calculate scroll parameters
  const cardWidth = 152; // 120px min-width + 32px gap
  const visibleCards = Math.floor((artistsRowRef.current?.offsetWidth || 800) / cardWidth);
  const maxScroll = Math.max(0, (topArtists.length - visibleCards) * cardWidth);

  const scrollLeft = () => {
    const newPosition = Math.max(0, scrollPosition - cardWidth * 2);
    setScrollPosition(newPosition);
    if (artistsRowRef.current) {
      artistsRowRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    const newPosition = Math.min(maxScroll, scrollPosition + cardWidth * 2);
    setScrollPosition(newPosition);
    if (artistsRowRef.current) {
      artistsRowRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`home${showBio ? ' bio-open' : ''}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for songs or artists"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button>
          <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2" fill="none" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#fff" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* 🎤 Top Artists */}
      <div className="top-artists-section">
        <h2>Top Artists</h2>
        <div className="top-artists-container">
          <button 
            className="scroll-arrow left" 
            onClick={scrollLeft}
            disabled={scrollPosition <= 0}
          >
            ‹
          </button>
          
          <div className="top-artists-row" ref={artistsRowRef}>
            {topArtists.map((artist, i) => (
              <div
                className={`artist-card${selectedArtist === artist.name ? ' selected' : ''}`}
                key={i}
                onClick={() => {
                  setSelectedArtist(artist.name);
                  setShowBio(true);
                }}
                style={{ cursor: 'pointer' }}
                title={`Show songs by ${artist.name}`}
              >
                <img src={artist.img} alt={artist.name} />
                <span>{artist.name}</span>
              </div>
            ))}
          </div>
          
          <button 
            className="scroll-arrow right" 
            onClick={scrollRight}
            disabled={scrollPosition >= maxScroll}
          >
            ›
          </button>
        </div>
        
        {selectedArtist && (
          <button className="clear-artist" onClick={() => setSelectedArtist('')} style={{ marginTop: 16 }}>
            Clear Filter
          </button>
        )}
      </div>

      {/* 🎵 Discover */}
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

      {/* 💝 Made for You */}
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

      {/* ⏪ Jump Back */}
      {jumpBack.filter(filterFn).length > 0 && (
        <>
          <h1>Jump Back In</h1>
          <div className="row">
            {jumpBack.filter(filterFn).map((s, i) => (
              <SongCard key={i} song={s} setCurrentSong={setCurrentSong} />
            ))}
          </div>
        </>
      )}

      {/* 🧠 Artist Bio Sidebar */}
      {showBio && (
        <div className="artist-bio-sidebar">
          <button className="close-bio" onClick={() => setShowBio(false)}>✖</button>
          {(() => {
            const song = discover.find(s => s.artist.includes(selectedArtist));
            const artistWithBio = selectedArtist;
            const artistImage = artistImages[artistWithBio];
            return (
              <>
                <h2 style={{ marginBottom: 8 }}>{artistWithBio}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {artistImage && (
                    <img
                      src={artistImage}
                      alt={artistWithBio}
                      style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}
                  <h3 style={{ margin: 0 }}>{artistWithBio}</h3>
                </div>
                <p style={{ color: '#ccc', fontSize: 15, marginTop: 12 }}>
                  {artistBios[artistWithBio] || "No bio available."}
                </p>
              </>
            );
          })()}
        </div>
      )}

      {/* ❌ No Results */}
      {filteredSongs.length === 0 && <p>No songs found.</p>}
    </div>
  );
}

export default Home;