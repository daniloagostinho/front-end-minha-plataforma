// src/stories/Button.stories.jsx
import React from 'react';

// Importa o componente de botão
const Button = ({ label, variant }) => {
  const baseClass = "font-semibold px-6 py-2 rounded-md transition duration-200";

  const classes = {
    primary: `bg-primary text-white hover:bg-secondary ${baseClass}`,
    secondary: `bg-secondary text-white hover:bg-purple-700 ${baseClass}`,
    success: `bg-success text-white hover:bg-green-600 ${baseClass}`,
    error: `bg-error text-white hover:bg-red-600 ${baseClass}`,
  };

  return <button className={classes[variant]}>{label}</button>;
};

// Define as histórias para o botão
export default {
  title: 'Design System/Buttons',
  component: Button,
};

export const Primary = () => <Button label="Botão Primário" variant="primary" />;
export const Secondary = () => <Button label="Botão Secundário" variant="secondary" />;
export const Success = () => <Button label="Botão de Sucesso" variant="success" />;
export const Error = () => <Button label="Botão de Erro" variant="error" />;
