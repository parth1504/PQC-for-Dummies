import React, { useState, useEffect } from 'react';
// Assuming pqcrypto.js is installed and supports ES modules
import {sphincs} from 'sphincs';
import {dilithium} from 'dilithium-crystals';

const CryptoComparison = () => {
  const [signatureSize, setSignatureSize] = useState(1024);
  const [application, setApplication] = useState('digital signature');
  const [sphincsPerformance, setSphincsPerformance] = useState(0);
  const [dilithiumPerformance, setDilithiumPerformance] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState({ sphincs: 0, dilithium: 0 });
  const [signatureVerificationTime, setSignatureVerificationTime] = useState({
    sphincs: 0,
    dilithium: 0,
  });
  const [sphincsProgress, setSphincsProgress] = useState('');
  const [dilithiumProgress, setDilithiumProgress] = useState('');


  useEffect(() => {
    (async () => {
      await compareAlgorithms();
    })();
  }, [signatureSize, application]);

  const handleSignatureSizeChange = (event) => {
    setSignatureSize(Number(event.target.value));
  };

  const handleApplicationChange = (event) => {
    setApplication(event.target.value);
  };

  const compareAlgorithms = async () => {
    try {
      const message = new Uint8Array(signatureSize).fill(1); // Simulated message for signing

      // SPHINCS+ Simulation
      const sphincsStart = performance.now();
      setSphincsProgress('Generating key pair...');
      const sphincsKeyPair = await sphincs.keyPair();
      setSphincsProgress('Key pair generated. Signing message...');
      const sphincsSignature = await sphincs.sign(message, sphincsKeyPair.privateKey);
      setSphincsProgress('Message signed. Verifying signature...');
      const sphincsEnd = performance.now();
      setSphincsPerformance(sphincsEnd - sphincsStart);

      // SPHINCS+ Verification Simulation
      
      const sphincsVerificationStart = performance.now();
      await sphincs.open(sphincsSignature, sphincsKeyPair.publicKey);
      const sphincsVerificationEnd = performance.now();
      setSignatureVerificationTime(prevTime => ({ ...prevTime, sphincs: sphincsVerificationEnd - sphincsVerificationStart }));
      setSphincsProgress('Signature verified.');

      // Crystals-Dilithium Simulation
      const dilithiumStart = performance.now();
      setDilithiumProgress('Generating key pair...');
      const dilithiumKeyPair = await dilithium.keyPair();
      setDilithiumProgress('Key pair generated. Signing message...');
      const dilithiumSignature = await dilithium.sign(message, dilithiumKeyPair.privateKey);
      setDilithiumProgress('Message signed. Verifying signature...');
      const dilithiumEnd = performance.now();
      setDilithiumPerformance(dilithiumEnd - dilithiumStart);
      

      // Crystals-Dilithium Verification Simulation
      const dilithiumVerificationStart = performance.now();
      await dilithium.open(dilithiumSignature, dilithiumKeyPair.publicKey);
      const dilithiumVerificationEnd = performance.now();
      setSignatureVerificationTime(prevTime => ({ ...prevTime, dilithium: dilithiumVerificationEnd - dilithiumVerificationStart }));
      setDilithiumProgress('Signature verified.');

    } catch (error) {
      console.error('Error in compareAlgorithms:', error);
    }
  };

  return (
    <div>
      <h2>Crypto Algorithm Comparison</h2>
      <div>
        <label htmlFor="signatureSize">Signature Size:</label>
        <input
          type="range"
          id="signatureSize"
          min="1024"
          max="4096"
          step="256"
          value={signatureSize}
          onChange={handleSignatureSizeChange}
        />
        <span>{signatureSize} bytes</span>
      </div>
      <div>
        <label htmlFor="application">Application:</label>
        <select id="application" value={application} onChange={handleApplicationChange}>
          <option value="digital signature">Digital Signature</option>
          <option value="encryption">Encryption</option>
          <option value="key exchange">Key Exchange</option>
        </select>
      </div>
      <div>
        <h3>Performance Comparison</h3>
        <p>SPHINCS+ performance: {sphincsPerformance.toFixed(2)} ms</p>
        <p>Crystals-Dilithium performance: {dilithiumPerformance.toFixed(2)} ms</p>
        <p>SPHINCS+ signature verification time: {signatureVerificationTime.sphincs.toFixed(2)} ms</p>
        <p>Crystals-Dilithium signature verification time: {signatureVerificationTime.dilithium.toFixed(2)} ms</p>
        
        {/* Display the progress of each algorithm */}
        <div>
          <h4>SPHINCS+ Progress</h4>
          <p>{sphincsProgress}</p>
        </div>
        <div>
          <h4>Crystals-Dilithium Progress</h4>
          <p>{dilithiumProgress}</p>
      </div>
    </div>

    </div>
  );
};

export default CryptoComparison;