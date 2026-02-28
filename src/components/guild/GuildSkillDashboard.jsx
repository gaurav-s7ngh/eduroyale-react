import React from 'react';

export default function GuildSkillDashboard({ strengths }) {
  // Convert object to array for easy looping
  const strengthList = Object.entries(strengths);

  return (
    <div className="bg-gray-900 border-2 border-blue-500 p-6 shadow-[4px_4px_0px_#1e3a8a]">
      <h2 className="font-pixel text-blue-400 text-sm mb-6 border-b-2 border-gray-700 pb-2">
        📊 DOMAIN STRENGTHS
      </h2>

      <div className="flex flex-col gap-6">
        {strengthList.map(([subjectName, rating]) => {
          // Calculate bar width (assuming 2000 rating is the absolute max / 100%)
          const fillPercentage = Math.min((rating / 2000) * 100, 100);

          return (
            <div key={subjectName}>
              <div className="flex justify-between font-pixel text-[12px] mb-2">
                <span className="text-white uppercase">{subjectName}</span>
                <span className="text-blue-400">{rating} RATING</span>
              </div>
              <div className="h-6 bg-black/50 border-2 border-gray-700 w-full relative p-1">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${fillPercentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}