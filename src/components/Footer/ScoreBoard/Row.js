import React from "react";

const defaultStyles_row = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
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

/* validate the props 
Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
*/

export default Row;
