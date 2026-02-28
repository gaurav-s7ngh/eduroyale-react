import React, { useState } from 'react';
import IDCard from './IDCard';
import KnowledgeTree from './KnowledgeTree';

export default function ProfilePage() {
  // We keep the mock data right here in the state!
  // Later: setMockUser(await supabase.from('users').select('*'))
  const [mockUser] = useState({
    username: "RUNTIME_TERROR",
    guildName: "NEWTONS_APPLES",
    globalRating: 1450, // Total skill number
    archetype: "The Speed Solver", // Playstyle
    battles: 142,
    wins: 89,
    subjects: {
      "Physics": {
        rating: 1600,
        topics: {
          "Kinematics": { masteryPercent: 100 },
          "Thermodynamics": { masteryPercent: 45 }
        }
      },
      "Computer Science": {
        rating: 1350,
        topics: {
          "Binary Search": { masteryPercent: 100 },
          "Recursion": { masteryPercent: 10 }
        }
      }
    }
  });

  return (
    <div className="max-w-6xl mx-auto p-8 pt-24 min-h-screen text-white cursor-none">
      
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
        
        {/* LEFT COLUMN: The ID Card */}
        <div className="flex flex-col gap-6">
          <IDCard user={mockUser} />
        </div>

        {/* RIGHT COLUMN: Stats & Knowledge Tree */}
        <div className="flex flex-col gap-6">
          
          {/* Top Stats Bar */}
          <div className="bg-gray-900 border-2 border-blue-500 p-4 shadow-[4px_4px_0px_#1e3a8a] grid grid-cols-3 gap-4 text-center">
            <div className="bg-black/50 p-4 border border-gray-700">
              <div className="font-pixel text-[10px] text-gray-400 mb-2">GLOBAL RATING</div>
              <div className="font-pixel text-xl text-yellow-400">{mockUser.globalRating}</div>
            </div>
            <div className="bg-black/50 p-4 border border-gray-700">
              <div className="font-pixel text-[10px] text-gray-400 mb-2">BATTLES</div>
              <div className="font-pixel text-xl text-white">{mockUser.battles}</div>
            </div>
            <div className="bg-black/50 p-4 border border-gray-700">
              <div className="font-pixel text-[10px] text-gray-400 mb-2">VICTORIES</div>
              <div className="font-pixel text-xl text-green-400">{mockUser.wins}</div>
            </div>
          </div>

          {/* Knowledge Tree Module */}
          <KnowledgeTree subjects={mockUser.subjects} />

        </div>
      </div>
    </div>
  );
}