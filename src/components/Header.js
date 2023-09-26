import React from 'react';

function Header() {
  const headerStyle = {
    backgroundColor: 'rgb(211,211,211)',
    color: 'black',
    padding: '10px',
    textAlign: 'center',
  };

  return (
    <header style={headerStyle}>
      <h1>Cookie Cliker Game</h1>
      <p>Click the cookie to increase your score!</p>
    </header>
  );
}

export default Header