import React from 'react';

const CustomTriangleNode2 = ({ text }) => {
    return (
      <svg width="50" height="50" viewBox="0 0 100 100">
        <polygon points="50,0 100,100 0,100" fill="#F2F7A1" />
        <text x="50" y="60" textAnchor="middle" fill="white" fontSize="16">
          HORST
        </text>
      </svg>
    );
  };

export default CustomTriangleNode2;