import React, { useState, useEffect, useRef } from 'react';

export default function ProfilePage() {
  const canvasRef = useRef(null);

  // Mock Data (To be replaced by Supabase)
  const [user] = useState({
    username: "RUNTIME_TERROR",
    guild: "THE_LOGIC_GATES",
    globalRating: 1450,
    archetype: "The Speed Solver",
    stats: { battles: 142, wins: 89, winRate: "62%" },
    achievements: ["All-Rounder", "Speed Demon"],
    subjects: {
      "Comp Sci": { rating: 1600, topics: { "Data Structures": 100, "Algorithms": 60 } },
      "Physics": { rating: 1350, topics: { "Mechanics": 100, "Thermodynamics": 20 } },
      "Math": { rating: 1450, topics: { "Calculus": 40, "Algebra": 100 } }
    }
  });

  // Dynamic Radar Chart Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width, ch = canvas.height;
    const cx = cw / 2, cy = ch / 2;
    const maxRadius = Math.min(cx, cy) - 30;

    ctx.clearRect(0, 0, cw, ch);
    const subjects = Object.keys(user.subjects);
    const numPoints = subjects.length;

    // Draw Spider Web Background
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

    // Draw Player Skill Polygon
    ctx.beginPath();
    ctx.fillStyle = 'rgba(61, 255, 154, 0.4)';
    ctx.strokeStyle = '#3dff9a';
    ctx.lineWidth = 2;

    subjects.forEach((sub, i) => {
      const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
      const normalized = Math.max(0.1, Math.min(1, (user.subjects[sub].rating - 800) / 1200));
      const r = maxRadius * normalized;
      ctx[i === 0 ? 'moveTo' : 'lineTo'](cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      
      // Labels
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.font = '12px "VT323", monospace';
      ctx.fillText(sub, cx + Math.cos(angle) * (maxRadius + 15) - 20, cy + Math.sin(angle) * (maxRadius + 15));
    });
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }, [user]);

  return (
    <div className="max-w-[1200px] mx-auto p-6 pt-24 min-h-screen text-white">
      
      {/* 12-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ─── LEFT SIDEBAR (ID CARD) ─── */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-black/60 border-2 border-retroGreen shadow-[6px_6px_0px_var(--color-retroGreen)] p-6 relative">
            <div className="absolute top-0 right-0 bg-retroGreen text-black font-pixel text-[8px] px-2 py-1">ONLINE</div>
            
            <div className="flex flex-col items-center text-center mt-4">
              <div className="text-6xl mb-4 bg-retroGreen/10 border-2 border-retroGreen p-4 w-32 h-32 flex items-center justify-center shadow-[inset_0_0_15px_rgba(61,255,154,0.2)]">
                🤖
              </div>
              <h1 className="font-pixel text-retroGreen text-xl mb-2 drop-shadow-[0_0_8px_rgba(61,255,154,0.5)]">
                {user.username}
              </h1>
              <div className="font-terminal text-retroBlue text-2xl mb-6">{user.archetype}</div>
              
              <div className="w-full text-left bg-black/50 border border-gray-800 p-4 mb-4">
                <div className="font-pixel text-[8px] text-gray-400 mb-2">ACADEMIC HOUSE</div>
                <div className="font-pixel text-[10px] text-retroPink">🛡️ {user.guild}</div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {user.achievements.map((ach, i) => (
                  <span key={i} className="font-pixel text-[8px] bg-retroYellow/10 text-retroYellow border border-retroYellow px-2 py-1">
                    🏆 {ach}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT MAIN CONTENT ─── */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* STATS ROW */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/60 border-2 border-retroYellow p-4 text-center shadow-[4px_4px_0px_var(--color-retroYellow)]">
              <div className="font-pixel text-[10px] text-retroYellow/80 mb-2">GLOBAL RATING</div>
              <div className="font-pixel text-2xl text-retroYellow drop-shadow-[0_0_5px_var(--color-retroYellow)]">{user.globalRating}</div>
            </div>
            <div className="bg-black/60 border-2 border-gray-700 p-4 text-center">
              <div className="font-pixel text-[10px] text-gray-400 mb-2">TOTAL BATTLES</div>
              <div className="font-pixel text-2xl text-white">{user.stats.battles}</div>
            </div>
            <div className="bg-black/60 border-2 border-gray-700 p-4 text-center">
              <div className="font-pixel text-[10px] text-gray-400 mb-2">WIN RATE</div>
              <div className="font-pixel text-2xl text-retroBlue">{user.stats.winRate}</div>
            </div>
          </div>

          {/* SPLIT PANELS: Radar & Knowledge Tree */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Radar Chart */}
            <div className="bg-black/60 border-2 border-retroBlue p-4 shadow-[4px_4px_0px_var(--color-retroBlue)]">
              <div className="font-pixel text-[10px] text-retroBlue mb-4 border-b border-gray-800 pb-2">🕸️ SUBJECT MASTERY RADAR</div>
              <div className="flex justify-center items-center h-[250px]">
                <canvas ref={canvasRef} width="250" height="250" className="image-rendering-pixelated"></canvas>
              </div>
            </div>

            {/* Knowledge Tree */}
            <div className="bg-black/60 border-2 border-retroPink p-4 shadow-[4px_4px_0px_var(--color-retroPink)] overflow-y-auto max-h-[350px]">
              <div className="font-pixel text-[10px] text-retroPink mb-4 border-b border-gray-800 pb-2">🌳 KNOWLEDGE TREE</div>
              
              <div className="font-terminal text-xl ml-2 border-l-2 border-dashed border-gray-700">
                {Object.entries(user.subjects).map(([subName, subData]) => (
                  <div key={subName} className="mb-6 relative pl-4">
                    {/* Connection dot */}
                    <div className="absolute -left-[5px] top-2 w-2 h-2 bg-retroPink"></div>
                    
                    <div className="text-white font-pixel text-[10px] mb-2 uppercase">▶ {subName} <span className="text-gray-500">[{subData.rating}]</span></div>
                    
                    <ul className="flex flex-col gap-2">
                      {Object.entries(subData.topics).map(([topicName, mastery]) => (
                        <li key={topicName} className={`text-lg ${mastery === 100 ? 'text-retroGreen drop-shadow-[0_0_5px_var(--color-retroGreen)]' : 'text-gray-500'}`}>
                          ↳ {topicName} ({mastery}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}