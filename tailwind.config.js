// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6D28D9", // Roxo mais escuro e chamativo
        secondary: "#4C1D95", // Um roxo ainda mais profundo para maior contraste
        accent: "#F59E0B", // Amarelo para destaques
        neutral: "#6B7280", // Cinza neutro
        background: "#F3F4F6", // Fundo claro, mas com um leve toque mais escuro
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
