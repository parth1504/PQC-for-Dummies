import React from 'react';
import SignSpeedComparisonChart from './SignSpeedComparisonChart';
import VerificationSpeedComparisonChart from './VerificationSpeedComparisonChart';
import KeyAndSignatureSizeComparison from './KeyAndSignatureSizeComparison';
import './ComparisonCharts.css';

const ComparisonPage = () => {

  return (
    <div>
      <h3> Sphincs+ VS CRYSTALS-Dilithium</h3>
      <SignSpeedComparisonChart/>
      <VerificationSpeedComparisonChart/>
      <KeyAndSignatureSizeComparison/>
    </div>
  );
};

export default ComparisonPage;
