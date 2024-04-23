import React, { useState } from 'react';

const FiatShamir = () => {
    const [message, setMessage] = useState('Hello, world!');
    const [publicKey, setPublicKey] = useState('Public-Key-Example');
    const [randomNonce, setRandomNonce] = useState('');
    const [hash, setHash] = useState('');
    const [signature, setSignature] = useState('');

    // Simulate generating a random nonce
    const generateNonce = () => {
        const nonce = "RandomNonce-" + Math.random().toString(36).substr(2, 9);
        setRandomNonce(nonce);
        return nonce;
    };

    // Simulate the hash function used in Fiat-Shamir transformation
    const generateHash = (message, nonce, publicKey) => {
        const simpleHash = message + nonce + publicKey;
        setHash(simpleHash);
        return simpleHash;
    };

    // Simulate the signature generation
    const signMessage = () => {
        const nonce = generateNonce();
        const hashOutput = generateHash(message, nonce, publicKey);
        const signature = `Signature with nonce ${nonce} and hash ${hashOutput}`;
        setSignature(signature);
    };

    return (
        <div>
            <h1>Fiat-Shamir Transformation Demonstration</h1>
            <p>
                This interactive demonstration shows how the Fiat-Shamir transformation is used to convert
                an interactive identification scheme into a non-interactive one in Crystals-Dilithium.
            </p>

            <div>
                <label>
                    Message:
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Public Key:
                    <input type="text" value={publicKey} onChange={e => setPublicKey(e.target.value)} />
                </label>
            </div>

            <button onClick={signMessage}>Generate Signature</button>

            <h2>Process Details:</h2>
            <p>Random Nonce: {randomNonce}</p>
            <p>Hash (Message, Nonce, Public Key): {hash}</p>
            <p>Signature: {signature}</p>

            <div>
                <h3>Explanation:</h3>
                <p>
                    In the identification phase of a cryptographic protocol, a prover interacts with a verifier to prove identity.
                    Traditionally, this requires multiple rounds of interaction. The Fiat-Shamir transformation, however,
                    eliminates the need for interaction by replacing the verifier's challenges with a hash of the prover's
                    public state and the message. This hash acts as a deterministic challenge that does not require any
                    back-and-forth communication, thus enabling non-interactive protocols such as digital signatures.
                </p>
                <p>
                    The transformation is crucial for practical applications where interaction is not feasible or desirable,
                    like in web authentication or blockchain transactions.
                </p>
            </div>
        </div>
    );
};

export default FiatShamir;
