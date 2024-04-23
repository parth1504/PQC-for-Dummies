import React, { useState, useEffect } from 'react';

function generateLattice(dimensions, size = 10, scale = 1) {
    const points = [];
    for (let i = -size; i <= size; i++) {
      for (let j = -size; j <= size; j++) {
        // In a real lattice, you would scale by the basis vectors, but for simplicity,
        // we are using a uniform scale here and only in 2D space.
        points.push({ x: i * scale, y: j * scale });
      }
    }
    return points;
  }

function findShortestVector(points) {
    let shortestVector = null;
    let shortestDistance = Infinity;
    let operations = 0; // To count the number of operations

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

        operations++; // Increment the operations count for each comparison

        // We check if the distance is not zero to avoid the trivial solution
        // where a vector is compared with itself, resulting in zero distance.
        if (distance < shortestDistance && distance > 0) {
            shortestDistance = distance;
            shortestVector = { x: p2.x - p1.x, y: p2.y - p1.y };
        }
        }
    }

    return { shortestVector, operations };
}
  

const SVPCVPTWO = ({ dimensions }) => {
  const [points, setPoints] = useState([]);
  const [shortestVector, setShortestVector] = useState(null);
  const [operations, setOperations] = useState(0);

  useEffect(() => {
    const newPoints = generateLattice(dimensions);
    setPoints(newPoints);

    // Simulate finding the shortest vector with an animated search
    const { vector, opCount } = findShortestVector(newPoints);
    setShortestVector(vector);
    setOperations(opCount);
  }, [dimensions]);

  // Visual representation would be more abstract for higher dimensions
  // For example, using a progress bar or counter to represent operations
  return (
    <div>
      <h3>Lattice Complexity Visualization</h3>
      <div>
        <p>Dimensions: {dimensions}</p>
        <p>Number of Points: {points.length}</p>
        <p>Shortest Vector: {shortestVector ? shortestVector.toString() : 'Calculating...'}</p>
        <p>Operations Required: {operations}</p>
      </div>
    </div>
  );
};

export default SVPCVPTWO