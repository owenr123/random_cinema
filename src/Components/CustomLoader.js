import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import './CustomLoader.css';

const CustomLoader = () => {
  return (
    <div className="spinner-container">
      <div className="gradient-overlay">
        <TailSpin color="#ffffff" height={80} width={80} />
      </div>
    </div>
  );
};

export default CustomLoader;
