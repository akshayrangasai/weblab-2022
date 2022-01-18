import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound";
import Skeleton from "./pages/Skeleton";
import LinkAccount from "./pages/LinkAccount";
import LinkSpotify from "./pages/LinkSpotify";
import LinkApple from "./pages/LinkApple";
import NavBar from "./modules/NavBar";
//import Dashboard from "./pages/Dashboard";
//import Profile from "./pages/Profile.js"; //Temporarily Unavailable
//import Settings from "./pages/Settings.js"; //Temporarily Unavailable
//import Sync from "./pages/Sync.js"; //Temporarily Unavailable
//import Welcome from "./pages/Welcome.js"; //Might be replaced with Skeleton

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
    <NavBar />
    <div className="App-container">
      <Router>
        <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <Welcome path="/Welcome" />
        <LinkAccount path="/LinkAccount" />
        <LinkSpotify path="/LinkSpotify" />
        <LinkApple path="/LinkApple" />
        <Dashboard path="/Dashboard" />
        <Profile path="/Profile" />
        <Settings path="/Settings" />
        <Sync path="/ Sync" />
        <NotFound default />
      </Router>
      </div>
    </>
  );
};

export default App;
