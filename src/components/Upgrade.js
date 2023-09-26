import React from 'react';
import './Upgrade.css';

const upgradesList = [
  { id: 1, label: 'Click 1x', cost: 10 },
  { id: 2, label: 'Click 10x', cost: 50 },
  { id: 3, label: 'Click 100x', cost: 200 },
  { id: 4, label: 'Auto 1x', cost: 20 },
  { id: 5, label: 'Auto 10x', cost: 100 },
  { id: 6, label: 'Auto 100x', cost: 500 },
];

function UpgradeButton({ onUpgradeClick }) {
  return (
    <div className='buttons-container'>
      <button onClick={() => onUpgradeClick(1)} data-label="Cost: 10">Click 1x</button>
      <button onClick={() => onUpgradeClick(10)} data-label="Cost: 250">Click 10x</button>
      <button onClick={() => onUpgradeClick(100)} data-label="Cost: 5000">Click 100x</button>
      <button onClick={() => onUpgradeClick(1)}>Auto 1x</button>
      <button onClick={() => onUpgradeClick(10)}>Auto 10x</button>
      <button onClick={() => onUpgradeClick(100)}>Auto 100x</button>
    </div>
  );
}

export default UpgradeButton;
