import React from 'react';
import LatticeAnimation from './latticeanimation'; // Importing the animation component

const LatticeCryptography = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Lattice-Based Cryptography</h1>
      <p>Explore the fundamental concept of lattice points and basis vectors in cryptography.</p>
      <LatticeAnimation />
    </div>
  );
};

export default LatticeCryptography;
