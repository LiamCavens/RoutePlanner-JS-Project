import React from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => (
  <div id="navbar">
    <h1 id='navbar-header'>Visit Scotland</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/route-planner">Route Planner</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </div>
);

export default NavBar;
