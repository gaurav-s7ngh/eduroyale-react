import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';

// IMPORT YOUR ACTUAL PAGES HERE:
import Home from './pages/Home';

// Keep placeholders for the ones we haven't built yet
import ProfilePage from './components/profile/ProfilePage';
import GuildPage from './components/guild/GuildPage';
  import Battle from './pages/Battle';
import Learn from './pages/Learn';

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
<Route path="/profile" element={<ProfilePage />} />
<Route path="/guild" element={<GuildPage />} />        <Route path="/battle" element={<Battle />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  );
}