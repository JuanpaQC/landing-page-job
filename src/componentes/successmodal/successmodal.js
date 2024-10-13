import React from 'react';
import { motion } from 'framer-motion';
import '../../css/successmodal.css'; // Asegúrate de crear este archivo CSS

const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2>Email Sent Successfully!</h2>
        <p>Your application has been submitted. We will get back to you shortly.</p>
        <button onClick={onClose} className="close-button">Close</button>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
