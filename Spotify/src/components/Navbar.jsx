"use client"

import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import "../styles/navbar.css"

function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const MusicIcon = () => (
    <svg viewBox="0 0 24 24">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  )

  const HomeIcon = () => (
    <svg viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  )

  const LibraryIcon = () => (
    <svg viewBox="0 0 24 24">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
    </svg>
  )

  const GenreIcon = () => (
    <svg viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )

  const ProfileIcon = () => (
    <svg viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )

  

 

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <MusicIcon />
          </div>
          BeatSync
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            <HomeIcon />
            Home
          </Link>
          <Link to="/playlist/liked" className={`nav-link ${location.pathname === "/playlist/liked" ? "active" : ""}`}>
            <LibraryIcon />
            Your Playlists
          </Link>
          <Link to="/genre/pop" className={`nav-link ${location.pathname.startsWith("/genre") ? "active" : ""}`}>
            <GenreIcon />
            Genres
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <div className="profile-menu" ref={profileRef}>
          <button className="profile-button" onClick={() => setIsProfileOpen(!isProfileOpen)} aria-label="Profile menu">
            <ProfileIcon />
          </button>

          <div className={`profile-dropdown ${isProfileOpen ? "open" : ""}`}>
            <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
              <ProfileIcon />
              Profile
            </Link>
            
            
           
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
