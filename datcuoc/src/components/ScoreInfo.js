import React from 'react';
import { formatScore } from '../data';

const ScoreInfo = ({ score, bet }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontWeight: 'bold' }}>
      <span>Điểm hiện có: {formatScore(score)}</span>
      <span>Đang cược: {formatScore(bet)}</span>
    </div>
  );
};

export default ScoreInfo;