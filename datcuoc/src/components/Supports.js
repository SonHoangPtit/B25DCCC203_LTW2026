import React from 'react';

const Supports = ({
  status,
  usedPreview,
  usedShield,
  usedHint,
  shieldActive,
  onUsePreview,
  onUseShield,
  onUseHint,
}) => {
  return (
    <div className="supports-bar">
      <button
        type="button"
        className="btn-secondary"
        disabled={usedPreview || status !== 'betting'}
        onClick={onUsePreview}
      >
        Xem trước
      </button>

      <button
        type="button"
        className="btn-secondary"
        disabled={usedShield || (status !== 'betting' && status !== 'answering')}
        onClick={onUseShield}
      >
        {shieldActive ? 'Đã bảo hiểm' : 'Bảo hiểm'}
      </button>

      <button
        type="button"
        className="btn-secondary"
        disabled={usedHint || status !== 'answering'}
        onClick={onUseHint}
      >
        Gợi ý
      </button>
    </div>
  );
};

export default Supports;