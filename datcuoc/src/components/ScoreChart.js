import React from 'react';
import { formatScore } from '../data';

const ScoreChart = ({ rounds }) => {
  const maxScore = Math.max(...rounds.map((r) => r.scoreAfter), 1);

  return (
    <div className="chart-container">
      {rounds.map((r, idx) => {
        const barHeight = Math.round((r.scoreAfter / maxScore) * 200);
        return (
          <div key={idx} className="chart-col">
            <span style={{ fontSize: '12px', marginBottom: '4px' }}>
              {formatScore(r.scoreAfter)}
            </span>
            <div
              className="chart-bar"
              style={{
                height: `${barHeight}px`,
                backgroundColor: r.correct ? '#16a34a' : '#dc2626',
              }}
            />
            <span style={{ fontSize: '12px', marginTop: '6px' }}>Câu {idx + 1}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreChart;