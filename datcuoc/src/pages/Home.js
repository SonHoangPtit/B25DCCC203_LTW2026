import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatScore } from '../data';

const Home = ({ playerName, setPlayerName, history }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    navigate('/play');
  };

  const bestRecord =
    history.length > 0
      ? history.reduce((max, item) => (item.finalScore > max.finalScore ? item : max), history[0])
      : null;

  return (
    <div>
      <h2>Đặt cược kiến thức</h2>
      <ul>
        <li>Bắt đầu với <strong>1.000 điểm</strong>, trải qua <strong>12 câu hỏi</strong>.</li>
        <li>Trước mỗi câu, đặt cược từ <strong>100 đến 500 điểm</strong> (bội số của 100).</li>
        <li>Mỗi câu có <strong>25 giây</strong> trả lời. Đúng được cộng điểm cược × hệ số; sai hoặc hết giờ bị trừ điểm cược.</li>
        <li>Còn dưới 100 điểm sẽ cháy túi và kết thúc lượt chơi ngay lập tức.</li>
      </ul>

      {bestRecord && (
        <p style={{ fontWeight: 'bold', color: '#15803d', fontSize: '18px' }}>
          Kỷ lục: {formatScore(bestRecord.finalScore)} – {bestRecord.name}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Nhập tên người chơi..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{ padding: '10px', width: '260px' }}
        />
        <button type="submit" disabled={!playerName.trim()}>
          Vào chơi
        </button>
      </form>
    </div>
  );
};

export default Home;