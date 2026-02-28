import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar({ onOpenAuth, onToggleAI }) {
  const location = useLocation();
  const [user, setUser] = useState(localStorage.getItem('vdsa_user'));

  useEffect(() => {
    const handleAuthChange = () => {
      setUser(localStorage.getItem('vdsa_user'));
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  return (
    <nav id="nav">
      <Link to="/" className="nav-logo">▶ EduRoyale</Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>[HOME]</Link>
        </li>
        <li>
          <Link to="/battle" className={`battle-link ${location.pathname === '/battle' ? 'active' : ''}`}>[⚔ BATTLE]</Link>
        </li>
        <li>
          <Link to="/learn" className={`learn-link ${location.pathname === '/learn' ? 'active' : ''}`}>[📖 LEARN]</Link>
        </li>
        <li>
          <Link to="/guild" className={`guild-link ${location.pathname === '/guild' ? 'active' : ''}`}>[🛡️ GUILD]</Link>
        </li>
        {/* ── NEW AI BUTTON ── */}
        <li>
          <button onClick={onToggleAI} className="font-pixel text-[10px] text-retroBlue hover:text-white transition-colors">
            [🤖 AI_CORE]
          </button>
        </li>
      </ul>
      <div className="nav-cta">
        {user ? (
          <Link to="/profile" className="px-btn px-btn-o" style={{ color: 'var(--color-retroGreen)', borderColor: 'var(--color-retroGreen)' }}>
            [ {user} ]
          </Link>
        ) : (
          <button onClick={onOpenAuth} className="px-btn px-btn-o">LOGIN</button>
        )}
        <Link to="/battle" className="px-btn px-btn-g">⚔ FIND MATCH</Link>
      </div>
    </nav>
  );
}