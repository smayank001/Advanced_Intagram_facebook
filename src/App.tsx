import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Facebook from './pages/Facebook';
import Instagram from './pages/Instagram';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/facebook/*" element={<Facebook />} />
          <Route path="/instagram/*" element={<Instagram />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;