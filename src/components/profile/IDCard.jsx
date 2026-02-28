import React from 'react';

export default function IDCard({ user }) {
  return (
    <div className="bg-gray-900 border-4 border-green-400 p-6 shadow-[8px_8px_0px_#166534] flex flex-col items-center text-center">
      <div className="text-6xl mb-4 bg-green-900/30 border-2 border-green-400 p-4 rounded-none">
        🤖
      </div>
      
      <h1 className="font-pixel text-green-400 text-xl mb-2 drop-shadow-[2px_2px_0_#000]">
        {user.username}
      </h1>
      
      <div className="font-terminal text-blue-400 text-2xl mb-4">
        {user.archetype}
      </div>
      
      <div className="flex gap-2 mb-6">
        <span className="font-pixel text-[10px] bg-yellow-500/20 text-yellow-400 border border-yellow-400 px-3 py-1">
          LVL 42
        </span>
        <span className="font-pixel text-[10px] bg-purple-500/20 text-purple-400 border border-purple-400 px-3 py-1">
          STEM SLAYER
        </span>
      </div>

      <div className="w-full bg-black/50 border-2 border-gray-700 p-3 mb-4">
        <div className="font-pixel text-[8px] text-gray-400 mb-2">ACADEMIC HOUSE</div>
        <div className="font-pixel text-[10px] text-pink-400">🛡️ {user.guildName}</div>
      </div>
    </div>
  );
}