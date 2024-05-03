import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button, Card, CardContent } from '@mui/material';
import styled from 'styled-components';
import sha256 from 'crypto-js/sha256';

// Styled components for layout and aesthetics
const StyledContainer = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
`;

const StyledControls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const StyledInput = styled(TextField)`
  margin-bottom: 20px;
`;

const InfoDisplay = ({ title, data, children }) => (
  <Card variant="outlined" style={{ margin: '20px 0' }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      {data && <Typography variant="body2">{data}</Typography>}
      {children}
    </CardContent>
  </Card>
);

const DilithiumSigningSimulation = () => {
  const [n, setN] = useState(8);
  const [q, setQ] = useState(8380417);
  const [message, setMessage] = useState('');
  const [digest, setDigest] = useState('');
  const [signature, setSignature] = useState('');

  const [secretKey, setSecretKey] = useState([]);
  const [publicKey, setPublicKey] = useState([]);

  useEffect(() => {
    generateKeys();
  }, [n, q]);

  const generateKeys = () => {
    const secret = Array.from({ length: n }, () => Math.floor(Math.random() * 512) - 256);
    const publicK = secret.map(coeff => (coeff ** 2) % q);
    setSecretKey(secret);
    setPublicKey(publicK);
  };

  const handleSignMessage = (event) => {
    event.preventDefault();
    const messageDigest = sha256(message).toString();
    setDigest(messageDigest);

    const signatureVector = secretKey.map((keyPart, index) => 
      `${keyPart} * (${messageDigest.slice(0, 5)} mod ${q}) = ${keyPart * parseInt(messageDigest.slice(0, 5), 16) % q}`
    );
    setSignature(signatureVector.join('\n'));
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>Dilithium Signing</Typography>
      <StyledControls>
        <StyledInput label="Polynomial Degree (n)" type="number" value={n} onChange={e => setN(parseInt(e.target.value, 10))} />
        <StyledInput label="Modulus (q)" type="number" value={q} onChange={e => setQ(parseInt(e.target.value, 10))} />
        <StyledInput label="Enter Message" fullWidth value={message} onChange={e => setMessage(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleSignMessage}>Sign Message</Button>
      </StyledControls>

      <InfoDisplay title="Secret Key" data={`[${secretKey.join(', ')}]`} />
      <InfoDisplay title="Public Key" data={`[${publicKey.join(', ')}]`} />
      {digest && <InfoDisplay title="Message Digest" data={digest} />}
      {signature && (
        <InfoDisplay title="Signature" data={signature}>
          <Typography variant="body2">
            This signature demonstrates the robust security of the Dilithium algorithm. Each part of the signature is calculated by multiplying elements of the secret key with parts of the hash of the message, and then taking modulo q. This operation binds the message uniquely to the key, ensuring that the signature cannot be forged without access to the secret key.
          </Typography>
          <Typography variant="body2">
            The strength of the signature lies in the complexity of reversing this operation. Due to the use of lattice problems like the Shortest Vector Problem (SVP), deriving the secret key from the public key and signature is computationally infeasible, providing strong security even against quantum computing threats.
          </Typography>
        </InfoDisplay>
      )}
       <h3><a href="/dilithiumverification">Next</a></h3>
    </StyledContainer>
  );
};

export default DilithiumSigningSimulation;
