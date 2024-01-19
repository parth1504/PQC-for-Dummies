import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const BitAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const bitsArray = Array.from({ length: 16 }, (_, index) => index);

    const parts = [];
    const partSize = bitsArray.length / 4;
    for (let i = 0; i < 4; i++) {
      parts.push(bitsArray.slice(i * partSize, (i + 1) * partSize));
    }

    // Calculate the spread for the animation
    const spread = 100;

    const animations = parts.map((part, index) => {
      console.log(part);
      const targets = part.map(bit => `#bit-${bit}`);
      console.log(targets);
      return anime({
        targets,
        translateX: spread * index, // Spread out the parts
        translateY: '100px', // Move downwards
        delay: 100 * index, // Delay for smooth animation
        duration: 1000, // Animation duration
        easing: 'easeOutQuad',
        elasticity: 400, // Adding a bit of bounce
      });
    });

    anime.timeline({}).add(animations);

  }, []);

  return (
    <div ref={containerRef} style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      {Array.from({ length: 16 }, (_, index) => (
        <div key={index} id={`bit-${index}`} style={{ margin: '5px', fontSize: '20px' }}>
          {index}
        </div>
      ))}
    </div>
  );
};

export default BitAnimation;
