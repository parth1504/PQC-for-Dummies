// dilithium-utils.js
export const randomPolynomial = (n, k, gamma) => {
    return Array.from({ length: n }, () => Math.floor(Math.random() * k));
  };
  
  export const ntt = (polynomial) => polynomial;
  
  export const invNtt = (polynomial) => polynomial;
  
  export const modPow = (base, exponent, modulus) => {
    return Math.pow(base, exponent) % modulus;
  };