// src/components/SpinnerLoading.js
import React from 'react';

const SpinnerLoading = () => {
  return (
    <div className="flex items-center justify-center">
      {/* Customize a cor do spinner alterando a classe border */}
      <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinnerLoading;
