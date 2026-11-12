import React from 'react';
import { LEVELS, MULTIPLIERS, formatScore, formatMultiplier } from '../data';

const BetPanel = ({
  index,
  total,
  question,
  score,
  bet,
  setBet,
  errorMsg,
  onPlaceBet,
  previewActive,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMsg) onPlaceBet();
  };

  return (
    <div>
      <h3>
        Câu {index + 1}/{total} – {question.topic} – {LEVELS[question.level]} ({formatMultiplier(MULTIPLIERS[question.level])})
      </h3>
      <p style={{ fontWeight: 'bold' }}>Điểm hiện có: {formatScore(score)}</p>

      {previewActive && (
        <div style={{ padding: '12px', background: '#fef9c3', borderRadius: '6px', marginBottom: '12px' }}>
          <strong>Xem trước câu hỏi:</strong> {question.question}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <label htmlFor="bet-input">Mức cược:</label>
        <input
          id="bet-input"
          type="number"
          step="100"
          value={bet}
          onChange={(e) => setBet(e.target.value)}
          style={{ padding: '8px', width: '120px' }}
        />
        <button type="submit" disabled={Boolean(errorMsg)}>
          Đặt cược
        </button>
      </form>

      {errorMsg && <p className="error-text">{errorMsg}</p>}
    </div>
  );
};

export default BetPanel;