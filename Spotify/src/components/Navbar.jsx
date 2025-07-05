import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">🎵 BeatSync</h2>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/playlist/liked">📚 Your Library</Link>
        <Link to="/genre/pop">Genres</Link>
      </div>
    </nav>
  );
}

export default Navbar;
