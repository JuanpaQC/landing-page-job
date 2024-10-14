import React from 'react';
import '../../css/navbar.css';
import frontier_logo from '../../imgs/frontier-logo.png';
import k_unlimited_logo from '../../imgs/Whitlogo-removebg-preview.png';

const Navbar = ({ scrollToSection }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={k_unlimited_logo} alt="K Unlimited Logo" className="logo logo-small" />
        <img src={frontier_logo} alt="Frontier Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
        <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
