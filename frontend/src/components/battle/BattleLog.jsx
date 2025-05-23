// src/components/battle/BattleLog.jsx - Improved Battle Log Component with Better Styling
import React, { useEffect, useRef, useState } from 'react';

const BattleLog = ({ log }) => {
  const logEndRef = useRef(null);
  const [hasNewEntries, setHasNewEntries] = useState(false);
  const [lastLogCount, setLastLogCount] = useState(0);
  const isDesktop = window.innerWidth >= 769;
  
  // Auto-scroll to bottom when new log entries are added
  useEffect(() => {
    if (logEndRef.current && log.length > lastLogCount) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setHasNewEntries(true);
      
      // Clear new entry indicator after a delay
      const timer = setTimeout(() => setHasNewEntries(false), 3000);
      
      setLastLogCount(log.length);
      return () => clearTimeout(timer);
    }
  }, [log, lastLogCount]);
  
  // Categorize log entries for color coding
  const getLogEntryClass = (message) => {
    if (message.includes('damaged') || message.includes('dealt')) return 'damage';
    if (message.includes('healed') || message.includes('healing')) return 'healing';
    if (message.includes('defeated')) return 'defeat';
    if (message.includes('Victory!')) return 'victory';
    if (message.includes('deployed')) return 'deploy';
    if (message.includes('defensive stance')) return 'defend';
    if (message.includes('critical')) return 'critical';
    return '';
  };
  
  return (
    <div 
      className={`battle-log ${isDesktop ? 'desktop-sidebar' : 'mobile'}`}
      style={{ zIndex: 30 }} // Force higher z-index
    >
      <div className="log-title">
        Battle Log
        <div className="log-indicators">
          <span className="log-count">({log.length})</span>
          {hasNewEntries && <span className="new-entry-indicator">New!</span>}
        </div>
      </div>
      
      <div className="log-entries" style={{ maxHeight: 'calc(100% - 40px)' }}>
        {log.length === 0 ? (
          <div className="empty-log-message">No battle events yet...</div>
        ) : (
          log.map((entry) => (
            <div 
              key={entry.id} 
              className={`log-entry ${getLogEntryClass(entry.message)}`}
            >
              <span className="turn-indicator">Turn {entry.turn}:</span>
              <span className="log-message">{entry.message}</span>
            </div>
          ))
        )}
        
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default BattleLog;
