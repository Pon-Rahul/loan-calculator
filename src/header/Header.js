import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    console.log("Slider toggled:", !toggle); // You can later connect this to theme
  };

  return (
    <header className="app-header">
      <div className="logo">Loan Calculator</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/exchange">Exchange Rates (Live)</Link>
        <Link to="/about">About</Link>
        <div className="slider-container">
          <label className="switch">
            <input type="checkbox" onChange={handleToggle} />
            <span className="slider round"></span>
          </label>
        </div>
      </nav>
    </header>
  );
}

export default Header;
