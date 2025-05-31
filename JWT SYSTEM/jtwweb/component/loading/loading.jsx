"use client";
import React, { useState } from 'react';
import './Loading.css';

const Loading = () => {

    const [logo, setLogo] = useState("/logo.png");

  return (
    <div className="loading-container">
      <div className="logo">
        {/* Buraya logonuzu ekleyin */}
        <img src={logo} alt="Logo" />
      </div>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
