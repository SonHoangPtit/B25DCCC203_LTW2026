import React from 'react';
import { LEVELS, MULTIPLIERS, formatMultiplier } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
  index,
  total,
  question,
  status,
  selectedIndex,
  onSelect,
  hintActive,
}) => {
  return (
    <div>
      <h3>
        Câu {index + 1}/{total} – {question.topic} – {LEVELS[question.level]} ({formatMultiplier(MULTIPLIERS[question.level])})
      </h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{question.question}</p>

      <div className="options-grid">
        {question.options.map((opt, idx) => (
          <AnswerButton
            key={idx}
            index={idx}
            text={opt}
            status={status}
            selectedIndex={selectedIndex}
            correctIndex={question.answer}
            onSelect={onSelect}
          />
        ))}
      </div>

      {hintActive && (
        <p style={{ color: '#0369a1', fontWeight: 'bold' }}>Gợi ý: {question.hint}</p>
      )}
    </div>
  );
};

export default QuestionCard;