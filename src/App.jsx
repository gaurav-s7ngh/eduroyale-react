import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import GlobalAIBot from './components/GlobalAIBot'; // <-- IMPORT THIS

import Home from './pages/Home';
import ProfilePage from './components/profile/ProfilePage';
import GuildPage from './components/guild/GuildPage';
import Battle from './pages/Battle';
import Learn from './pages/Learn';

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false); // <-- ADD AI STATE

  return (
    <BrowserRouter>
      {/* Global UI */}
      <CustomCursor />
      
      {/* Pass the toggle function to the Navbar */}
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} onToggleAI={() => setIsAIOpen(prev => !prev)} />
      
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      {/* Global AI Component overlay */}
      <GlobalAIBot isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      
      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/guild" element={<GuildPage />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  );
}