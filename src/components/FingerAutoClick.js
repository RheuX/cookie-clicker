import React, { useState, useRef } from 'react';
import BrownFinger from '../assets/BronzeFinger.png'
import './FingerAutoClick.css';

function FingerAutoClick() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const fingerRef = useRef(null);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true; // Set the reference to true
    fingerRef.current.classList.add('finger-dragging');
    console.log('Mouse down event triggered');
    console.log('isDragging:', isDraggingRef.current);
    const offsetX = e.clientX - fingerRef.current.getBoundingClientRect().left;
    const offsetY = e.clientY - fingerRef.current.getBoundingClientRect().top;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    function handleMouseMove(e) {
      if (!isDraggingRef.current) return;

      // Calculate the new position based on the mouse cursor and the initial offset
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY - 120; //the y position is a bit below than the mouse, so -120 to offset that also.

      setPosition({ x, y });
    }

    function handleMouseUp() {
      isDraggingRef.current = false; // Set the reference to false
      console.log('Mouse up event triggered');
      console.log('isDragging:', isDraggingRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Remove the 'finger-dragging' class and reset styles when dragging stops
      fingerRef.current.classList.remove('finger-dragging');
      fingerRef.current.style.transform = '';
      fingerRef.current.style.transformOrigin = '';
      fingerRef.current.style.zIndex = '';
      fingerRef.current.style.opacity = '';

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <div
      ref={fingerRef}
      className="finger"
      onMouseDown={handleMouseDown}
      style={{
        backgroundImage: `url(${BrownFinger})`, // Set the background image URL
        position: 'absolute',
        left: position.x, 
        top: position.y, // Apply the position
      }}
    >
      {/* You can set a background image using CSS */}
    </div>
  );
}

export default FingerAutoClick;