import { Link } from "react-router-dom"

function AlbumLink({ artist, children, className = "" }) {
  // Create URL-safe artist name
  const artistSlug = encodeURIComponent(artist)

  return (
    <Link to={`/album/${artistSlug}`} className={className} title={`View ${artist} album`}>
      {children}
    </Link>
  )
}

export default AlbumLink
