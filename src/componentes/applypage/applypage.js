import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import SuccessModal from '../successmodal/successmodal'; // Importa el modal
import '../../css/applypage.css';
import data from '../../api/citieStatus.json'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

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
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

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

  const handleFileRemove = (e) => {
    e.stopPropagation();
    setFileName('');
    setFormData({
      ...formData,
      resume: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = {
      ...formData,
      fileName: fileName,
      resume: await toBase64(formData.resume),
    };
  
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
  
      if (response.ok) {
        setShowModal(true); // Mostrar el modal si se envía con éxito
      } else {
        alert("There was an error sending the form");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("There was an error sending the form");
    }
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

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
            style={{ position: 'relative' }}
          >
            <input {...getInputProps()} name="resume" />
            <div className="upload-icon">
              <FontAwesomeIcon icon={faCloudUploadAlt} size="1x" color="#007bff" />
            </div>
            <p className="drop-text">{isDragActive ? 'Drop the file here...' : 'Drag & Drop your resume here, or click to browse'}</p>
            <p className="file-name">{fileName && `Selected file: ${fileName}`}</p>
            {fileName && (
              <button 
                type="button" 
                className="remove-file-button" 
                onClick={handleFileRemove}
                style={{ 
                  position: 'absolute', 
                  top: '5px', 
                  right: '5px', 
                  background: 'red', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '50%', 
                  cursor: 'pointer',
                  width: '25px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
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
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </motion.div>
  );
};

export default ApplyPage;
