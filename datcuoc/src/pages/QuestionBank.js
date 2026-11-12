import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, MULTIPLIERS, formatMultiplier } from '../data';

const QuestionBank = ({ questions, bookmarks, toggleBookmark }) => {
  const [selectedLevels, setSelectedLevels] = useState([1, 2, 3]);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [search, setSearch] = useState('');

  const handleLevelChange = (lvl) => {
    setSelectedLevels((prev) =>
      prev.includes(lvl) ? prev.filter((item) => item !== lvl) : [...prev, lvl]
    );
  };

  const filteredQuestions = questions.filter((q) => {
    const matchLevel = selectedLevels.includes(q.level);
    const matchBookmark = !onlyBookmarked || bookmarks.includes(q.id);
    const matchSearch = q.question.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchBookmark && matchSearch;
  });

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>
      <div className="filters">
        {[1, 2, 3].map((lvl) => (
          <label key={lvl}>
            <input
              type="checkbox"
              checked={selectedLevels.includes(lvl)}
              onChange={() => handleLevelChange(lvl)}
            />{' '}
            {LEVELS[lvl]}
          </label>
        ))}

        <label>
          <input
            type="checkbox"
            checked={onlyBookmarked}
            onChange={(e) => setOnlyBookmarked(e.target.checked)}
          />{' '}
          Chỉ hiện câu đã đánh dấu
        </label>

        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '6px 10px' }}
        />
      </div>

      <p>Có {filteredQuestions.length} câu hỏi | Đã đánh dấu: {bookmarks.length} câu</p>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Hệ số</th>
            <th>Câu hỏi</th>
            <th>Đánh dấu</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q, index) => {
            const isBookmarked = bookmarks.includes(q.id);
            return (
              <tr key={q.id}>
                <td>{index + 1}</td>
                <td>{q.topic}</td>
                <td>{LEVELS[q.level]}</td>
                <td>{formatMultiplier(MULTIPLIERS[q.level])}</td>
                <td>
                  <Link to={`/questions/${q.id}`}>{q.question}</Link>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => toggleBookmark(q.id)}
                  >
                    {isBookmarked ? '★' : '☆'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;