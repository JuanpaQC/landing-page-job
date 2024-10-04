import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../../css/jobsection.css';
import instaladorImg from '../../imgs/instalador.jpg';

const JobSection = ({ aboutUsRef, contactUsRef }) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const jobDetailsRef = useRef(null);
  const navigate = useNavigate(); // Hook para la navegación

  // Función para hacer scroll a los detalles del trabajo
  const handleMoreInfoClick = () => {
    if (jobDetailsRef.current) {
      jobDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Función para expandir los detalles del trabajo
  const handleReadMoreClick = () => {
    setIsDetailsExpanded(true);
  };

  // Función para redirigir a la página de aplicación
  const handleApplyClick = () => {
    navigate('/apply'); // Redirigir a la página de aplicación en la misma pestaña
  };

  return (
    <section className="job-section">
      <div className="job-banner">
        <img src={instaladorImg} alt="Fiber Optic Job" />
        <div className="job-banner-text">
          <h2>We are hiring Fiber Optic Installers</h2>
          <p>Join our team and be part of our commitment to delivering the highest quality fiber optic solutions.</p>
          <button className="more-information-button" onClick={handleMoreInfoClick}>
            More Information Below ↓↓↓
          </button>
        </div>
      </div>

      <div className="job-details" ref={jobDetailsRef}>
        <h3>Fiber Optic Installer</h3>
        <p>Full-time, San Francisco, California</p>
        <p>Posted 2 days ago</p>
        <p>
          We are seeking a skilled and experienced Fiber Optic Installer to join our team...
        </p>
        {!isDetailsExpanded ? (
          <button className="read-more-button" onClick={handleReadMoreClick}>
            Read More
          </button>
        ) : (
          <>
            <p>
              As a Fiber Optic Installer, you will install, test, and maintain fiber optic systems...
            </p>
            <ul>
              <li>Experience with fiber optic installation</li>
              <li>Knowledge of safety protocols</li>
              <li>Ability to work in different environments</li>
            </ul>
            <button className="apply-button" onClick={handleApplyClick}>
              Apply Now
            </button>
          </>
        )}
      </div>

      {/* Sección About Us y Contact Us */}
      <div className="about-contact-section">
        <div className="about-us" ref={aboutUsRef}>
          <h3>About Us</h3>
          <p>We are a leading company in fiber optic solutions...</p>
        </div>
        <div className="contact-us" ref={contactUsRef}>
          <h3>Contact Us</h3>
          <p>If you're interested in joining our team or have any questions, feel free to reach out...</p>
          <p>Email: corpkunlimited@gmail.com</p>
          <p>Phone: +1 123 456 7890</p>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
