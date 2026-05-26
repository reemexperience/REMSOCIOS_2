import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                rem: {
                    blue: '#4316ff',
                    green: '#7cc21f',
                    white: '#ffffff',
                    dark: '#2a2a2a',
                    background: '#171717',
                    surface: '#202020',
                    card: '#2a2a2a',
                    elevated: '#333333',
                },
            },
            fontFamily: {
                sans: ['Manrope', 'Montserrat', ...defaultTheme.fontFamily.sans],
                display: ['Clash Display', 'Poppins', ...defaultTheme.fontFamily.sans],
                accent: ['Jura', 'Montserrat', ...defaultTheme.fontFamily.sans],
                body: ['Manrope', 'Montserrat', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'rem-primary': 'linear-gradient(135deg, #4316ff 0%, #7cc21f 100%)',
                'rem-dark': 'linear-gradient(180deg, #171717 0%, #2a2a2a 100%)',
            },
            boxShadow: {
                glow: '0 0 0 1px rgba(67,22,255,0.24), 0 24px 80px rgba(67,22,255,0.16)',
                soft: '0 18px 40px rgba(0,0,0,0.28)',
            },
        },
    },

    plugins: [forms, animate],
};
