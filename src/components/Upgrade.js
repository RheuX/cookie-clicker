import React from 'react';
import './Upgrade.css';

function UpgradeButton({ upgradesList, onUpgradeClick }) {
  return (
    <div className='buttons-container'>
      {upgradesList.map((upgradeObj) => ( //map iteraters to the list and create a button for each list
        <button
          key={upgradeObj.id}
          onClick={() => onUpgradeClick(upgradeObj.upgrade, upgradeObj.id-1)}
          data-cost={upgradeObj.cost}
        >{upgradeObj.label}</button>
      ))}
    </div>
  );
}

export default UpgradeButton;
