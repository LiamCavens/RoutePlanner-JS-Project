import React, { Component } from 'react';
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
  <h1>Visit Scotland</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/routes">Route Planner</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;