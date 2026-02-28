import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';

// Temporary placeholders for the pages we will build next
const Home = () => <div style={{ padding: '120px 48px', textAlign: 'center' }}><h1>HOME PAGE</h1></div>;
const Profile = () => <div style={{ padding: '120px 48px', textAlign: 'center' }}><h1>PROFILE PAGE</h1></div>;
const Guild = () => <div style={{ padding: '120px 48px', textAlign: 'center' }}><h1>GUILD PAGE</h1></div>;
const Battle = () => <div style={{ padding: '120px 48px', textAlign: 'center' }}><h1>BATTLE ARENA</h1></div>;
const Learn = () => <div style={{ padding: '120px 48px', textAlign: 'center' }}><h1>LEARN MODE</h1></div>;

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Global UI */}
      <CustomCursor />
      <Navbar onOpenAuth={() => setIsAuthOpen(true)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/guild" element={<Guild />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  );
}