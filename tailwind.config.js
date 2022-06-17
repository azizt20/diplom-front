const colors = require('tailwindcss/colors');

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            'lavender': '#EEF1FA',
            'snow': '#FFFFFF',
            'purple-heart': '#8676FF',
            'blue': '#023AFF',
            'night-blue': '#383874',
            'electric-green': '#00B929',
            'slate': colors.slate,
            'black': colors.black,
            'white': colors.white,
            'gray': colors.gray,
            'emerald': colors.emerald,
            'indigo': colors.indigo,
            'yellow': colors.yellow,
        },
        screens: {
            sm: '480px',
            md: '960px',
            lg: '1440px',
            xl: '1920px',
            '2xl': '2560px'
        },

    },
    plugins: [

    ]
}