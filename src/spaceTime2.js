import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs';

const SpaceTime2 = () => {
  const circleRef = useRef(null);
  const [fillPercentage, setFillPercentage] = useState(0);
  const [animationDuration, setAnimationDuration] = useState(5000); // Default duration
  const [numHashes, setNumHashes] = useState(1); // Default number of hashes

  useEffect(() => {
    const circle = circleRef.current;

    anime({
      targets: circle,
      duration: animationDuration, // Adjust the duration based on the speed of filling
      easing: 'linear',
      loop: false,
      update: (anim) => {
        setFillPercentage(anim.progress); // Update the fill percentage based on animation progress
      },
    });
  }, [numHashes, animationDuration]);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setNumHashes(value);
    const speed = value * 100; // Adjust the speed inversely with the number of hashes
    setAnimationDuration(speed);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: '250px', height: '250px', backgroundColor: '#f0f0f0', borderRadius: '50%', position: 'relative', overflow: 'hidden', margin: '0 auto' }}>
        <div
          ref={circleRef}
          style={{
            width: '250%',
            height: '250%',
            position: 'absolute',
            backgroundColor: '#007bff',
            borderRadius: '50%',
            transform: `translate(-50%, -50%) scale(${fillPercentage / 100}, ${fillPercentage / 100})`, // Scale the circle based on fill percentage
            left: '50%', top: '50%', // Position the circle at the center
          }}
        />
      </div>
      <input type="range" min="1" max="100" value={numHashes} onChange={handleInputChange} style={{ width: '30%', margin: '20px auto', display: 'block' }} />
      <p>Number of Hashes: {numHashes}</p>
    </div>
  );
};

export default SpaceTime2;
