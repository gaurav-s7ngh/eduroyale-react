import { useState, useEffect } from 'react';
import '../styles/learn.css';

export default function Learn() {
  const [activeSubject, setActiveSubject] = useState('Computer Science');
  const [activeModule, setActiveModule] = useState('Binary Search');
  
  // Visual Engine State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // AI Doubt Bot State
  const [aiInput, setAiInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'AI', text: 'Ask me anything about Binary Search. Need me to explain the time complexity or why left <= right?' }
  ]);

  const array = [1, 3, 5, 8, 12, 15, 22];
  const target = 15;
  const steps = [
    { desc: "INITIALIZE: Set Left pointer to 0 and Right to 6.", left: 0, right: 6, mid: -1, found: false },
    { desc: "CALCULATE MID: (0 + 6) / 2 = 3.", left: 0, right: 6, mid: 3, found: false },
    { desc: "COMPARE: array[3] is 8. 8 < 15. Move Right.", left: 0, right: 6, mid: 3, found: false },
    { desc: "UPDATE LEFT: Move Left pointer to mid + 1 (4).", left: 4, right: 6, mid: -1, found: false },
    { desc: "CALCULATE MID: (4 + 6) / 2 = 5.", left: 4, right: 6, mid: 5, found: false },
    { desc: "COMPARE: array[5] is 15. MATCH FOUND!", left: 4, right: 6, mid: 5, found: true }
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const currentData = steps[currentStep];

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    // Add user message
    setChatLog(prev => [...prev, { sender: 'USER', text: aiInput }]);
    
    // Fake AI Response
    setTimeout(() => {
      setChatLog(prev => [...prev, { 
        sender: 'AI', 
        text: `Processing query regarding: "${aiInput}". In O(log n) time, we halve the search space...` 
      }]);
    }, 800);
    
    setAiInput('');
  };

  return (
    <div className="page-wrap" style={{ display: 'flex', gap: '24px', maxWidth: '1600px', margin: '0 auto', padding: '100px 48px 60px', minHeight: '100vh' }}>
      
      {/* ─── SIDEBAR: DOMAINS ─── */}
      <div style={{ width: '250px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="g-panel" style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'var(--border)' }}>
          <div className="g-panel-head" style={{ color: 'var(--yellow)' }}>📚 DOMAINS</div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Computer Science', 'Physics', 'Mathematics'].map(sub => (
              <button key={sub} onClick={() => setActiveSubject(sub)} className="px-btn" style={{ background: activeSubject === sub ? 'rgba(61,255,154,0.1)' : 'transparent', color: activeSubject === sub ? 'var(--green)' : 'var(--muted)', border: `2px solid ${activeSubject === sub ? 'var(--green)' : 'transparent'}`, justifyContent: 'flex-start' }}>
                {activeSubject === sub ? '▶ ' : ''}{sub}
              </button>
            ))}
          </div>
        </div>
        <div className="g-panel" style={{ background: 'rgba(0,0,0,0.6)', borderColor: 'var(--border)', flex: 1 }}>
          <div className="g-panel-head" style={{ color: 'var(--blue)' }}>🗂️ MODULES</div>
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeSubject === 'Computer Science' && ['Binary Search', 'Recursion', 'Sorting'].map(mod => (
              <button key={mod} onClick={() => setActiveModule(mod)} className="px-btn" style={{ background: activeModule === mod ? 'rgba(60,172,255,0.1)' : 'transparent', color: activeModule === mod ? 'var(--blue)' : 'var(--muted)', border: `2px solid ${activeModule === mod ? 'var(--blue)' : 'transparent'}`, justifyContent: 'flex-start', fontSize: '8px' }}>{mod}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="page-header" style={{ marginBottom: '0' }}>
          <div className="chip chip-b">🎬 VISUAL ENGINE</div>
          <h1 style={{ color: 'var(--blue)', textShadow: '3px 3px 0 var(--bd)', margin: '10px 0' }}>{activeModule.toUpperCase()}</h1>
        </div>

        {/* SPLIT LAYOUT: VISUALIZER (Left) & AI BOT (Right) */}
        <div style={{ display: 'flex', gap: '20px', flex: 1 }}>
          
          {/* VISUALIZER STAGE */}
          <div className="g-panel" style={{ flex: 1.5, borderColor: 'var(--blue)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: '2px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px' }}>TARGET: <span style={{ color: 'var(--yellow)' }}>{target}</span></span>
              <span className="chip chip-g" style={{ padding: '4px 8px', fontSize: '8px' }}>LIVE TRACE</span>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', padding: '40px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {array.map((num, i) => {
                  let bg = 'rgba(255,255,255,0.05)', border = '2px solid var(--border)', color = 'var(--white)', shadow = 'none';
                  if (i < currentData.left || i > currentData.right) color = 'var(--muted)';
                  if (i === currentData.mid) { border = '2px solid var(--blue)'; bg = 'rgba(60,172,255,0.2)'; }
                  if (currentData.found && i === currentData.mid) { border = '2px solid var(--green)'; bg = 'var(--green)'; color = '#000'; shadow = '0 0 20px rgba(61,255,154,0.5)'; }
                  return <div key={i} style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Press Start 2P", monospace', fontSize: '16px', background: bg, border: border, color: color, boxShadow: shadow }}>{num}</div>;
                })}
              </div>
            </div>

            {/* CONTROLS */}
            <div style={{ padding: '24px', borderTop: '2px solid var(--border)', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="px-btn px-btn-g" onClick={() => setIsPlaying(!isPlaying)} style={{ width: '120px', justifyContent: 'center' }}>
                  {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                </button>
                <button className="px-btn px-btn-o" onClick={() => { setIsPlaying(false); setCurrentStep(0); }}>↺ RESET</button>
              </div>
              <div style={{ flex: 1, padding: '16px', background: 'rgba(0,0,0,0.5)', border: '2px dashed var(--border)', fontFamily: '"VT323", monospace', fontSize: '20px', color: 'var(--white)' }}>
                <span style={{ color: 'var(--green)', marginRight: '8px' }}>[{currentStep + 1}/{steps.length}]</span>{currentData.desc}
              </div>
            </div>
          </div>

          {/* ─── NEW: AI DOUBT BOT TERMINAL ─── */}
          <div className="g-panel" style={{ flex: 1, borderColor: 'var(--purple)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px', borderBottom: '2px solid var(--border)', background: 'rgba(162,89,255,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '24px' }}>🤖</div>
              <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '10px', color: 'var(--purple)' }}>AI DOUBT BOT</div>
            </div>
            
            {/* Chat History */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: '"VT323", monospace', fontSize: '20px' }}>
              {chatLog.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'USER' ? 'flex-end' : 'flex-start' }}>
                  <span style={{ fontSize: '14px', color: msg.sender === 'USER' ? 'var(--blue)' : 'var(--purple)', marginBottom: '4px' }}>{msg.sender}</span>
                  <div style={{ background: msg.sender === 'USER' ? 'rgba(60,172,255,0.1)' : 'rgba(162,89,255,0.1)', border: `2px solid ${msg.sender === 'USER' ? 'var(--blue)' : 'var(--purple)'}`, padding: '12px', maxWidth: '90%', lineHeight: '1.4' }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleAiSubmit} style={{ padding: '16px', borderTop: '2px solid var(--border)', display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.5)' }}>
              <input 
                type="text" 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask about this algorithm..." 
                style={{ flex: 1, background: 'transparent', border: '2px solid var(--border)', color: 'var(--white)', padding: '12px', fontFamily: '"VT323", monospace', fontSize: '18px', outline: 'none' }} 
              />
              <button type="submit" className="px-btn px-btn-p">SEND</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}