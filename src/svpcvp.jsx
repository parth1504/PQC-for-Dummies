import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Line} from '@react-three/drei';
import * as THREE from 'three';
import ArrowHelper from './arrowhelper';

const SVPCVP = () => {
 const [basis, setBasis] = useState({
   x1: 2, y1: 0, z1: 0,
   x2: 0, y2: 2, z2: 0,
   x3: 0, y3: 0, z3: 2
 });
 const [arbitraryPoint, setArbitraryPoint] = useState(new THREE.Vector3(3, 3, 3));
 const [points, setPoints] = useState([]);
 const [closestPoint, setClosestPoint] = useState(new THREE.Vector3());
 const [shortestVector, setShortestVector] = useState(new THREE.Vector3());

 useEffect(() => {
   generatePoints();
 }, [basis]);

 const generatePoints = () => {
   const pts = [];
   const size = 5;
   for (let i = -size; i <= size; i++) {
     for (let j = -size; j <= size; j++) {
       for (let k = -size; k <= size; k++) {
         pts.push(new THREE.Vector3(
           i * basis.x1 + j * basis.x2 + k * basis.x3,
           i * basis.y1 + j * basis.y2 + k * basis.y3,
           i * basis.z1 + j * basis.z2 + k * basis.z3
         ));
       }
     }
   }
   setPoints(pts);
   findSVPandCVP(pts);
 };

 const findSVPandCVP = (pts) => {
   let svpDist = Infinity;
   let cvpDist = Infinity;
   let svpVec = new THREE.Vector3();
   let cvpVec = new THREE.Vector3();

   pts.forEach(pt => {
     const dist = pt.length();
     if (dist > 0 && dist < svpDist) {
       svpDist = dist;
       svpVec.copy(pt);
     }

     const distanceToArbitrary = pt.distanceTo(arbitraryPoint);
     if (distanceToArbitrary < cvpDist) {
       cvpDist = distanceToArbitrary;
       cvpVec.copy(pt);
     }
   });

   setShortestVector(svpVec);
   setClosestPoint(cvpVec);
 };

 const updateArbitraryPoint = (componentIndex, value) => {
   const updatedPoint = arbitraryPoint.clone();
   updatedPoint.setComponent(componentIndex, parseFloat(value));
   setArbitraryPoint(updatedPoint);
   findSVPandCVP(points);
 };

 return (
   <div style={{ width: '100%', height: '100vh' }}>
     <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
       <ambientLight intensity={0.5} />
       <pointLight position={[20, 20, 20]} />
       {points.map((point, index) => (
         <Sphere key={index} args={[0.1, 16, 16]} position={point.toArray()}>
           <meshStandardMaterial color="blue" />
         </Sphere>
       ))}
       <Sphere args={[0.2, 16, 16]} position={arbitraryPoint.toArray()} color="red" />
       <Line points={[arbitraryPoint.toArray(), closestPoint.toArray()]} color="orange" lineWidth={5} />
       <Line points={[[0, 0, 0], shortestVector.toArray()]} color="violet" lineWidth={5} />

       {/* Basis vectors visualized as arrows */}
       <ArrowHelper direction={[1, 0, 0]} position={[0, 0, 0]} length={10} color="red" />
       <ArrowHelper direction={[0, 1, 0]} position={[0, 0, 0]} length={10} color="green" />
       <ArrowHelper direction={[0, 0, 1]} position={[0, 0, 0]} length={10} color="blue" />

       <OrbitControls />
     </Canvas>
     <div style={{ position: 'absolute', top: 750, left: 20, background: 'white', padding: '10px', border: '1px solid black', borderRadius: '5px' }}>
       <h3>Lattice Controls</h3>
       <div>
         <label>Arbitrary Point X:
           <input type="range" min="-10" max="10" step="0.1"
             value={arbitraryPoint.x} onChange={e => updateArbitraryPoint(0, e.target.value)} />
         </label>
         <label>Arbitrary Point Y:
           <input type="range" min="-10" max="10" step="0.1"
             value={arbitraryPoint.y} onChange={e => updateArbitraryPoint(1, e.target.value)} />
         </label>
         <label>Arbitrary Point Z:
           <input type="range" min="-10" max="10" step="0.1"
             value={arbitraryPoint.z} onChange={e => updateArbitraryPoint(2, e.target.value)} />
         </label>
       </div>
       <div style={{ marginTop: '10px' }}>
         <p>Shortest Vector: [{shortestVector.x.toFixed(2)}, {shortestVector.y.toFixed(2)}, {shortestVector.z.toFixed(2)}]
           (Length: {shortestVector.length().toFixed(2)})
         </p>
         <p>Closest Point to Arbitrary Point: [{closestPoint.x.toFixed(2)}, {closestPoint.y.toFixed(2)}, {closestPoint.z.toFixed(2)}]
           (Distance: {closestPoint.distanceTo(arbitraryPoint).toFixed(2)})
         </p>
       </div>
       <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', marginTop: '20px' }}>
         <h2>Understanding Lattice Problems in Cryptography</h2>
         <p>
           A lattice is a discrete set of points in a vector space, generated by a set of linearly independent basis vectors.
           Each point in the lattice can be expressed as a linear combination of the basis vectors with integer coefficients.
         </p>
         <p>
           The Shortest Vector Problem (SVP) asks to find the shortest nonzero vector in a given lattice.
           Mathematically, for a lattice L, the SVP is to find a vector v ∈ L, v ≠ 0, such that ||v|| ≤ ||u|| for all u ∈ L, u ≠ 0.
           Here, ||v|| denotes the Euclidean norm (length) of the vector v.
         </p>
         <p>
           The Closest Vector Problem (CVP) asks to find the closest lattice point to a given target vector that may not belong to the lattice.
           Formally, for a lattice L and a target vector t, the CVP is to find a vector v ∈ L such that ||t - v|| ≤ ||t - u|| for all u ∈ L.
         </p>
         <p>
           Both SVP and CVP are fundamental problems in lattice theory and have applications in various fields, including cryptography, communication theory, and optimization.
           Their difficulty stems from the exponential growth of lattice complexity as dimensions increase, often requiring deep mathematical strategies like lattice basis reduction for practical approximations.
         </p>
         <h3>Visualization</h3>
         <p>
           In this visualization, the blue spheres represent the points of the lattice generated by the basis vectors (red)
           </p>
           </div>
           </div>
           </div>
 );
}
export default SVPCVP