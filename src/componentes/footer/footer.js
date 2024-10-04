import React from 'react';
import '../../css/footer.css'; // Asegúrate de importar el archivo CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-dev">Developed by: Juanpa Quesada Caballero</p>
        <div className="footer-social">
          <a href="https://www.facebook.com" className="social-link facebook-link">Facebook</a>
          <a href="https://www.instagram.com" class="social-link instagram-link">Instagram</a>
        </div>
        <p className="footer-rights">© 2024 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
