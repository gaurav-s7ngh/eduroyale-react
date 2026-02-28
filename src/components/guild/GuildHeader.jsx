import React from 'react';

export default function GuildHeader({ guild }) {
  // Calculate how full the XP bar should be (assuming 5000 XP is the next level)
  const xpPercentage = (guild.xp / 5000) * 100;

  return (
    <div className="bg-gray-900 border-4 border-pink-500 p-6 shadow-[8px_8px_0px_#831843] mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-pixel text-[10px] text-pink-400 mb-2">▶ ACADEMIC HOUSE</div>
          <h1 className="font-pixel text-3xl text-white drop-shadow-[3px_3px_0_#000]">
            {guild.name}
          </h1>
        </div>
        <div className="text-center bg-black/50 border-2 border-gray-700 p-3">
          <div className="font-pixel text-[10px] text-gray-400 mb-1">HOUSE RATING</div>
          <div className="font-pixel text-xl text-yellow-400">{guild.globalHouseRating}</div>
        </div>
      </div>

      {/* Level & XP Bar */}
      <div className="flex items-center gap-4">
        <div className="font-pixel text-lg text-pink-400 bg-pink-500/20 px-4 py-2 border border-pink-500">
          LVL {guild.level}
        </div>
        <div className="flex-1">
          <div className="flex justify-between font-pixel text-[10px] text-gray-400 mb-2">
            <span>XP: {guild.xp} / 5000</span>
            <span>NEXT PERK: CUSTOM ARENA</span>
          </div>
          <div className="h-4 bg-black border-2 border-gray-700 w-full relative">
            <div 
              className="absolute top-0 left-0 h-full bg-pink-500 shadow-[inset_-3px_0_0_rgba(0,0,0,0.3)]" 
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}