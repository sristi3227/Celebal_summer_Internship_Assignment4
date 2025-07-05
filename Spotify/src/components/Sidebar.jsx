import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <br></br>
      <br></br>
      <nav className="menu">
        <Link to="/">🏠 Home</Link>
        <Link to="/search">🔍 Search</Link>
        
      </nav>
    </div>
  );
}
export default Sidebar;
