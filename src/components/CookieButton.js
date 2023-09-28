import React, {useState} from 'react';
import cookieImage from '../assets/CookiePic.png';

const cookieButtonStyle = {
  width: "100px",
  height: "100px",
  backgroundImage: `url(${cookieImage})`, // Use the imported cookieImage as the background
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderRadius: "50%",
  cursor: "pointer",
  border: "none", // Remove the button border if desired
  position: "absolute",
  top: "75%",
  left: "90%",
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center', // Center the button horizontally
  alignItems: 'center', // Center the button vertically
  minHeight: '60vh', // Ensure the container takes up the full viewport height
  maxHeight: '80vh',
  overflow: 'hidden',
  'background-color': 'gray',
  position: "relative",

};

function CookieButton(props) {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((clickCount) => clickCount + 1);

    // Call the parent's onClick function to update the score

    // Get a reference to the .flex-container element
    var flexContainer = document.getElementById("flex-container");

    // Get the width and height of the .flex-container
    var containerWidth = flexContainer.offsetWidth;
    var containerHeight = flexContainer.offsetHeight;

    // Log the dimensions (for example)
    console.log(
      "Container Width:",
      containerWidth,
      "Container Height:",
      containerHeight
    );

    //====================================================
    if (clickCount >= 9)
    {
      var button = document.getElementById("cookie");
      var randomX = 0.15 + Math.random() * 0.6;
      var randomY = 0.1 + Math.random() * 0.8;
      randomX = randomX.toFixed(2);
      randomY = randomY.toFixed(2);
      
      console.log(randomX); 
      button.style.top = randomX * 100 +"%";
      button.style.left = randomY * 100 + "%";

      console.log(button.style.top);
      setClickCount(0);
    }
    //====================================================

    props.onClick();
  };

  return (
    <div id="flex-container" style={containerStyle}>
      <button
        id="cookie"
        style={cookieButtonStyle}
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default CookieButton