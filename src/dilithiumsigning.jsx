import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Button, TextField, Typography, Paper, Grid } from '@mui/material';

/**
 * A simplified hash function to demonstrate hashing. 
 * This is not secure for real-world use.
 * 
 * @param {string} input - The input message to hash.
 * @returns {number} - The computed hash value.
 */
const simpleHash = (input) => {
    return input.split('').reduce((acc, char) => (acc + char.charCodeAt(0) * 3) % 991, 0);
};

/**
 * Component to display the hash of a message with animation.
 * 
 * @param {string} message - The message whose hash is to be displayed.
 */
const HashDisplay = ({ message }) => {
    const hash = simpleHash(message);
    const props = useSpring({ number: hash, from: { number: 0 } });

    return (
        <div>
            <Typography variant="h6">Message Hash:</Typography>
            <animated.div>{props.number.to(n => n.toFixed(0))}</animated.div>
        </div>
    );
};

/**
 * Component to display vectors with animations and additional information.
 * 
 * @param {Array} vector - The vector to display.
 * @param {string} title - The title for the vector display.
 * @param {string} explanation - A brief explanation of how the vector is calculated.
 * @param {string} details - Detailed description of the vector's significance.
 */
const VectorDisplay = ({ vector, title, explanation, details }) => {
    const transitions = useSpring({ to: { opacity: 1, transform: 'translateX(0)' }, from: { opacity: 0, transform: 'translateX(-20px)' } });

    return (
        <animated.div style={transitions}>
            <Typography variant="h6">{title}</Typography>
            <Paper style={{ padding: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                {vector.map((value, index) => (
                    <Typography key={index} style={{ padding: '5px', background: '#f0f0f0', borderRadius: '4px' }}>{value}</Typography>
                ))}
            </Paper>
            <Typography variant="caption" display="block" style={{ marginTop: '10px' }}>{explanation}</Typography>
            <Typography variant="body2" style={{ marginTop: '10px', color: 'blue' }}>{details}</Typography>
        </animated.div>
    );
};

/**
 * The main component for the Dilithium Signing Simulation.
 * It simulates a cryptographic signing process in stages.
 */
const DilithiumSigningSimulation = () => {
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(0);
    const [challenge, setChallenge] = useState([]);
    const [response, setResponse] = useState([]);
    const [signature, setSignature] = useState([]);
    const [hash, setHash] = useState(0);

    // Dummy keys, in a real application these should be generated securely.
    const publicKey = [1, 3, 5, 7, 9, 11, 13, 15];
    const secretKey = [2, 4, 6, 8, 10, 12, 14, 16];

    /**
     * Handles the transition to the next step in the signing simulation.
     */
    const handleNextStep = () => {
        switch(step) {
            case 0:
                const computedHash = simpleHash(message);
                setHash(computedHash);
                setStep(1);
                break;
            case 1:
                const newChallenge = publicKey.map((k, i) => (k * hash + secretKey[i]) % 8380417);
                setChallenge(newChallenge);
                setStep(2);
                break;
            case 2:
                const newResponse = challenge.map((c, i) => (c + secretKey[i]) % 8380417);
                setResponse(newResponse);
                setStep(3);
                break;
            case 3:
                const sampledSignature = response.filter((r, i) => r % 2 === 0);
                setSignature(sampledSignature);
                setStep(4);
                break;
            default:
                // No further steps, possibly reset or handle completion.
                break;
        }
    };

    return (
        <Grid container spacing={2} padding={2}>
            <Grid item xs={12}>
                <TextField
                    label="Enter Message"
                    variant="outlined"
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={step !== 0}
                />
                <Button variant="contained" color="primary" onClick={handleNextStep} disabled={message === '' || step >= 4}>
                    {step === 0 ? "Generate Hash" : "Next Step"}
                </Button>
            </Grid>
            {step > 0 && <Grid item xs={12}><HashDisplay message={message} /></Grid>}
            {step > 1 && <Grid item xs={12}><VectorDisplay vector={challenge} title="Challenge Vector" explanation="Calculated from the hash of the message and the public key." details="This vector is derived by multiplying each public key element with the hash and adding a corresponding secret key element, then taking modulo a large prime." /></Grid>}
            {step > 2 && <Grid item xs={12}><VectorDisplay vector={response} title="Response Vector" explanation="Generated from the challenge vector and the secret key." details="Each element of the challenge vector is added to the corresponding element of the secret key, and the sum is taken modulo a large prime to form the response vector." /></Grid>}
            {step > 3 && <Grid item xs={12}><VectorDisplay vector={signature} title="Signature" explanation="The final signature is formed by filtering the response vector." details="Specific elements of the response vector that meet certain criteria (e.g., even numbers) are selected to form the signature." /></Grid>}
        </Grid>
    );
};

export default DilithiumSigningSimulation;
