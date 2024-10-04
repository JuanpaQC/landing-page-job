import React from 'react';
import '../../css/navbar.css';

const Navbar = ({ scrollToSection }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Fiber Optics</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
        <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
