import React, { useState } from 'react';
import { randomInt } from 'mathjs';
import styled from 'styled-components';
import { Typography, TextField, Button } from '@mui/material';

const Container = styled.div`
  padding: 20px;
`;

const MatrixDisplay = styled.div`
  margin-top: 10px;
  font-family: monospace;
`;

function MatrixInput({ onMatrixChange }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [mod, setMod] = useState(5);
  const [matrix, setMatrix] = useState([]);

  const generateMatrix = () => {
    const newMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => randomInt(mod))
    );
    setMatrix(newMatrix);
    onMatrixChange(newMatrix);
  };

  return (
    <Container>
      <Typography variant="h6">Matrix Generation</Typography>
      <Typography>
        This matrix represents the basis of a lattice in R^n. Each row corresponds to a vector in the basis.
        The SIS problem involves finding a non-zero integer vector 'z' such that 'Az mod q = 0', where 'A' is this matrix.
      </Typography>
      <TextField
        label="Rows"
        type="number"
        value={rows}
        onChange={e => setRows(+e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Columns"
        type="number"
        value={cols}
        onChange={e => setCols(+e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Modulo"
        type="number"
        value={mod}
        onChange={e => setMod(+e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={generateMatrix} variant="contained" color="primary">Generate Matrix</Button>
      {matrix.length > 0 && (
        <MatrixDisplay>
          {matrix.map((row, i) => (
            <div key={i}>{row.join(' ')}</div>
          ))}
        </MatrixDisplay>
      )}
    </Container>
  );
}

export default MatrixInput;
