import React from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <p style={{ fontWeight: 'bold', fontSize: '18px', color: timeLeft <= 5 ? '#dc2626' : '#0f172a' }}>
      Còn {timeLeft} giây
    </p>
  );
};

export default Timer;