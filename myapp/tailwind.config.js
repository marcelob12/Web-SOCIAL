module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      background: "#EEEEEE",
      aqua: "#2CBC89",
      skyD: "#3A82F1",
      skyL: "#DBEAFF",
      gray:"#bcbfc4",
      white:"#FFFFFF",
      whitie:"#F2F2F2",
      dark: {
        700: "#24252A",
        400: "#484A55"
      },
      red:{
        500: "#DB3E3E",
        300: "#E15151"
      }
    },
    fontFamily:{
      heading: ['Good Brush', 'cursive'],
      content: ['Saira Semi Condensed', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}