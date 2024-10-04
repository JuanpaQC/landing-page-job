import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import emailjs from 'emailjs-com'; // Importa EmailJS
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import '../../css/applypage.css';
import data from '../../api/citieStatus.json'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

const ApplyPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    city: '',
    resume: null,
    message: ''
  });

  const [fileName, setFileName] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setStates(data.states.map(state => state.name));
  }, []);

  const handleLocationChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, location: selectedState });
    const foundState = data.states.find(state => state.name === selectedState);
    if (foundState) {
      setCities(foundState.cities);
    } else {
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume' && files.length > 0) {
      setFileName(files[0].name);
    }
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  // Función para enviar el formulario con EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar el formulario con EmailJS
    emailjs.sendForm(
      'service_cvkng8n', // Reemplaza con tu ID de servicio
      'template_n5rtyf8', // Reemplaza con tu ID de plantilla
      e.target, // Captura todos los datos del formulario
      'AWSFz6vhdOnTbxIpj' // Reemplaza con tu ID de usuario de EmailJS
    ).then((result) => {
      console.log(result.text);
      alert("Form sent successfully");
    }, (error) => {
      console.log(error.text);
      alert("There was an error sending the form");
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    setFormData({
      ...formData,
      resume: file,
    });
  }, [formData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf, .doc, .docx',
    multiple: false
  });

  return (
    <motion.div className="fade-in">
      <Navbar />
      <div className="apply-container">
        <motion.h1 className="fade-in">
          Join the team
        </motion.h1>
        <motion.p className="fade-in">
          We're always looking for talented people to join us. If you're interested in a career at Fiber Optics, we'd love to hear from you.
        </motion.p>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="apply-form fade-in"
        >
          <motion.input 
            type="text" 
            name="firstName" 
            placeholder="First name*" 
            value={formData.firstName} 
            onChange={handleChange} 
            required
          />
          <motion.input 
            type="text" 
            name="lastName" 
            placeholder="Last name*" 
            value={formData.lastName} 
            onChange={handleChange} 
            required
          />
          <motion.input 
            type="email" 
            name="email" 
            placeholder="Email address*" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
          <motion.input 
            type="tel" 
            name="phone" 
            placeholder="Phone number*" 
            value={formData.phone} 
            onChange={handleChange} 
            required
          />
          <motion.select 
            name="location" 
            value={formData.location} 
            onChange={handleLocationChange} 
            required
          >
            <option value="" disabled>State*</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </motion.select>
          
          <motion.select 
            name="city" 
            value={formData.city} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>City*</option>
            {cities.length > 0 ? (
              cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))
            ) : (
              <option value="">Select a state first</option>
            )}
          </motion.select>

          <motion.textarea 
            name="message" 
            placeholder="Tell us why you'd like to work here*" 
            value={formData.message} 
            onChange={handleChange} 
            required
          />

          <div className='upload-text'>
            <label>Upload your resume*</label>
          </div>
          <motion.div 
            {...getRootProps({ className: 'dropzone' })} 
            className={`file-upload-wrapper fade-in ${isDragActive ? 'active-dropzone' : ''}`}
          >
            <input {...getInputProps()} name="resume" />
            <div className="upload-icon">
              <FontAwesomeIcon icon={faCloudUploadAlt} size="1x" color="#007bff" />
            </div>
            <p className="drop-text">{isDragActive ? 'Drop the file here...' : 'Drag & Drop your resume here, or click to browse'}</p>
            <p className="file-name">{fileName && `Selected file: ${fileName}`}</p>
          </motion.div>

          <motion.div className="consent-checkbox fade-in">
            <input type="checkbox" id="consent" name="consent" required />
            <label htmlFor="consent">I consent to having this website store my submitted information so they can respond to my inquiry.</label>
          </motion.div>
          
          <motion.button 
            type="submit" 
            className="submit-button fade-in"
          >
            Submit application
          </motion.button>
        </motion.form>
      </div>
      <Footer />
    </motion.div>
  );
};

export default ApplyPage;
