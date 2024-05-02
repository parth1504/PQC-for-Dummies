import React, { useState } from 'react';
import { Typography, Slider, TextField, Button, Paper, Grid } from '@mui/material';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(...registerables);

const PolynomialSampling = () => {
  const [degree, setDegree] = useState(5);
  const [gaussianStdDev, setGaussianStdDev] = useState(1);
  const [uniformRange, setUniformRange] = useState(5);
  const [polynomials, setPolynomials] = useState({ gaussian: [], uniform: [] });

  const generatePolynomials = () => {
    const gaussian = Array.from({ length: degree + 1 }, () => Math.round(normalRandom() * gaussianStdDev));
    const uniform = Array.from({ length: degree + 1 }, () => Math.floor(Math.random() * (2 * uniformRange + 1)) - uniformRange);
    setPolynomials({ gaussian, uniform });
  };

  const normalRandom = () => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  const data = {
    labels: polynomials.gaussian.map((_, index) => index),
    datasets: [
      {
        label: 'Gaussian Polynomial Coefficients',
        data: polynomials.gaussian,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Uniform Polynomial Coefficients',
        data: polynomials.uniform,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h4">Module-LWE Polynomial Sampling Visualizer</Typography>
      <Typography paragraph>
        Adjust the parameters below to see how Gaussian and Uniform polynomial coefficients are sampled for Module-LWE. These visualizations help illustrate the differences in how these distributions affect the security and efficiency of cryptographic schemes like Dilithium.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Slider value={degree} onChange={(e, newDegree) => setDegree(newDegree)} min={1} max={20} valueLabelDisplay="auto" />
          <TextField label="Uniform Range" type="number" value={uniformRange} onChange={(e) => setUniformRange(Number(e.target.value))} />
          <TextField label="Gaussian Std Dev" type="number" value={gaussianStdDev} onChange={(e) => setGaussianStdDev(Number(e.target.value))} />
          <Button onClick={generatePolynomials} variant="contained" color="primary">Generate Polynomials</Button>
        </Grid>
      </Grid>

      <Typography variant="h6" style={{ marginTop: 20 }}>Visualization of Polynomial Coefficients</Typography>
      <Line data={data} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />

      {/* Explanation for beginners */}
      <Typography variant="h6" style={{ marginTop: 20 }}>Understanding the Graphs</Typography>
      <Typography paragraph>
        Each line on the graph represents the coefficients of a polynomial. Polynomials in Module-LWE are like recipes for mixing ingredients in exact proportions. Coefficients are the amounts of each ingredient, and the polynomial is the complete recipe.
      </Typography>
      <Typography paragraph>
        In Gaussian sampling, the ingredients (coefficients) are usually small amounts but occasionally include a large quantity. This randomness makes it difficult to guess the recipe if you don't know it already, enhancing security.
      </Typography>
      <Typography paragraph>
        In Uniform sampling, each ingredient is chosen from a fixed set range with equal probability, ensuring no ingredient is overwhelmingly dominant, which simplifies the mixing process and makes the recipe easier to handle securely.
      </Typography>

      {/* Additional visualization for understanding coefficient impact */}
      <Typography variant="h6" style={{ marginTop: 20 }}>Impact of Coefficients on Polynomial Behavior</Typography>
      <Typography paragraph>
        This additional visualization shows how changing one coefficient can alter the polynomial's shape, affecting its properties in cryptographic computations.
      </Typography>
      <Typography paragraph>
        This additional visualization shows how changing one coefficient can alter the polynomial's shape, affecting its properties in cryptographic computations. By observing this, you can better understand how small changes in the input (coefficients) can significantly impact the output, emphasizing the sensitivity and complexity of the cryptographic systems based on polynomials.
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          {polynomials.gaussian.map((coeff, index) => (
            <div key={index} style={{
              height: '50px',
              width: '50px',
              backgroundColor: coeff > 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(53, 162, 235, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '14px',
              margin: '2px',
              border: '1px solid rgba(0,0,0,0.1)'
            }}>
              {coeff}
            </div>
          ))}
        </div>

        <Typography variant="h6">Key Takeaways</Typography>
        <Typography paragraph>
          The Gaussian distribution, with its variable coefficient sizes, provides robust security due to the unpredictability of larger coefficients. However, it is more complex to implement securely. Uniform distribution, with its predictable range and equal probability, offers easier implementation and can be optimized for performance, making it suitable for real-world applications like digital signatures in Dilithium.
        </Typography>
        <Typography paragraph>
          By understanding these visual representations, you can see how theoretical concepts are applied in practice, providing secure and efficient cryptographic solutions.
        </Typography>
      </Paper>
    );
};

export default PolynomialSampling;

