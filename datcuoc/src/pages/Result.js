import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { formatScore } from '../data';
import { getResult } from '../utils';
import ScoreChart from '../components/ScoreChart';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const { name, rounds, finalScore, correctCount, reason } = location.state;

  return (
    <div>
      <h2>{reason === 'bankrupt' ? 'Bạn đã cháy túi!' : 'Bạn đã hoàn thành 12 câu'}</h2>
      <p><strong>Người chơi:</strong> {name}</p>
      <p><strong>Số câu trả lời đúng:</strong> {correctCount}/{rounds.length}</p>
      <p><strong>Điểm cuối:</strong> {formatScore(finalScore)}</p>
      <p><strong>Đánh giá:</strong> {getResult(finalScore)}</p>

      <ScoreChart rounds={rounds} />

      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <button type="button" onClick={() => navigate('/play')}>
          Chơi lại
        </button>
        <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;