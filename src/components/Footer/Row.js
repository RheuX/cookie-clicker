import React from "react";

const defaultStyles_row = {
  flex: 1,
  "text-align": center,
};

const Row = ({ children, className, style, onClick }) => {
  // Merge the default styles with the provided styles using spread operator
  const mergedStyles = { ...defaultStyles_row, ...style };

  return (
    <div className={className} style={mergedStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export default Row;
