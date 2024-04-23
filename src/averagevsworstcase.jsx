import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProbabilityDistribution = ({ data, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="attempt" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="probability" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const AverageVsWorstCase = () => {
  const [averageData, setAverageData] = useState([]);
  const [worstData, setWorstData] = useState([]);
  const [explanationText, setExplanationText] = useState('');

  const calculateProbability = (isAverageCase) => {
    return Array.from({ length: 100 }, (_, i) => {
      const attempt = i + 1;
      const probability = isAverageCase ?
        // Simulate a plateau as attempts increase
        1 - Math.exp(-attempt / 20) :
        // Simulate logarithmic growth in success probability
        Math.min(1, Math.log1p(attempt) / 10);

      return { attempt, probability };
    });
  };

  const simulateComplexity = (isAverageCase) => {
    const newData = calculateProbability(isAverageCase);
    if (isAverageCase) {
      setAverageData(newData);
      setExplanationText('Average-case complexity simulation shows a quick rise in success probability, leveling off as the number of attempts increase.');
    } else {
      setWorstData(newData);
      setExplanationText('Worst-case complexity simulation shows a slow, gradual increase in success probability, reflecting the challenge of solving the hardest problems.');
    }
  };

  return (
    <div className="complexity-visualization">
      <h1>Understanding Cryptographic Complexity</h1>
      <button onClick={() => simulateComplexity(true)}>Simulate Average-Case</button>
      <button onClick={() => simulateComplexity(false)}>Simulate Worst-Case</button>
      
      <p>{explanationText}</p>

      <ProbabilityDistribution
        data={averageData}
        title="Average-Case Probability Distribution"
      />
      <ProbabilityDistribution
        data={worstData}
        title="Worst-Case Probability Distribution"
      />

      <p>Average-Case Complexity: This measures the difficulty of solving a problem on average, across all possible instances. Imagine a game where you're looking for shells on a beach. Most of the shells are easy to find because they're common. Similarly, if an encryption method is based on average-case complexity, it assumes that an attacker will, on average, have to put in a certain amount of work to break the encryption. This does not guarantee security against all possible scenarios—just the typical, expected ones.
Worst-Case Complexity: This takes into account the most difficult possible instance of a problem. Returning to our beach analogy, instead of looking for common shells, you're tasked with finding an extremely rare gemstone that could be hidden anywhere on the beach. In cryptography, if an encryption method is based on worst-case complexity, it means that an attacker would need to be capable of solving the hardest version of the problem, which is assumed to be infeasibly hard. This level of security is much more robust because it doesn't rely on averages—it must be secure against all attacks, even the most sophisticated ones. </p>
    </div>
  );
};

export default AverageVsWorstCase;
