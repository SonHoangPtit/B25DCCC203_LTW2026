import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, MULTIPLIERS, LETTERS, formatMultiplier } from '../data';

const QuestionDetail = ({ questions, bookmarks, toggleBookmark }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const question = questions.find((q) => q.id === Number(id));

  if (!question) {
    return (
      <div>
        <h2>Không tìm thấy câu hỏi</h2>
        <button type="button" onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(question.id);

  return (
    <div>
      <h2>
        Câu hỏi số {question.id} – {question.topic} – {LEVELS[question.level]} ({formatMultiplier(MULTIPLIERS[question.level])})
      </h2>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{question.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '16px 0' }}>
        {question.options.map((opt, idx) => {
          const isCorrect = idx === question.answer;
          return (
            <div
              key={idx}
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: isCorrect ? '#16a34a' : '#f8fafc',
                color: isCorrect ? '#fff' : '#000',
                fontWeight: isCorrect ? 'bold' : 'normal',
              }}
            >
              {LETTERS[idx]}. {opt} {isCorrect && '(Đáp án đúng)'}
            </div>
          );
        })}
      </div>

      <p><strong>Gợi ý:</strong> {question.hint}</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
        <button type="button" onClick={() => toggleBookmark(question.id)}>
          {isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
        </button>
        <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;