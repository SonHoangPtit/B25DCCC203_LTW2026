import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({ index, text, status, selectedIndex, correctIndex, onSelect }) => {
  let className = 'option-btn';
  if (status === 'revealed') {
    if (index === correctIndex) className += ' correct';
    else if (index === selectedIndex) className += ' wrong';
  }

  return (
    <button
      type="button"
      className={className}
      disabled={status !== 'answering'}
      onClick={() => onSelect(index)}
    >
      {LETTERS[index]}. {text}
    </button>
  );
};

export default AnswerButton;