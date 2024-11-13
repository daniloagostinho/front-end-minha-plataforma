// src/components/Button.js
import React from 'react';

const Button = ({ label, onClick, variant = 'primary' }) => {
  const baseClass = "font-semibold px-6 py-2 rounded-md transition duration-200";
  const classes = {
    primary: `bg-primary text-white hover:bg-blue-700 ${baseClass}`,
    secondary: `bg-secondary text-white hover:bg-purple-700 ${baseClass}`,
    success: `bg-success text-white hover:bg-green-600 ${baseClass}`,
    error: `bg-error text-white hover:bg-red-600 ${baseClass}`,
  };
  return <button className={classes[variant]} onClick={onClick}>{label}</button>;
};

export default Button;
