import React from 'react';

const CustomTriangleNode = ({ text, width, height }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100">
        <polygon points="50,0 100,100 0,100" fill="#B0D9B1" />
        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="16">
          WOTS
        </text>
      </svg>
    );
  };

export default CustomTriangleNode;