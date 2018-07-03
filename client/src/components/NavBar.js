import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => (
  <div id="navbar">
    <h1>Visit Scotland</h1>
    <ul id="nav-bar-list">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li id='route-link'>
        <Link to="/route-planner">Route Planner</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </div>
);

export default NavBar;
