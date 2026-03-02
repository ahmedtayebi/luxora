import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: '#C9A84C',
                    light: '#E8C96A',
                    dark: '#8B6914',
                    glow: 'rgba(201,168,76,0.25)',
                    subtle: 'rgba(201,168,76,0.08)',
                },
                obsidian: {
                    DEFAULT: '#070707',
                    soft: '#0F0F0F',
                    card: '#131313',
                    border: 'rgba(201,168,76,0.12)',
                },
                ivory: '#F0EAE0',
                mist: '#9A8870',
            },
            fontFamily: {
                display: ['var(--font-amiri)', 'serif'],
                body: ['var(--font-cairo)', 'sans-serif'],
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '200% 50%' },
                },
                pulseGold: {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0)' },
                    '50%': { boxShadow: '0 0 24px 8px rgba(201,168,76,0.25)' },
                },
                particleDrift: {
                    '0%': { transform: 'translate(0, 0)', opacity: '0' },
                    '20%': { opacity: '1' },
                    '80%': { opacity: '0.6' },
                    '100%': {
                        transform: 'translate(var(--drift-x, 40px), var(--drift-y, -60px))',
                        opacity: '0',
                    },
                },
                revealUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                shimmer: 'shimmer 2.5s linear infinite',
                pulseGold: 'pulseGold 2s ease infinite',
                particleDrift: 'particleDrift 8s ease-in-out infinite',
                revealUp: 'revealUp 0.8s ease forwards',
                scaleIn: 'scaleIn 0.6s ease forwards',
            },
        },
    },
    plugins: [],
}

export default config
