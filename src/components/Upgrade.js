import React from 'react';

function UpgradeButton({ onUpgradeClick }) {
  return (
    <div className='buttons-container'>
      <button onClick={() => onUpgradeClick(1)}>Click 1x</button>
      <button onClick={() => onUpgradeClick(10)}>Click 10x</button>
      <button onClick={() => onUpgradeClick(100)}>Click 100x</button>
      <button onClick={() => onUpgradeClick(1)}>Auto 1x</button>
      <button onClick={() => onUpgradeClick(10)}>Auto 10x</button>
      <button onClick={() => onUpgradeClick(100)}>Auto 100x</button>
    </div>
  );
}

export default UpgradeButton;
