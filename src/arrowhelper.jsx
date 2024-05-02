import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

const ArrowHelper = ({ direction = [0, 0, 1], position = [0, 0, 0], length = 10, color = 'red' }) => {
  const { scene } = useThree();
  const arrowHelper = useRef();

  useEffect(() => {
    // Ensure direction is always an array with three elements
    const normalizedDirection = Array.isArray(direction) && direction.length === 3
      ? direction.map(Number).filter(n => !isNaN(n))
      : [0, 0, 1];

    const dir = new THREE.Vector3(...normalizedDirection).normalize();
    const origin = new THREE.Vector3(...position);

    if (!arrowHelper.current) {
      const arrow = new THREE.ArrowHelper(dir, origin, length, color);
      arrowHelper.current = arrow;
      scene.add(arrow);
    } else {
      // Update the arrow properties if it already exists
      arrowHelper.current.setDirection(dir);
      arrowHelper.current.setLength(length);
      arrowHelper.current.setColor(new THREE.Color(color));
      arrowHelper.current.position.copy(origin);
    }

    return () => {
      if (arrowHelper.current) {
        scene.remove(arrowHelper.current);
      }
    };
  }, [scene, direction, position, length, color]);

  return null;
};

export default ArrowHelper;
