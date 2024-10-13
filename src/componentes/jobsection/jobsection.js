import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../../css/jobsection.css';
import instaladorImg from '../../imgs/instalador.jpg';

const JobSection = ({ aboutUsRef, contactUsRef }) => {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const jobDetailsRef = useRef(null);
  const navigate = useNavigate(); // Hook para la navegación


  const [daysAgo, setDaysAgo] = useState(0);

  // Calcular los días desde la fecha de publicación
  useEffect(() => {
    const jobPostedDate = new Date('2024-10-13'); // Mover la declaración aquí
    const currentDate = new Date();
    const timeDifference = currentDate - jobPostedDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    setDaysAgo(daysDifference);
  }, []); // El array de dependencias puede estar vacío si no cambian las fechas
  
  

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
        <p>Full-Time available only in the states of Connecticut, Pennsylvania, New York, Florida and Texas.</p>
        <p>Posted {daysAgo} days ago</p> {/* Mostrar los días desde que fue publicado */}
        <p>
          We are seeking a Fiber Optic Installer to join our team......
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
              <li>Driver License.</li>
              <li>Vehicle is preferred (van, suv truck).</li>
              <li>Employment for people with or without experience.</li>
              <li>Have your own worker compensation.</li>
              <li>Availability to travel between states and cities.</li>
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
          <p>K Unlimited Corp is a trusted partner of Frontier Communications, specializing in the installation and maintenance of fiber optic networks. Operating in Connecticut, Pennsylvania, New York, Florida, and Texas, we provide reliable, high-speed connectivity for homes and businesses, ensuring seamless communication and growth. Our team is committed to delivering excellence, building networks that keep communities connected and moving forward.</p>
        </div>
        <div className="contact-us" ref={contactUsRef}>
          <h3>Contact Us</h3>
          <p>If you're interested in joining our team or have any questions, feel free to reach out...</p>
          <p>Email: corpkunlimited@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
