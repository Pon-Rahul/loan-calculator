import "./Header.css";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

function Header({ onToggleTheme }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { text: "Home", to: "/" },
    { text: "Exchange Rates (Live)", to: "/exchange" },
    { text: "About", to: "/about" },
    { text: "Error Page", to: "/error" }
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>
          <Switch onChange={onToggleTheme} />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {navLinks.map(({ text, to }) => (
            <ListItem button component={Link} to={to} key={text} onClick={toggleDrawer(false)}>
              <ListItemText primary={text} primaryTypographyProps={{ style: { color: 'black' } }}/>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Header;
