module.exports = {
  purge: ['./src/*/.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      background: "#111828",
      aqua: "#34D099",
      skyD: "#3A82F1",
      skyL: "#DBEAFF",
      gray:"#D1D4DB",
      white:"#FFFFFF"
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
