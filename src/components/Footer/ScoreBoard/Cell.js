import React from "react";

const defaultStyles_cell = {
  flex: 1,
  textAlign: "center",
};

const Cell = ({ children, className, style, onClick }) => {
  // Merge the default styles with the provided styles using spread operator
  const mergedStyles = { ...defaultStyles_cell, ...style };

  return (
    <div className={className} style={mergedStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Cell;
