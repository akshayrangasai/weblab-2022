import React from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

/**
 * The navigation bar is always at the top.
 */
const NavBar = () => {
  return (
    <nav className="NavContainer">
      <div className="NavTitle u-inlineBlock">Taylor Slow</div>
      <div className="navOptions u-inlineBlock">
        <Link to="/Dashboard/" className="NavLink"> Dashboard </Link>
        <Link to="/Playlist/" className="NavLink"> Playlist </Link>
        <Link to="/Sync/" className="NavLink"> Sync </Link>
        <Link to="/Profile/" className="NavLink"> Profile </Link>
        <Link to="/Settings/" className="NavLink"> Settings </Link>
        </div>
    </nav>
  );
};

export default NavBar;


