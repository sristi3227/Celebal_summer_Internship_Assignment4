"use client"
import { useEffect, useState } from "react"
import "../styles/profile.css"
import { loadPlaylistsFromStorage } from "../utils/localStorage"

const PROFILE_STORAGE_KEY = "user_profile_data"

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    joinedDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    }),
    preferences: {
      theme: "dark",
      notifications: true,
      autoPlay: true,
    },
  })
  const [editing, setEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Add state for playlist count
  const [playlistCount, setPlaylistCount] = useState(0)

  // Load profile from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile)
        setProfile((prev) => ({ ...prev, ...parsedProfile }))
      } catch (error) {
        console.error("Error parsing stored profile:", error)
      }
    }
  }, [])

  // Load and track playlist count
  useEffect(() => {
    // Initial load of playlist count
    const updatePlaylistCount = () => {
      const playlists = loadPlaylistsFromStorage()
      setPlaylistCount(playlists.length)
    }

    // Load initial count
    updatePlaylistCount()

    // Listen for playlist updates from other components
    const handlePlaylistUpdate = (event) => {
      if (event.detail && Array.isArray(event.detail)) {
        setPlaylistCount(event.detail.length)
      } else {
        // Fallback: reload from storage
        updatePlaylistCount()
      }
    }

    // Add event listener for real-time updates
    window.addEventListener("playlistsUpdated", handlePlaylistUpdate)

    // Also check for updates periodically (fallback)
    const interval = setInterval(updatePlaylistCount, 2000)

    // Cleanup
    return () => {
      window.removeEventListener("playlistsUpdated", handlePlaylistUpdate)
      clearInterval(interval)
    }
  }, [])

  // Save to localStorage whenever profile changes (if not editing)
  useEffect(() => {
    if (!editing && profile.name) {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    }
  }, [profile, editing])

  const validateForm = () => {
    const newErrors = {}
    if (!profile.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!profile.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Email is invalid"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handlePreferenceChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value },
    }))
  }

  const handleSave = async () => {
    if (!validateForm()) return
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setEditing(false)
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    setIsLoading(false)
  }

  const handleCancel = () => {
    setEditing(false)
    setErrors({})
    // Reload from localStorage to reset changes
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    }
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, avatar: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // SVG Icons
  const UserIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )

  const SettingsIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
    </svg>
  )

  const EditIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  )

  const CameraIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 15.2l3.536-3.536 1.414 1.414L12 17.828 7.05 12.878l1.414-1.414L12 15.2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
    </svg>
  )

  const SaveIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" />
    </svg>
  )

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-hero">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={profile.avatar || "/placeholder.svg?height=120&width=120"} alt={profile.name || "User"} />
              {editing && (
                <label className="avatar-upload-btn" title="Change Avatar">
                  <CameraIcon />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                </label>
              )}
            </div>
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profile.name || "Welcome!"}</h1>
            <p className="profile-email">{profile.email || "No email set"}</p>
            <p className="profile-joined">Member since {profile.joinedDate}</p>
            {!editing && (
              <button className="edit-profile-btn" onClick={() => setEditing(true)}>
                <EditIcon />
                Edit Profile
              </button>
            )}
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{playlistCount}</span>
              <span className="stat-label">Playlists</span>
            </div>
            
            
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button className={`tab ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
          <UserIcon />
          Profile
        </button>
        <button
          className={`tab ${activeTab === "preferences" ? "active" : ""}`}
          onClick={() => setActiveTab("preferences")}
        >
          <SettingsIcon />
          Preferences
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {activeTab === "profile" && (
          <div className="profile-form-section">
            <div className="form-card">
              <h2>Personal Information</h2>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                {editing ? (
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>
                ) : (
                  <div className="display-value">{profile.name || "Not set"}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                {editing ? (
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                ) : (
                  <div className="display-value">{profile.email || "Not set"}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                {editing ? (
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="display-value bio">{profile.bio || "No bio yet"}</div>
                )}
              </div>
              {editing && (
                <div className="form-actions">
                  <button className="save-btn" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div className="spinner"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <SaveIcon />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === "preferences" && (
          <div className="preferences-section">
            <div className="form-card">
              <h2>App Preferences</h2>
              <div className="preference-group">
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Notifications</h3>
                    <p>Receive notifications about new music and updates</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={profile.preferences.notifications}
                      onChange={(e) => handlePreferenceChange("notifications", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Auto Play</h3>
                    <p>Automatically play next song when current song ends</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={profile.preferences.autoPlay}
                      onChange={(e) => handlePreferenceChange("autoPlay", e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
        <br></br><br></br><br></br>
    </div>
  )
}

export default Profile
