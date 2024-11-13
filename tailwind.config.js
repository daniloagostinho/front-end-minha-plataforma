// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Azul
        secondary: "#9333EA", // Roxo
        accent: "#F59E0B", // Amarelo
        neutral: "#6B7280", // Cinza neutro
        background: "#F9FAFB", // Fundo claro
        error: "#EF4444", // Vermelho para mensagens de erro
        success: "#10B981", // Verde para sucesso
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
};
