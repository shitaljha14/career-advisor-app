import { useState } from "react";
import { Link } from "react-router-dom";
import "/Users/shitalkumari/career-recommendation-system/client/src/styles/MiniNavbar.css";

const MiniNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mini-navbar">
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <div className="menu-dropdown">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/career-matcher" onClick={() => setOpen(false)}>Career Matcher</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </div>
  );
};

export default MiniNavbar;
