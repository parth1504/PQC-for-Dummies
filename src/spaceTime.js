import React, { useState, useRef, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './spaceTime.css'


const SpaceTime = () => {
  const [bitSize, setBitSize] = useState(1);

  const handleBitSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    if (newSize >= 1 && newSize <= 256) {
      setBitSize(newSize);
      animateCircle(newSize);
    }
  };

  const animateCircle = (size) => {
    anime({
      targets: '.circle',
      r: size * (1.1),
      easing: 'easeInOutQuad',
      duration: 1000,
    });
  };
  const [hashesInput, setHashesInput] = useState('');

  const animateWOTS = () => {
    const circle = document.getElementById('circle');

    anime({
      targets: circle,
      rotate: hashesInput * 360,
      easing: 'linear',
      duration: 1000 * hashesInput, // Adjust duration based on number of hashes
    });
  };

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
    <div>
    <div className="storageContainer">
      <div className='lamport'>
        
        <h1>Lamport Storage issues</h1>
        <p>The Main issue with Lamport is that the signature size is dependent on the number of bits it needs to sign
          Lamport signature can have upto 256 bits for every 1 bit it needs to sign
          Let's see how the size of the signature varies with the message size.</p>
        <input
          type="number"
          value={bitSize}
          onChange={handleBitSizeChange}
        />


        <svg width="1200" height="900">
          <circle className="circle" cx="400" cy="350" fill="blue" />
        </svg>
        <div>Signature Size: {bitSize * 256}</div>
      </div>
      <div className='wots'>
        <div>
          <h1>WOTS saving space in exchange for Time</h1>
          <p>If you have been through the WOTS tutorial, you know WOTS works on the principle of chain hashing
            i.e to sign '4', it will hash the secret key 4 times
            How will it save space?
            WOTS converts the message into the 256bits message digest and then sign it.
            As you can see below, the signature size will always remain the same, what will change is the time required to sign depending on how many times we need to hash the byte.</p>
        </div>

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
          <input type="range" min="1" max="256" value={numHashes} onChange={handleInputChange} style={{ width: '30%', margin: '20px auto', display: 'block' }} />
          <p>Number of Hashes: {numHashes}</p>
        </div>
      </div>
      </div>
      <div className="textfield">
                <p>
                    The following gives us some intuition about the space-time trade-off in lamport and wots OTS.
                    <br></br>
                    Lamport uses more storage but in turn takes less time to compute whereas WOTS takes more time to computes and takes less storage.
                    <br></br>
                    Now that we have an understanding of how One time signatures work, Let us look into Few-Time Signatures or FTS with the example of  <a href="/hors">HORS.</a>
                    <br></br>
                   
                </p>

            </div>
    </div>
  );
};

export default SpaceTime;
