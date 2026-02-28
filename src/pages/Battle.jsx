import { useState, useEffect } from 'react';
import '../styles/battle.css';

export default function Battle() {
  const [battleState, setBattleState] = useState('idle'); // idle | search | vs | countdown | live
  const [countdownText, setCountdownText] = useState('');
  const [hp, setHp] = useState({ p1: 100, p2: 100 });
  const [code, setCode] = useState('def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        # Your code here...');
  
  const currentUser = localStorage.getItem('vdsa_user') || 'GUEST_USER';

  // ─── MATCHMAKING SEQUENCE ───
  const startMatchmaking = () => {
    setBattleState('search');
    setTimeout(() => {
      setBattleState('vs');
      setTimeout(() => {
        setBattleState('countdown'); // Jump to the new countdown state!
      }, 3000); 
    }, 2500); 
  };

  // ─── 3-2-1 FIGHT! LOGIC ───
  useEffect(() => {
    if (battleState === 'countdown') {
      let count = 3;
      setCountdownText(count.toString());
      
      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          setCountdownText(count.toString());
        } else if (count === 0) {
          setCountdownText('FIGHT!');
        } else {
          clearInterval(interval);
          setBattleState('live'); // Start the actual battle!
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [battleState]);

  // Fake HP Drain for the live battle
  useEffect(() => {
    let timer;
    if (battleState === 'live') {
      timer = setInterval(() => {
        setHp((prev) => ({
          p1: Math.max(0, prev.p1 - (Math.random() * 4)),
          p2: Math.max(0, prev.p2 - (Math.random() * 6))
        }));
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [battleState]);

  return (
    <div className="page-wrap">
      <div className="page-header" style={{ marginBottom: '32px' }}>
        <div className="chip chip-r">⚔ RANKED ARENA</div>
        <h1 style={{ color: 'var(--pink)', textShadow: '3px 3px 0 var(--pd)', marginTop: '12px' }}>GLOBAL MATCHMAKING</h1>
      </div>

      <div className="b-arena">
        
        {battleState === 'idle' && (
          <div className="b-state-idle" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '24px', color: 'var(--white)', marginBottom: '16px' }}>READY TO ENTER THE ARENA?</div>
            <p style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '40px' }}>You will be matched against an opponent of similar ELO. First to solve wins.</p>
            <button onClick={startMatchmaking} className="px-btn px-btn-r" style={{ fontSize: '16px', padding: '16px 32px' }}>FIND MATCH ▶</button>
          </div>
        )}

        {battleState === 'search' && (
          <div className="b-state-search" style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div className="radar" style={{ margin: '0 auto 30px' }}><div className="sweep"></div></div>
            <div className="srch-text blink" style={{ fontFamily: '"Press Start 2P", monospace', color: 'var(--pink)' }}>SEARCHING QUEUE...</div>
          </div>
        )}

        {battleState === 'vs' && (
          <div className="b-state-vs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', padding: '60px 0' }}>
            <div className="b-char p1-side" style={{ textAlign: 'center' }}>
              <div className="bc-av" style={{ fontSize: '64px', marginBottom: '16px', border: '4px solid var(--green)', padding: '20px', background: 'rgba(61,255,154,0.1)' }}>🤖</div>
              <div className="bc-name" style={{ fontFamily: '"Press Start 2P", monospace', color: 'var(--green)', fontSize: '14px', marginBottom: '8px' }}>{currentUser}</div>
            </div>
            <div className="vs-badge" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '32px', color: 'var(--yellow)', textShadow: '4px 4px 0 var(--yd)' }}>VS</div>
            <div className="b-char p2-side" style={{ textAlign: 'center' }}>
              <div className="bc-av" style={{ fontSize: '64px', marginBottom: '16px', border: '4px solid var(--pink)', padding: '20px', background: 'rgba(255,60,172,0.1)' }}>💀</div>
              <div className="bc-name" style={{ fontFamily: '"Press Start 2P", monospace', color: 'var(--pink)', fontSize: '14px', marginBottom: '8px' }}>NULL_POINTER</div>
            </div>
          </div>
        )}

        {/* ─── NEW: 3-2-1 COUNTDOWN STATE ─── */}
        {battleState === 'countdown' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <div style={{ 
              fontFamily: '"Press Start 2P", monospace', 
              fontSize: countdownText === 'FIGHT!' ? '72px' : '120px', 
              color: countdownText === 'FIGHT!' ? 'var(--pink)' : 'var(--yellow)',
              textShadow: `8px 8px 0 ${countdownText === 'FIGHT!' ? 'var(--pd)' : 'var(--yd)'}`,
              animation: 'bounce 0.5s infinite alternate'
            }}>
              {countdownText}
            </div>
          </div>
        )}

        {battleState === 'live' && (
          <div className="b-state-live">
            <div className="live-header" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="chip chip-y">▶ BINARY SEARCH</span>
                <span style={{ color: 'var(--muted)', fontSize: '18px' }}>Find target in O(log n) time.</span>
              </div>
              <div style={{ color: 'var(--yellow)', fontFamily: '"Press Start 2P", monospace', fontSize: '12px', animation: 'val-flash 1s infinite' }}>⏱ 05:00</div>
            </div>

            <div className="live-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* PLAYER 1 COL */}
              <div className="live-col">
                <div className="lc-head" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>
                  <span style={{ color: 'var(--green)' }}>{currentUser}</span>
                  <span style={{ color: 'var(--muted)' }}>24ms</span>
                </div>
                <div className="hp-out" style={{ height: '14px', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--border)', marginBottom: '16px' }}>
                  <div className="hp-in" style={{ height: '100%', width: `${hp.p1}%`, background: 'var(--green)', transition: 'width 0.3s' }}></div>
                </div>
                <div className="b-editor" style={{ background: 'var(--card)', border: '3px solid var(--border)', height: '420px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '8px 12px', borderBottom: '2px solid var(--border)', color: 'var(--muted)', fontSize: '16px', background: 'rgba(255,255,255,0.02)' }}>solution.py</div>
                  <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--white)', padding: '16px', fontFamily: '"VT323", monospace', fontSize: '20px', resize: 'none', outline: 'none' }} spellCheck="false" />
                  <div style={{ padding: '12px', borderTop: '2px solid var(--border)', display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)' }}>
                    <button className="px-btn px-btn-o">TEST CODE</button>
                    <button className="px-btn px-btn-g">SUBMIT ▶</button>
                  </div>
                </div>
              </div>

              {/* PLAYER 2 COL */}
              <div className="live-col">
                <div className="lc-head" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>
                  <span style={{ color: 'var(--pink)' }}>NULL_POINTER</span>
                  <span style={{ color: 'var(--pink)' }}>18ms</span>
                </div>
                <div className="hp-out" style={{ height: '14px', background: 'rgba(0,0,0,0.5)', border: '2px solid var(--border)', marginBottom: '16px' }}>
                  <div className="hp-in" style={{ height: '100%', width: `${hp.p2}%`, background: 'var(--pink)', transition: 'width 0.3s' }}></div>
                </div>
                <div className="b-trace" style={{ background: 'var(--card)', border: '3px solid var(--border)', height: '420px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '8px 12px', borderBottom: '2px solid var(--border)', color: 'var(--pink)', fontSize: '16px', background: 'rgba(255,60,172,0.05)' }}>▶ ENEMY TRACE</div>
                  <div style={{ flex: 1, padding: '16px', fontFamily: '"VT323", monospace', fontSize: '18px', color: 'var(--muted)', overflowY: 'auto' }}>
                    <div>&gt; Compiling solution.cpp...</div>
                    <div>&gt; Compilation successful.</div>
                    <div style={{ color: 'var(--white)' }}>&gt; Test Case 1: <span style={{ color: 'var(--green)' }}>PASS</span> (0.01s)</div>
                    <div className="blink" style={{ marginTop: '16px', color: 'var(--pink)' }}>_</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}