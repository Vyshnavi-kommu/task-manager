/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'fadeIn': 'fadeIn 0.4s ease-out forwards',
            },
        },
    },
    plugins: [],
}
