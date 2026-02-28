import React, { useState } from 'react';
import GuildHeader from './GuildHeader';
import GuildSkillDashboard from './GuildSkillDashboard';

export default function GuildPage() {
  // MOCK DATA: Ready for Supabase replacement
  const [mockGuild] = useState({
    name: "Newton's Apples",
    level: 5,
    xp: 3250,
    globalHouseRating: 1520,
    subjectStrengths: {
      "Physics": 1650,
      "Mathematics": 1400,
      "Computer Science": 1100
    },
    members: [
      { username: "RUNTIME_TERROR", role: "Leader", rating: 1450 },
      { username: "GRAVITY_KING", role: "Strategist", rating: 1600 },
      { username: "NULL_POINTER", role: "Rookie", rating: 1100 },
    ]
  });

  return (
    <div className="max-w-6xl mx-auto p-8 pt-24 min-h-screen text-white">
      
      {/* Top Banner */}
      <GuildHeader guild={mockGuild} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Strengths */}
        <GuildSkillDashboard strengths={mockGuild.subjectStrengths} />

        {/* Right Column: Roster & Members */}
        <div className="bg-gray-900 border-2 border-yellow-500 p-6 shadow-[4px_4px_0px_#854d0e]">
          <h2 className="font-pixel text-yellow-400 text-sm mb-6 border-b-2 border-gray-700 pb-2">
            👥 ACTIVE ROSTER ({mockGuild.members.length}/50)
          </h2>
          
          <div className="flex flex-col gap-4 font-terminal text-2xl text-gray-300">
            {mockGuild.members.map((member, index) => (
              <div key={index} className="flex justify-between items-center bg-black/40 p-3 border border-gray-700">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{member.role === 'Leader' ? '👑' : '👤'}</span>
                  <div>
                    <div className="text-white">{member.username}</div>
                    <div className="text-sm text-yellow-500 font-pixel text-[10px] mt-1">{member.role}</div>
                  </div>
                </div>
                <div className="text-green-400 font-pixel text-[12px]">{member.rating} RATING</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}