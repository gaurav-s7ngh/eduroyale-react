import { useState, useEffect } from 'react';

export default function AuthModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');

  // Close the modal if the user presses the Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null; // Don't render anything if it's closed

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUser = username.trim().toUpperCase();
    
    if (cleanUser) {
      // Save to local storage
      localStorage.setItem('vdsa_user', cleanUser);
      
      // Dispatch a custom event so the Navbar knows to update
      window.dispatchEvent(new Event('authChange')); 
      
      // Trigger your custom pixel click sparks!
      for (let i = 0; i < 5; i++) document.body.click(); 
      
      setUsername('');
      onClose();
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose} type="button">X</button>
        <h2 style={{ color: 'var(--green)', marginBottom: '16px', fontFamily: '"Press Start 2P", monospace', fontSize: '12px' }}>
          ▶ TERMINAL ACCESS
        </h2>
        
        <div className="auth-tabs">
          <button 
            type="button"
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} 
            onClick={() => setActiveTab('login')}
          >
            LOGIN
          </button>
          <button 
            type="button"
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`} 
            onClick={() => setActiveTab('register')}
          >
            SIGNUP
          </button>
        </div>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="auth-input" 
            placeholder="USERNAME" 
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            className="auth-input" 
            placeholder="PASSWORD" 
          />
          <button type="submit" className="px-btn px-btn-g" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            {activeTab === 'login' ? 'INITIALIZE ▶' : 'REGISTER ▶'}
          </button>
        </form>
      </div>
    </div>
  );
}