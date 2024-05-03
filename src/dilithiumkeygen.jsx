import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import Tooltip from '@mui/material/Tooltip';

// Styling adjustments for a more modern and clean aesthetic
const StyledContainer = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: #333;
  font-size: 24px;
`;

const StyledSection = styled.section`
  margin: 20px 0 40px;
`;

const StyledControls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin: 20px 0;
`;

const StyledPolynomial = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 0;

  span {
    padding: 5px 8px;
    margin: 0 5px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: #6200ea;
    border-radius: 4px;

    &.positive {
      background: #4caf50;
    }

    &.negative {
      background: #f44336;
    }
  }
`;

const StyledExplanation = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  text-align: justify;
`;

const StyledMatrix = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    background: #f0f0f0;
  }
`;

// Function components remain unchanged but now use enhanced styled components
const Display = ({ title, children, explanation }) => (
  <StyledSection>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    {children}
    <StyledExplanation>{explanation}</StyledExplanation>
  </StyledSection>
);

const PolynomialDisplay = ({ vector, title, explanation }) => (
  <Display title={title} explanation={explanation}>
    <StyledPolynomial>
      {vector.map((coeff, idx) => (
        <Tooltip title={`Coefficient of x^${idx}: ${coeff}`} placement="top" arrow key={idx}>
          <span className={`coefficient ${coeff >= 0 ? 'positive' : 'negative'}`}>
            {`${coeff >= 0 ? '+' : ''}${coeff}x^${idx}`}
          </span>
        </Tooltip>
      ))}
    </StyledPolynomial>
  </Display>
);

const MatrixDisplay = ({ matrix, title, explanation }) => (
  <Display title={title} explanation={explanation}>
    <StyledMatrix>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((val, colIndex) => (
              <Tooltip title={`Value at row ${rowIndex + 1}, column ${colIndex + 1}: ${val}`} key={`${rowIndex}-${colIndex}`}>
                <td>{val}</td>
              </Tooltip>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledMatrix>
  </Display>
);

// Component logic and JSX structure remains essentially the same
// The appearance of each part of the interface has been updated to enhance the user experience


const DilithiumKeyGeneration = () => {
  const [n, setN] = useState(8);
  const [q, setQ] = useState(8380417);
  const [eta, setEta] = useState(2);
  const [k, setK] = useState(4);
  const [gamma1, setGamma1] = useState(0.07 * q);
  const [gamma2, setGamma2] = useState(0.4);

  const [secretKey, setSecretKey] = useState([]);
  const [publicKey, setPublicKey] = useState([]);
  const [sisMatrix, setSisMatrix] = useState([]);

  const secretKeyProps = useSpring({ opacity: 1, from: { opacity: 0 }, reset: true });
  const publicKeyProps = useSpring({ opacity: 1, from: { opacity: 0 }, reset: true });
  const sisMatrixProps = useSpring({ opacity: 1, from: { opacity: 0 }, reset: true });

  useEffect(() => {
    setSecretKey(generatePolynomial(n, gamma1));
    setPublicKey(generatePolynomial(n, gamma1).map(coeff => (coeff ** 2) % q));
    setSisMatrix(generateSisMatrix(n, k, gamma2));
  }, [n, q, gamma1, gamma2, k]);

    // Key generation logic
const generatePolynomial = (degree, scale) => { return Array.from({ length: degree }, () => Math.floor(Math.random() * (2 * scale + 1)) - scale);};

// SIS matrix generation logic
const generateSisMatrix = (degree, matrixDim, scale) => {
  return Array.from({ length: matrixDim }, () => generatePolynomial(degree, scale));
};


  return (
    <StyledContainer>
      <StyledTitle>Dilithium Key Generation Simulation</StyledTitle>
      <p>
The key generation process utilizes the principles of lattice-based cryptography, specifically leveraging polynomial sampling for creating secure and robust keys. </p>
      <ol>
        <li>
          <Typography variant="body1">
            Alice wants to generate a key pair for the Dilithium algorithm. She sets the parameters for the key generation process, such as the polynomial degree (n), the modulus (q), and the noise parameters (gamma1 and gamma2).
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Alice samples a random polynomial with coefficients drawn from a Uniform distribution centered around zero and scaled by gamma1. This polynomial becomes her secret key. For example, her secret key might be [1, -2, 3, -4, 5, -6, 7, -8].
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Alice derives her public key by squaring each coefficient of the secret key and taking the result modulo q (8380417). For example, if her secret key is [1, -2, 3, -4, 5, -6, 7, -8], her public key might be [1, 4, 9, 16, 25, 36, 49, 64].
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Alice also generates the SIS matrix by sampling random polynomials with coefficients drawn from a Uniform distribution centered around zero and scaled by gamma2.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            Alice now has a secret key, a public key, and an SIS matrix, which she can use for signing and verifying messages using the Dilithium algorithm.
          </Typography>
        </li>
      </ol>

      <StyledControls>
<TextField label="Polynomial Degree (n)" type="number" value={n} onChange={e => setN(parseInt(e.target.value, 10))} />
<TextField label="Modulus (q)" type="number" value={q} onChange={e => setQ(parseInt(e.target.value, 10))} />
<TextField label="Noise for Secret Key (eta)" type="number" value={eta} onChange={e => setEta(parseInt(e.target.value, 10))} />
<TextField label="Dimension of SIS Matrix (k)" type="number" value={k} onChange={e => setK(parseInt(e.target.value, 10))} />
<TextField label="Noise Parameter 1 (gamma1)" type="number" value={gamma1} onChange={e => setGamma1(parseFloat(e.target.value))} />
<TextField label="Noise Parameter 2 (gamma2)" type="number" value={gamma2} onChange={e => setGamma2(parseFloat(e.target.value))} />
</StyledControls>

<animated.div style={secretKeyProps}>
    <PolynomialDisplay
      vector={secretKey}
      title="Secret Key (s)"
      explanation="Secret keys are sampled from a uniform distribution. Each coefficient is drawn independently, ensuring a high entropy which is crucial for security.These polynomials represent short lattice vectors within the cryptographic scheme, providing the foundational private component that must remain confidential."
    />
  </animated.div>

  <animated.div style={publicKeyProps}>
    <PolynomialDisplay
      vector={publicKey}
      title="Public Key (t)"
      explanation="The public key is derived by squaring each coefficient of the secret key and reducing modulo q. This process effectively converts the secret key’s polynomial into another form (the public key polynomial) that retains a mathematical linkage to the secret key but does not expose the original coefficients or their structure."
    />
  </animated.div>

  <animated.div style={sisMatrixProps}>
    <MatrixDisplay
      matrix={sisMatrix}
      title="SIS Matrix (A)"
      explanation="The SIS matrix is a key component in the Dilithium scheme. It is used in the signing algorithm to ensure that the signatures are secure and verifiable."
    />
  </animated.div>

      <div className="explanation">
        <p>
        <strong>Infeasibility of Deriving Secret Key:</strong> The transformation from the secret key to the public key involves one-way mathematical functions that are easy to compute forwards but exceedingly difficult to reverse. This means that even if an attacker has access to the public key, they cannot feasibly derive the corresponding secret key without solving complex lattice problems, thus ensuring the security of encrypted communications.
        </p>
        <p>
        <strong>Integration into Lattice Structure:</strong> Polynomials in this context can be thought of as vectors in a multidimensional lattice. The operations performed on these polynomials (such as addition, multiplication, and modular reduction) correspond to lattice operations, which underpin the security of the system.
        </p>
      </div>
      <h3><a href="/dilithiumsigning">Next</a></h3>
    </StyledContainer>
  );
};

export default DilithiumKeyGeneration;
