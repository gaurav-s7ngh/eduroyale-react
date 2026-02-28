import { useState } from 'react';
import '../styles/guild.css';

export default function Guild() {
  const [activeFilter, setActiveFilter] = useState('TOP RATED');

  // MOCK ACADEMIC HOUSE DATA
  const myHouse = {
    name: "THE_LOGIC_GATES",
    level: 42,
    members: "128/150",
    rank: "#4",
    globalElo: "45,210",
    warRecord: "142W - 12L",
    strengths: [
      { sub: "Computer Science", val: 85 },
      { sub: "Physics", val: 60 },
      { sub: "Mathematics", val: 40 }
    ]
  };

  return (
    <div className="page-wrap">
      
      {/* HEADER */}
      <div className="page-header">
        <div className="page-header-left">
          <div className="chip chip-p">🛡️ ACADEMIC HOUSES</div>
          <h1 style={{ color: 'var(--purple)', textShadow: '3px 3px 0 var(--pud)' }}>COMMUNITIES & FACTIONS</h1>
          <p>Join a house, pool your brainpower, and dominate the global academic leaderboards.</p>
        </div>
        <div className="page-header-right">
          <button className="px-btn px-btn-g">➕ FOUND HOUSE</button>
          <button className="px-btn px-btn-o">🔍 SEARCH</button>
        </div>
      </div>

      <div className="guild-layout">
        
        {/* LEFT COLUMN: MY HOUSE */}
        <div className="g-col-left">
          
          <div className="g-panel g-my-guild">
            <div className="g-panel-head">▶ YOUR HOUSE</div>
            <div className="mg-header">
              <div className="mg-icon">⚡</div>
              <div className="mg-info">
                <div className="mg-name">{myHouse.name}</div>
                <div className="mg-tags">
                  <span className="ptag pt-y">LVL {myHouse.level}</span>
                  <span className="ptag pt-b">MEMBERS: {myHouse.members}</span>
                  <span className="ptag" style={{ color: 'var(--green)', borderColor: 'var(--green)' }}>RANK: {myHouse.rank}</span>
                </div>
              </div>
            </div>
            <div className="mg-stats">
              <div className="mg-stat-box">
                <div className="ms-lbl">GLOBAL ELO</div>
                <div className="ms-val" style={{ color: 'var(--yellow)' }}>{myHouse.globalElo}</div>
              </div>
              <div className="mg-stat-box">
                <div className="ms-lbl">WAR RECORD</div>
                <div className="ms-val" style={{ color: 'var(--green)' }}>{myHouse.warRecord}</div>
              </div>
            </div>
            
            {/* HOUSE SUBJECT STRENGTHS (NEW) */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="ms-lbl" style={{ marginBottom: '12px' }}>HOUSE DOMAIN MASTERY</div>
              {myHouse.strengths.map(s => (
                <div key={s.sub} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: '"Press Start 2P", monospace', marginBottom: '4px' }}>
                    <span>{s.sub}</span>
                    <span style={{ color: 'var(--blue)' }}>{s.val}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border)' }}>
                    <div style={{ height: '100%', width: `${s.val}%`, background: 'var(--blue)' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HOUSE WARS */}
          <div className="g-panel g-wars">
            <div className="g-panel-head" style={{ color: 'var(--pink)', borderBottomColor: 'rgba(255,60,172,.3)' }}>
              ⚔ ACTIVE HOUSE WARS
            </div>
            <div className="gw-list">
              <div className="gw-item active-war">
                <div className="gw-badge blink">🔴 LIVE WAR</div>
                <div className="gw-matchup">
                  <span className="gw-t1">LOGIC_GATES</span> <span className="gw-vs">VS</span> <span className="gw-t2">NEWTONS_APPLES</span>
                </div>
                <div className="gw-meta">MIXED DOMAINS • ROUND 3</div>
                <button className="px-btn px-btn-r" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>SPECTATE BATTLE ▶</button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DIRECTORY */}
        <div className="g-col-right">
          <div className="g-panel g-directory">
            <div className="g-panel-head" style={{ color: 'var(--yellow)', borderBottomColor: 'rgba(255,214,10,.3)' }}>🏆 GLOBAL HOUSE RANKINGS</div>
            
            <div className="dir-filters">
              {['TOP RATED', 'MOST ACTIVE', 'OPEN TO JOIN'].map(filter => (
                <button 
                  key={filter} 
                  className={`px-btn px-btn-o ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                  style={activeFilter === filter ? { background: 'rgba(255,255,255,.15)', color: 'var(--white)' } : {}}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="dir-list">
              <div className="dir-row gold">
                <div className="dr-rank" style={{ color: 'var(--yellow)' }}>#1</div>
                <div className="dr-icon">🍎</div>
                <div className="dr-info">
                  <div className="dr-name">NEWTONS_APPLES</div>
                  <div className="dr-desc">Physics & Math Specialists. Invite only.</div>
                </div>
                <div className="dr-stats">
                  <div className="dr-elo">58,900 ELO</div>
                  <div className="dr-mem">150/150</div>
                </div>
                <button className="dr-btn">FULL</button>
              </div>

              <div className="dir-row silver">
                <div className="dr-rank" style={{ color: '#c0c0c0' }}>#2</div>
                <div className="dr-icon">💀</div>
                <div className="dr-info">
                  <div className="dr-name">SEGFAULT_KINGS</div>
                  <div className="dr-desc">C++ enthusiasts. Pointers or die.</div>
                </div>
                <div className="dr-stats">
                  <div className="dr-elo">52,440 ELO</div>
                  <div className="dr-mem">142/150</div>
                </div>
                <button className="dr-btn join" style={{ color: 'var(--green)', borderColor: 'var(--green)' }}>REQ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}