import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/navbar/navbar';
import JobSection from './componentes/jobsection/jobsection';
import ApplyPage from './componentes/applypage/applypage';
import Footer from './componentes/footer/footer';
import './App.css';

function App() {
  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === 'about' && aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contact' && contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar scrollToSection={scrollToSection} />
                <JobSection aboutUsRef={aboutUsRef} contactUsRef={contactUsRef} />
                <Footer />
              </>
            }
          />
          <Route path="/apply" element={<ApplyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
