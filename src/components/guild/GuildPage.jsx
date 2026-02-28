import React, { useState } from 'react';

export default function GuildPage() {
  const [guild] = useState({
    name: "NEWTONS_APPLES",
    level: 5,
    xp: 3250,
    globalRating: 1520,
    subjectStrengths: { "Physics": 1650, "Mathematics": 1400, "Computer Science": 1100 },
    members: [
      { username: "RUNTIME_TERROR", role: "Leader", rating: 1450 },
      { username: "GRAVITY_KING", role: "Strategist", rating: 1600 },
      { username: "NULL_POINTER", role: "Rookie", rating: 1100 },
    ],
    wars: [
      { type: "Physics Only", opp: "THE_LOGIC_GATES", status: "LIVE", result: null },
      { type: "Mixed Domain", opp: "CHEM_MASTERS", status: "FINISHED", result: "VICTORY" }
    ]
  });

  const xpPercentage = (guild.xp / 5000) * 100;

  return (
    <div className="max-w-[1200px] mx-auto p-6 pt-24 min-h-screen text-white">
      
      {/* ─── HEADER BANNER ─── */}
      <div className="bg-black/60 border-2 border-retroPink p-6 shadow-[6px_6px_0px_var(--color-retroPink)] mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <div className="font-pixel text-[10px] text-retroPink mb-2 tracking-widest">▶ ACADEMIC HOUSE</div>
            <h1 className="font-pixel text-2xl md:text-4xl text-white drop-shadow-[2px_2px_0_var(--color-retroPink)]">{guild.name}</h1>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-black border border-gray-700 p-4 text-center min-w-[120px]">
              <div className="font-pixel text-[8px] text-gray-400 mb-2">HOUSE RATING</div>
              <div className="font-pixel text-xl text-retroYellow">{guild.globalRating}</div>
            </div>
            <div className="bg-black border border-gray-700 p-4 text-center min-w-[120px]">
              <div className="font-pixel text-[8px] text-gray-400 mb-2">MEMBERS</div>
              <div className="font-pixel text-xl text-white">{guild.members.length}/50</div>
            </div>
          </div>
        </div>

        {/* Level & XP Bar */}
        <div className="flex items-center gap-4 bg-black/40 p-4 border border-gray-800">
          <div className="font-pixel text-sm text-retroPink bg-retroPink/10 px-4 py-3 border border-retroPink">
            LVL {guild.level}
          </div>
          <div className="flex-1">
            <div className="flex justify-between font-pixel text-[8px] text-gray-400 mb-2">
              <span>XP: {guild.xp} / 5000</span>
              <span className="text-retroBlue">NEXT PERK: PRIVATE BATTLE ROOMS</span>
            </div>
            <div className="h-4 bg-black border border-gray-700 w-full relative">
              <div className="absolute top-0 left-0 h-full bg-retroPink shadow-[inset_-3px_0_0_rgba(0,0,0,0.5)]" style={{ width: `${xpPercentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ─── LEFT COLUMN: STRENGTHS & WARS ─── */}
        <div className="flex flex-col gap-8">
          
          {/* Dashboard */}
          <div className="bg-black/60 border-2 border-retroBlue p-6 shadow-[4px_4px_0px_var(--color-retroBlue)]">
            <h2 className="font-pixel text-[10px] text-retroBlue mb-6 border-b border-gray-800 pb-2">📊 GUILD DOMAIN STRENGTHS</h2>
            <div className="flex flex-col gap-6">
              {Object.entries(guild.subjectStrengths).map(([subName, rating]) => {
                const fill = Math.min((rating / 2000) * 100, 100);
                return (
                  <div key={subName}>
                    <div className="flex justify-between font-pixel text-[10px] mb-2">
                      <span className="text-white uppercase">{subName}</span>
                      <span className="text-retroBlue">{rating} ELO</span>
                    </div>
                    <div className="h-6 bg-black border border-gray-700 w-full p-1">
                      <div className="h-full bg-retroBlue shadow-[inset_-3px_0_0_rgba(0,0,0,0.3)]" style={{ width: `${fill}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wars */}
          <div className="bg-black/60 border-2 border-retroYellow p-6 shadow-[4px_4px_0px_var(--color-retroYellow)]">
            <h2 className="font-pixel text-[10px] text-retroYellow mb-6 border-b border-gray-800 pb-2">⚔ WAR HISTORY</h2>
            <div className="flex flex-col gap-3">
              {guild.wars.map((war, i) => (
                <div key={i} className="flex justify-between items-center bg-black/40 border border-gray-800 p-3">
                  <div>
                    <div className="font-pixel text-[8px] text-gray-400 mb-1">{war.type}</div>
                    <div className="font-terminal text-xl text-white">VS {war.opp}</div>
                  </div>
                  {war.status === "LIVE" 
                    ? <span className="font-pixel text-[10px] text-retroPink animate-pulse">🔴 LIVE</span>
                    : <span className="font-pixel text-[10px] text-retroGreen">VICTORY</span>
                  }
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ─── RIGHT COLUMN: ROSTER ─── */}
        <div className="bg-black/60 border-2 border-retroGreen p-6 shadow-[4px_4px_0px_var(--color-retroGreen)]">
          <h2 className="font-pixel text-[10px] text-retroGreen mb-6 border-b border-gray-800 pb-2">👥 ACTIVE ROSTER</h2>
          <div className="flex flex-col gap-3 font-terminal text-xl text-gray-300">
            {guild.members.map((member, i) => (
              <div key={i} className="flex justify-between items-center bg-black/40 p-3 border border-gray-800 hover:border-retroGreen transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{member.role === 'Leader' ? '👑' : '👤'}</span>
                  <div>
                    <div className="text-white">{member.username}</div>
                    <div className="text-sm text-retroYellow font-pixel text-[8px] mt-1 uppercase">{member.role}</div>
                  </div>
                </div>
                <div className="text-retroGreen font-pixel text-[10px]">{member.rating} RATING</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}   