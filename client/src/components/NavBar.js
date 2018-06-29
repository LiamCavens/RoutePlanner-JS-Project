import React, { Component } from 'react';
import { Link } from "react-router-dom";

const NavBar = () => (
    <ul>
        <li>
            <Link to='/'>Home</Link>
        </li>
        <li>
            <Link to='/about'>About</Link>
        </li>
        <li>
            <Link to='/routes'>Route Planner</Link>
        </li>
    </ul>
);

export default NavBar;