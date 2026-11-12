import React, { useState } from 'react';
import { formatScore } from '../data';

const History = ({ history, clearHistory }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('ALL');

  const uniquePlayers = [...new Set(history.map((item) => item.name))];

  const filteredHistory =
    selectedPlayer === 'ALL'
      ? history
      : history.filter((item) => item.name === selectedPlayer);

  const sortedHistory = [...filteredHistory].sort((a, b) => b.finalScore - a.finalScore);

  const totalGames = sortedHistory.length;
  const highestScore =
    totalGames > 0
      ? sortedHistory.reduce((max, item) => (item.finalScore > max ? item.finalScore : max), 0)
      : 0;
  const bankruptCount = sortedHistory.filter((item) => item.result === 'Cháy túi').length;

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>

      {history.length === 0 ? (
        <p>Chưa có lượt chơi nào</p>
      ) : (
        <>
          <div className="filters" style={{ justifyContent: 'space-between' }}>
            <div>
              <label htmlFor="player-filter">Người chơi: </label>
              <select
                id="player-filter"
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
                style={{ padding: '6px 10px' }}
              >
                <option value="ALL">Tất cả</option>
                {uniquePlayers.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <button type="button" className="btn-danger" onClick={clearHistory}>
              Xóa lịch sử
            </button>
          </div>

          <p>
            Số lượt chơi: <strong>{totalGames}</strong> | Điểm cao nhất:{' '}
            <strong>{formatScore(highestScore)}</strong> | Số lần cháy túi:{' '}
            <strong>{bankruptCount}</strong>
          </p>

          <table>
            <thead>
              <tr>
                <th>Người chơi</th>
                <th>Số câu đúng</th>
                <th>Điểm cuối</th>
                <th>Đánh giá</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {sortedHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.correctCount}/{item.played}</td>
                  <td>{formatScore(item.finalScore)}</td>
                  <td>{item.result}</td>
                  <td>{item.playedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default History;