import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { Grid, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import Tooltip from '@mui/material/Tooltip'; // Import a tooltip component for detailed explanations

/**
 * Displays each polynomial term clearly, helping users understand how each part of the key is constructed.
 * The Tooltip component provides an on-demand detailed explanation of what each coefficient represents.
 */
const PolynomialDisplay = ({ vector, title, explanation }) => (
  <div className="polynomial-display">
    <h3>{title}</h3>
    <div className="polynomial">
      {vector.map((coeff, idx) => (
        <Tooltip title={`Coefficient of x^${idx}: ${coeff}`} placement="top" arrow>
          <span key={idx} className={`coefficient ${coeff >= 0 ? 'positive' : 'negative'}`}>
            {coeff !== 0 ? `${coeff > 0 ? '+' : ''}${coeff}x^${idx}` : ''}
          </span>
        </Tooltip>
      ))}
    </div>
    <p>{explanation}</p>
  </div>
);

/**
 * Detailed interactive explanation of how matrices function in cryptographic schemes, especially for the SIS problem.
 */
const MatrixDisplay = ({ matrix, title, explanation }) => (
  <div className="matrix-display">
    <h3>{title}</h3>
    <table>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((val, colIndex) => (
              <Tooltip title={`Matrix value at row ${rowIndex + 1}, column ${colIndex + 1}: ${val}`} placement="top" arrow>
                <td key={colIndex}>{val}</td>
              </Tooltip>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <p>{explanation}</p>
  </div>
);

/**
 * DilithiumKeyGeneration component simulates the process of key generation, including interactive and educational tooltips
 * explaining the sampling and significance of polynomial coefficients and matrix entries.
 */
const DilithiumKeyGeneration = () => {
  const [n, setN] = useState(8);
  const [q, setQ] = useState(8380417);
  const [eta, setEta] = useState(2);
  const [k, setK] = useState(20);
  const [gamma1, setGamma1] = useState(0.07 * q);
  const [gamma2, setGamma2] = useState(0.5);

  const [secretKey, setSecretKey] = useState([]);
  const [publicKey, setPublicKey] = useState([]);
  const [sisMatrix, setSisMatrix] = useState([]);

  const secretKeyProps = useSpring({ opacity: 1, from: { opacity: 0 }, reset: true });
  const publicKeyProps = useSpring({ opacity: 1, from: { opacity: 0 }, reset: true });
  const sisMatrixProps = useSpring({ opacity: 1, from: { opacity: 0 }, reset: true });

  useEffect(() => {
    // Generates random coefficients for polynomials based on a Gaussian distribution scaled by the noise parameter
    function generatePolynomial(degree, scale) {
      return Array.from({ length: degree }, () => Math.floor(Math.random() * (2 * scale + 1)) - scale);
    }

    setSecretKey(generatePolynomial(n, gamma1));
    setPublicKey(generatePolynomial(n, gamma1));
    setSisMatrix(Array.from({ length: n }, () => generatePolynomial(n, gamma2)));
  }, [n, gamma1, gamma2]);

  return (
    <div className="key-generator-container">
      <h1>Dilithium Key Generation Simulation</h1>
      <Typography variant="h5" gutterBottom>Key Generation</Typography>
<Typography variant="body1" gutterBottom>
  The Dilithium key generation process involves sampling random polynomials from a discrete Gaussian distribution. These polynomials form the secret key and the public key.
</Typography>
<Typography variant="body1" gutterBottom>
  The secret key is a random polynomial with coefficients drawn from a Gaussian distribution centered around zero. This ensures that the secret key has high entropy and is difficult to guess.
</Typography>
<Typography variant="body1" gutterBottom>
  The public key is derived from the secret key by applying a specific transformation. In the case of Dilithium, the public key is obtained by squaring each coefficient of the secret key and taking the result modulo a large prime number (8380417).
</Typography>
<Typography variant="body1" gutterBottom>
  The key generation process also involves creating a matrix called the "SIS matrix," which is used in the signature generation and verification processes. The SIS matrix is a random matrix with coefficients drawn from a Gaussian distribution.
</Typography>
<Typography variant="body1" gutterBottom>
  The security of the Dilithium algorithm relies on the hardness of two mathematical problems: the Module-LWE (Learning with Errors) problem and the SIS (Short Integer Solution) problem. These problems are believed to be difficult to solve, even for quantum computers, which provides the post-quantum security of Dilithium.
</Typography>
<Typography variant="h6" gutterBottom>Example</Typography>
<Typography variant="body1" gutterBottom>
  Let's go through an example of key generation:
</Typography>
<ol>
  <li>
    <Typography variant="body1">
      Alice wants to generate a key pair for the Dilithium algorithm. She sets the parameters for the key generation process, such as the polynomial degree (n), the modulus (q), and the noise parameters (gamma1 and gamma2).
    </Typography>
  </li>
  <li>
    <Typography variant="body1">
      Alice samples a random polynomial with coefficients drawn from a Gaussian distribution centered around zero and scaled by gamma1. This polynomial becomes her secret key. For example, her secret key might be [1, -2, 3, -4, 5, -6, 7, -8].
    </Typography>
  </li>
  <li>
    <Typography variant="body1">
      Alice derives her public key by squaring each coefficient of the secret key and taking the result modulo q (8380417). For example, if her secret key is [1, -2, 3, -4, 5, -6, 7, -8], her public key might be [1, 4, 9, 16, 25, 36, 49, 64].
    </Typography>
  </li>
  <li>
    <Typography variant="body1">
      Alice also generates the SIS matrix by sampling random polynomials with coefficients drawn from a Gaussian distribution centered around zero and scaled by gamma2.
    </Typography>
  </li>
  <li>
    <Typography variant="body1">
      Alice now has a secret key, a public key, and an SIS matrix, which she can use for signing and verifying messages using the Dilithium algorithm.
    </Typography>
  </li>
</ol>
      <div className="controls">
        {/* Interactive sliders or input fields with explanations */}
        <label>Polynomial Degree (n): <input type="number" value={n} onChange={e => setN(parseInt(e.target.value, 10))} /></label>
        <label>Modulus (q): <input type="number" value={q} onChange={e => setQ(parseInt(e.target.value, 10))} /></label>
        <label>Error Range (eta): <input type="number" value={eta} onChange={e => setEta(parseInt(e.target.value, 10))} /></label>
        <label>Dimension (k): <input type="number" value={k} onChange={e => setK(parseInt(e.target.value, 10))} /></label>
        <label>Noise Parameter (gamma1): <input type="number" value={gamma1} onChange={e => setGamma1(parseFloat(e.target.value))} /></label>
        <label>Noise Parameter (gamma2): <input type="number" value={gamma2} onChange={e => setGamma2(parseFloat(e.target.value))} /></label>
      </div>
      <animated.div style={secretKeyProps}>
        <PolynomialDisplay 
          vector={secretKey} 
          title="Secret Key (s)" 
          explanation="Secret keys are sampled from a discrete Gaussian distribution centered around zero with a standard deviation defined by the gamma parameter. This process ensures the hardness of the Dilithium scheme by embedding high entropy into the key structure."
        />
      </animated.div>
      <animated.div style={publicKeyProps}>
        <PolynomialDisplay 
          vector={publicKey} 
          title="Public Key (t)"
          explanation="Public keys follow the same sampling process but are used in the verification phase of the cryptographic protocol, ensuring that they are compatible with the corresponding secret keys while remaining computationally infeasible to invert."
        />
      </animated.div>
      <animated.div style={sisMatrixProps}>
        <MatrixDisplay 
          matrix={sisMatrix} 
          title="SIS Matrix (A)"
          explanation="The SIS matrix is integral to setting up the lattice basis for the SIS problem, where the challenge lies in finding a short vector that is orthogonal to all rows of the matrix under modulo q arithmetic."
        />
      </animated.div>
      <div className="explanation">
        <p>
          <strong>Module-LWE and SIS in Dilithium:</strong> These foundational cryptographic challenges utilize the algebraic structure of polynomials and matrices to create computationally hard problems. The security of the Dilithium scheme hinges on the complexity of solving these problems under quantum computational assumptions.
        </p>
      </div>
    </div>
  );
};

export default DilithiumKeyGeneration;
