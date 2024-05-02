import React, { useState } from 'react';
import { Container, Typography, Slider, TextField, Button } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LearningWithErrors = () => {
    const [dimension, setDimension] = useState(5);
    const [samples, setSamples] = useState(3);
    const [errorRate, setErrorRate] = useState(0.1);

    const data = {
        labels: Array.from({ length: samples }, (_, i) => i + 1),
        datasets: [
            {
                label: 'Error Influence',
                data: Array.from({ length: samples }, () => Math.random() * errorRate),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '20px', padding: '20px' }}>
            <Typography variant="h4">Learning With Errors (LWE) Visualization Tool</Typography>
            <Typography paragraph>
                The Learning With Errors (LWE) problem is a central problem in modern cryptographic research. 
                It involves solving linear equations that have been perturbed by some small errors, which is believed to be computationally hard.
            </Typography>

            <Typography paragraph>
            <p>In mathematical terms, given a set of linear equations in a form</p>
    <InlineMath math="A \cdot \mathbf{x} \equiv \mathbf{b} \mod q" />,
    where
    <InlineMath math="A" /> is a known matrix,
    <InlineMath math="\mathbf{b}" /> is a known vector,
    <InlineMath math="\mathbf{x}" /> is the unknown solution vector, and
    <InlineMath math="q" /> is a modulus,
    the challenge in LWE is to solve for
    <InlineMath math="\mathbf{x}" />
    when each equation is slightly distorted by some error.
            </Typography>

            <Typography paragraph>
                Adjust the sliders to change parameters and observe how the error distribution impacts the LWE setup.
            </Typography>

            <Slider
                value={dimension}
                onChange={(e, newValue) => setDimension(newValue)}
                aria-labelledby="dimension-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={2}
                max={20}
                label="Dimension (n)"
            />
            <Typography>Dimension (n): {dimension}</Typography>

            <Slider
                value={samples}
                onChange={(e, newValue) => setSamples(newValue)}
                aria-labelledby="samples-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={100}
                label="Samples (m)"
            />
            <Typography>Number of Samples (m): {samples}</Typography>

            <TextField
                label="Error Rate"
                type="number"
                value={errorRate}
                onChange={(e) => setErrorRate(parseFloat(e.target.value))}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Typography>Error Rate: {errorRate}</Typography>

            <Line data={data} options={options} />

            <Typography variant="h6" style={{ marginTop: '20px' }}>
                Graph Explanation:
            </Typography>
            <Typography paragraph>
                The graph visualizes the random error added to each sample. Each point represents the error magnitude affecting one linear equation.
                Higher variability in the graph indicates more uncertainty in solving for <InlineMath math="\mathbf{x}" /> effectively, showcasing why LWE is considered hard when errors are significant.
            </Typography>
        </Container>
    );
};

export default LearningWithErrors;
