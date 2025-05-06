import "./Header.css";
import { Link } from "react-router-dom";
import { Switch } from '@mui/material';

function Header({ onToggleTheme }) {

  return (
    <header className="app-header">
      <div className="logo">Loan Calculator</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/exchange">Exchange Rates (Live)</Link>
        <Link to="/error">ErrorPage</Link>
        <Switch onChange={onToggleTheme} />
      </nav>
    </header>
  );
}

export default Header;
