import React, { useState } from 'react';
import { randomInt } from 'mathjs';
import styled from 'styled-components';
import { Typography, Button } from '@mui/material';

const Container = styled.div`
  padding: 20px;
`;

const ResultDisplay = styled.div`
  margin-top: 10px;
  font-family: monospace;
  color: green;
`;

function VectorInput({ matrix, mod }) {
  const [vector, setVector] = useState([]);
  const [result, setResult] = useState([]);

  const handleGenerateVector = () => {
    const newVector = Array.from({ length: matrix[0].length }, () => randomInt(mod));
    setVector(newVector);
    computeResult(newVector);
  };

  const computeResult = (vec) => {
    const newResult = matrix.map(row =>
      row.reduce((acc, value, index) => (acc + value * vec[index]) % mod, 0)
    );
    setResult(newResult);
  };

  const isZeroVector = () => {
    return result.every(value => value === 0);
  };

  return (
    <Container>
      <Typography variant="h6">Vector Testing</Typography>
      <Typography>
        Generate and test vectors 'z'. If 'Az mod q' results in a zero vector, then 'z' is a solution to the SIS problem.
      </Typography>
      <Typography>
        Vector (Randomly Generated): {vector.join(' ')}
      </Typography>
      <Button onClick={handleGenerateVector} variant="contained" color="primary">Generate and Test Vector</Button>
      {vector.length > 0 && (
        <>
          <ResultDisplay>
            Az mod {mod}: {result.join(' ')}
          </ResultDisplay>
          <ResultDisplay>
            Result:
            {isZeroVector() ? 'Vector satisfies Az ≡ 0 mod q' : 'Vector does not satisfy'}
      </ResultDisplay>
    </>
  )}
</Container>
);
}

export default VectorInput;