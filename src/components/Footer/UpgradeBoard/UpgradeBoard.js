import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementUpgrade, setCost } from "../../../store/upgradeSlice";
import { incrementScore } from "../../../store/scoreSlice";


function UpgradeBoard(props) {
  const score = useSelector((state) => state.score.value);
  // const upgradeAmount = useSelector((state) => state.upgrade.value);
  const upgradeCost = useSelector((state) => state.upgrade.cost);

  const upgradesList = [
    { id: 0, label: "Click 1x", upgradeFactor: 1 },
    { id: 1, label: "Click 10x", upgradeFactor: 10 },
    { id: 2, label: "Click 100x", upgradeFactor: 100 },
    { id: 3, label: "Auto 1x", upgradeFactor: 20 },
    { id: 4, label: "Auto 10x", upgradeFactor: 100 },
    { id: 5, label: "Auto 100x", upgradeFactor: 500 },
  ];

  const handleUpgradeClick = (id) => {
    let cost = upgradeCost[id];
    let newCost = Math.ceil(cost * 1.8); // ======= upgrade cost update =====
    let upgradeFactor = upgradesList[id].upgradeFactor;
    if (score < cost) {
      return; // no enough score
    }

    useDispatch(incrementUpgrade(upgradeFactor));
    useDispatch(incrementScore(-cost));
    useDispatch(setCost(id, newCost));
  };

  // do I need to warp the buttons-container div with "display-item" style div, is it needed??
  return (
    <div className="buttons-container">
      {upgradesList.map((upgradeItem) => (
        <button
          key={upgradeItem.id}
          data-cost={upgradeItem.cost}
          onClick={handleUpgradeClick(upgradeItem.id)}
        >
          {upgradeItem.label}
        </button>
      ))}
    </div>
  );
}

export default UpgradeBoard;
