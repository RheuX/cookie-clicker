import React from 'react';
import './Upgrade.css';

/*
  const upgradesList = [
    { id: 1, label: "Click 1x", cost: `Cost: ${upgradeCosts[0]}`, upgrade: 1 },
    {
      id: 2,
      label: "Click 10x",
      cost: `Cost: ${upgradeCosts[1]}`,
      upgrade: 10,
    },
    {
      id: 3,
      label: "Click 100x",
      cost: `Cost: ${upgradeCosts[2]}`,
      upgrade: 100,
    },
    // Add more upgrade objects using upgradeCosts
    { id: 4, label: "Auto 1x", upgrade: 20 },
    { id: 5, label: "Auto 10x", upgrade: 100 },
    { id: 6, label: "Auto 100x", upgrade: 500 },
  ];
*/


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
