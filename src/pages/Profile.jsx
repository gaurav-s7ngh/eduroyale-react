import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  const [currentUser, setCurrentUser] = useState('GUEST_USER');

  // ─── MOCK MULTI-SUBJECT DATA ───
  const mockUser = {
    globalElo: 1450,
    archetype: "The Speed Solver",
    battles: 142,
    wins: 89,
    winRate: "62.6%",
    subjects: {
      cs: { label: "Comp Sci", elo: 1600 },
      math: { label: "Math", elo: 1350 },
      physics: { label: "Physics", elo: 1450 },
      chemistry: { label: "Chemistry", elo: 1100 },
      stats: { label: "Statistics", elo: 1250 }
    },
    history: [
      { res: 'VICTORY', sub: 'Physics', detail: 'Kinematics', time: '0.8s', elo: '+24' },
      { res: 'DEFEAT', sub: 'Math', detail: 'Calculus', time: 'TIME UP', elo: '-18' },
      { res: 'VICTORY', sub: 'Comp Sci', detail: 'Binary Search', time: '1.2s', elo: '+15' },
    ]
  };

  useEffect(() => {
    const user = localStorage.getItem('vdsa_user');
    if (user) setCurrentUser(user);
    else navigate('/'); // Boot logged-out users to home

    // ─── DYNAMIC RADAR CHART RENDERER ───
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width; 
    const ch = canvas.height;
    const cx = cw / 2; 
    const cy = ch / 2;
    const maxRadius = Math.min(cx, cy) - 30;

    ctx.clearRect(0, 0, cw, ch);
    const subjects = Object.values(mockUser.subjects);
    const numPoints = subjects.length;

    // Draw background spider web
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    for (let level = 1; level <= 5; level++) {
      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
        const r = maxRadius * (level / 5);
        ctx[i === 0 ? 'moveTo' : 'lineTo'](cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw Player Data Polygon
    ctx.beginPath();
    ctx.fillStyle = 'rgba(61, 255, 154, 0.4)';
    ctx.strokeStyle = '#3dff9a';
    ctx.lineWidth = 2;

    subjects.forEach((sub, i) => {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      // Map ELO (e.g., 800 to 2000) to a 0.1 - 1.0 radius multiplier
      const normalized = Math.max(0.1, Math.min(1, (sub.elo - 800) / 1200));
      const r = maxRadius * normalized;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      
      ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);

      // Draw Labels
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '10px "VT323", monospace';
      ctx.fillText(sub.label, cx + Math.cos(angle) * (maxRadius + 15) - 20, cy + Math.sin(angle) * (maxRadius + 15));
    });
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('vdsa_user');
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <div className="page-wrap">
      <div className="profile-layout">
        
        {/* LEFT: ID CARD */}
        <div className="p-col-left">
          <div className="id-card">
            <div className="id-avatar">🤖</div>
            <h1 className="id-name">{currentUser}</h1>
            <div className="id-title" style={{ color: 'var(--blue)' }}>{mockUser.archetype}</div>
            
            <div className="id-tags">
              <span className="chip chip-y">LEVEL 42</span>
              <span className="chip chip-p">STEM SLAYER</span>
            </div>
            
            <div className="id-guild">
              <div className="idg-lbl">ACADEMIC HOUSE</div>
              <div className="idg-val">🛡️ THE_LOGIC_GATES</div>
            </div>

            <button onClick={handleLogout} className="px-btn px-btn-r" style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
              LOGOUT [X]
            </button>
          </div>
        </div>

        {/* RIGHT: STATS & RADAR */}
        <div className="p-col-right">
          
          {/* STATS GRID */}
          <div className="p-panel">
            <div className="p-panel-head" style={{ color: 'var(--yellow)', borderBottomColor: 'rgba(255,214,10,.3)' }}>
              📊 ACADEMIC COMBAT RECORD
            </div>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="sb-lbl">GLOBAL ELO</div>
                <div className="sb-val" style={{ color: 'var(--yellow)' }}>{mockUser.globalElo}</div>
              </div>
              <div className="stat-box">
                <div className="sb-lbl">BATTLES</div>
                <div className="sb-val" style={{ color: 'var(--white)' }}>{mockUser.battles}</div>
              </div>
              <div className="stat-box">
                <div className="sb-lbl">WINS</div>
                <div className="sb-val" style={{ color: 'var(--green)' }}>{mockUser.wins}</div>
              </div>
              <div className="stat-box">
                <div className="sb-lbl">WIN RATE</div>
                <div className="sb-val" style={{ color: 'var(--blue)' }}>{mockUser.winRate}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* RADAR CHART */}
            <div className="p-panel">
              <div className="p-panel-head" style={{ color: 'var(--pink)' }}>🕸️ DOMAIN MASTERY RADAR</div>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <canvas ref={canvasRef} width="250" height="250" style={{ imageRendering: 'pixelated' }}></canvas>
              </div>
            </div>

            {/* KNOWLEDGE TREE */}
            <div className="p-panel">
              <div className="p-panel-head" style={{ color: 'var(--purple)' }}>🌳 KNOWLEDGE TREE</div>
              <div style={{ padding: '16px', fontFamily: '"VT323", monospace', fontSize: '18px' }}>
                <ul style={{ listStyle: 'none', paddingLeft: '10px', borderLeft: '2px dashed var(--border)' }}>
                  <li style={{ marginBottom: '10px' }}>
                    <span style={{ color: 'var(--green)', textShadow: '0 0 5px var(--green)' }}>[MAX] Physics</span>
                    <ul style={{ paddingLeft: '20px', color: 'var(--muted)', marginTop: '4px' }}>
                      <li>↳ Kinematics (100%)</li>
                      <li>↳ Thermodynamics (100%)</li>
                    </ul>
                  </li>
                  <li>
                    <span style={{ color: 'var(--yellow)' }}>[ACTIVE] Mathematics</span>
                    <ul style={{ paddingLeft: '20px', color: 'var(--muted)', marginTop: '4px' }}>
                      <li style={{ color: 'var(--white)' }}>↳ Calculus (45%)</li>
                      <li>↳ Linear Algebra (12%)</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RECENT MATCHES */}
          <div className="p-panel">
            <div className="p-panel-head" style={{ color: 'var(--green)', borderBottomColor: 'rgba(61,255,154,.3)' }}>
              ⏱ RECENT BATTLES
            </div>
            <div className="history-list">
              {mockUser.history.map((h, i) => (
                <div key={i} className={`hist-row ${h.res === 'VICTORY' ? 'win' : 'loss'}`}>
                  <div className="hr-res">{h.res}</div>
                  <div className="hr-algo">{h.detail} <span>({h.sub})</span></div>
                  <div className="hr-time">{h.time}</div>
                  <div className="hr-elo">{h.elo} ELO</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}