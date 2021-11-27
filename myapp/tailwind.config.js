module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      background: "#EEEEEE",
      aqua: "#2CBC89",
      skyD: "#3A82F1",
      skyL: "#DBEAFF",
      gray:{
        500: "#bcbfc4",
        300: "#E8EDF0"
      },      
      white:"#FFFFFF",
      whitie:"#F2F2F2",
      dark: {
        700: "#24252A",
        400: "#484A55",
        300:"#484B4B"
      },
      red:{
        500: "#DB3E3E",
        300: "#E15151"
      }, 
      blue:{
        500: "#1e60a6",
        400: "#337ac4"
      },
      yellow:{
        300:"#1e60a6",
        400:"#E9EB4A",
        500:"#D1CF1E",
        700:"#F2DC1F"
      },
    },
    fontFamily:{
      heading: ['Anton', 'cursive'],
      content: ['Saira Semi Condensed', 'sans-serif']
    },
    extend: {
      spacing: {
        '98': '35rem',
        '100': '38rem',
        '150': '45rem',
      },
      outline: {
        skyBO: '2px solid #29B8AB',
      }
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}