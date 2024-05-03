import React, { useState } from 'react';
import { Typography, Container, Slider } from '@mui/material';
import MatrixInput from './matrixinput';  // Ensure paths are correct
import VectorInput from './vectorinput';  // Ensure paths are correct

function SIS() {
    const [dimension, setDimension] = useState(5); // Start with a low dimension
    const [potentialSolutions, setPotentialSolutions] = useState(Math.pow(3, 5));
    const [matrix, setMatrix] = useState([]);
    const [mod, setMod] = useState(5);

    const handleMatrixChange = (newMatrix) => {
        setMatrix(newMatrix);
    };

    const handleDimensionChange = (event, newValue) => {
        setDimension(newValue);
        updateComplexity(newValue);
    };

    const updateComplexity = (dim) => {
        const complexity = Math.pow(3, dim);
        setPotentialSolutions(complexity);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Short Integer Solution (SIS) Visualization Tool
            </Typography>
            <Typography paragraph>
                Welcome to the SIS Visualization Tool! This tool is designed to help users understand and explore the Short Integer Solution problem in lattice-based cryptography. By interacting with this tool, users can generate matrices and vectors to visually and numerically investigate how the SIS problem is approached and potentially solved.
            </Typography>
            <Typography paragraph>
                The Short Integer Solution problem is a fundamental problem in lattice-based cryptography. It involves finding a nonzero integer vector that, when multiplied by a given matrix and reduced modulo a certain integer, results in a zero vector. This problem's complexity underpins the security of various cryptographic systems.
            </Typography>
            <MatrixInput onMatrixChange={handleMatrixChange} />
            {matrix.length > 0 && <VectorInput matrix={matrix} mod={mod} />}
            <div style={{ padding: '20px' }}>
                <Typography variant="h5">SIS Complexity Visualizer</Typography>
                <Typography variant="body1">
                    Use the slider to change the number of dimensions and see how the complexity of finding a solution increases.
                </Typography>
                <Slider
                    value={dimension}
                    onChange={handleDimensionChange}
                    aria-labelledby="dimension-slider"
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={1}
                    max={20}
                />
                <Typography variant="h6">
                    Current Dimension: {dimension}
                </Typography>
                <Typography variant="h6">
                    Potential Solutions to Check: {potentialSolutions.toLocaleString()}
                </Typography>
            </div>
            <h3><a href="/dilithiumkeygen">Next</a></h3>
        </Container>
    );
}

export default SIS;
