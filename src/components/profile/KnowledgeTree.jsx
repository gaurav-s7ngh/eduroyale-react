import React from 'react';

export default function KnowledgeTree({ subjects }) {
  // Convert the subjects object into an array so we can loop through it
  const subjectList = Object.entries(subjects);

  return (
    <div className="bg-gray-900 border-2 border-purple-500 p-4 shadow-[4px_4px_0px_#581c87]">
      <div className="font-pixel text-[12px] text-purple-400 border-b-2 border-gray-700 pb-2 mb-4">
        🌳 KNOWLEDGE TREE
      </div>
      
      <div className="font-terminal text-xl pl-2 border-l-2 border-dashed border-gray-700">
        {subjectList.map(([subjectName, data]) => (
          <div key={subjectName} className="mb-4 ml-4 relative">
            {/* Subject Title */}
            <div className="text-yellow-400 font-pixel text-[12px] mb-2 uppercase">
              ▶ {subjectName}
            </div>
            
            {/* Subtopics Loop */}
            <ul className="pl-4 text-gray-400 flex flex-col gap-1">
              {Object.entries(data.topics).map(([topicName, topicData]) => (
                <li 
                  key={topicName} 
                  className={topicData.masteryPercent === 100 ? "text-green-400 drop-shadow-[0_0_5px_#4ade80]" : "text-gray-500"}
                >
                  ↳ {topicName} ({topicData.masteryPercent}%)
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}