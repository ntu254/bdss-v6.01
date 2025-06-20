/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        secondary: {
          50: 'var(--secondary-50)',
          100: 'var(--secondary-100)',
          200: 'var(--secondary-200)',
          300: 'var(--secondary-300)',
          400: 'var(--secondary-400)',
          500: 'var(--secondary-500)',
          600: 'var(--secondary-600)',
          700: 'var(--secondary-700)',
          800: 'var(--secondary-800)',
          900: 'var(--secondary-900)',
        },
        blood: {
          red: '#dc2626',
          'red-dark': '#b91c1c',
          'red-light': '#fee2e2',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'bounce-gentle': {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-8px)' },
          '70%': { transform: 'translateY(-4px)' },
          '90%': { transform: 'translateY(-2px)' },
        },
        'modal-appear': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'pulse-soft': 'pulse-soft 2s infinite',
        'bounce-gentle': 'bounce-gentle 1s infinite',
        'modal-appear': 'modal-appear 0.3s ease-out forwards',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'blood': '0 4px 20px -2px rgba(220, 38, 38, 0.25)',
        'success': '0 4px 20px -2px rgba(16, 185, 129, 0.25)',
        'error': '0 4px 20px -2px rgba(239, 68, 68, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        '3xl': '1600px',
      },
      // Component-level utility classes
      utilities: {
        // Common layout patterns
        '.flex-center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.flex-between': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        '.flex-start': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        // Button base styles
        '.btn-base': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          transitionProperty: 'all',
          transitionDuration: '200ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        // Card base styles
        '.card-base': {
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgb(229 231 235)',
        },
        // Professional card variant
        '.card-pro': {
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgb(229 231 235)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        // Input base styles
        '.input-base': {
          width: '100%',
          paddingLeft: '0.75rem',
          paddingRight: '0.75rem',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          border: '1px solid rgb(209 213 219)',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:focus': {
            outline: 'none',
            borderColor: 'rgb(239 68 68)',
            boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
          },
        },
        // Text utilities
        '.text-heading': {
          fontSize: '1.875rem',
          lineHeight: '2.25rem',
          fontWeight: '700',
          color: 'rgb(17 24 39)',
        },
        '.text-subtitle': {
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          color: 'rgb(107 114 128)',
        },
        '.text-body': {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: 'rgb(75 85 99)',
        },
        // Glass effect
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        // Gradient effects
        '.gradient-primary': {
          background: 'linear-gradient(135deg, rgb(239 68 68) 0%, rgb(220 38 38) 100%)',
        },
        '.gradient-hero': {
          background: 'linear-gradient(135deg, rgb(239 68 68) 0%, rgb(190 24 93) 50%, rgb(147 51 234) 100%)',
        },
        // Section padding
        '.section-padding': {
          paddingTop: '5rem',
          paddingBottom: '5rem',
        },
        // Animation delays
        '.animate-delay-100': { animationDelay: '100ms' },
        '.animate-delay-200': { animationDelay: '200ms' },
        '.animate-delay-300': { animationDelay: '300ms' },
        '.animate-delay-400': { animationDelay: '400ms' },
        '.animate-delay-500': { animationDelay: '500ms' },
        '.animate-delay-600': { animationDelay: '600ms' },
      },
    },
  },
  plugins: [
    // Plugin to add the utility classes
    function({ addUtilities }) {
      addUtilities({
        // Common layout patterns
        '.flex-center': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        },
        '.flex-between': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'space-between',
        },
        '.flex-start': {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'flex-start',
        },
        // Button base styles
        '.btn-base': {
          display: 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'font-weight': '600',
          'transition-property': 'all',
          'transition-duration': '200ms',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'border-radius': '0.5rem',
          cursor: 'pointer',
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        // Card base styles
        '.card-base': {
          'background-color': 'white',
          'border-radius': '0.75rem',
          'box-shadow': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgb(229 231 235)',
        },
        // Professional card variant
        '.card-pro': {
          'background-color': 'white',
          'border-radius': '1rem',
          'box-shadow': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgb(229 231 235)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            'box-shadow': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
        // Input base styles
        '.input-base': {
          width: '100%',
          'padding-left': '0.75rem',
          'padding-right': '0.75rem',
          'padding-top': '0.5rem',
          'padding-bottom': '0.5rem',
          'font-size': '0.875rem',
          'line-height': '1.25rem',
          border: '1px solid rgb(209 213 219)',
          'border-radius': '0.5rem',
          'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:focus': {
            outline: 'none',
            'border-color': 'rgb(239 68 68)',
            'box-shadow': '0 0 0 3px rgba(239, 68, 68, 0.1)',
          },
        },
        // Text utilities
        '.text-heading': {
          'font-size': '1.875rem',
          'line-height': '2.25rem',
          'font-weight': '700',
          color: 'rgb(17 24 39)',
        },
        '.text-subtitle': {
          'font-size': '1.125rem',
          'line-height': '1.75rem',
          color: 'rgb(107 114 128)',
        },
        '.text-body': {
          'font-size': '0.875rem',
          'line-height': '1.25rem',
          color: 'rgb(75 85 99)',
        },
        // Glass effect
        '.glass': {
          'background-color': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        // Gradient effects
        '.gradient-primary': {
          background: 'linear-gradient(135deg, rgb(239 68 68) 0%, rgb(220 38 38) 100%)',
        },
        '.gradient-hero': {
          background: 'linear-gradient(135deg, rgb(239 68 68) 0%, rgb(190 24 93) 50%, rgb(147 51 234) 100%)',
        },
        // Section padding
        '.section-padding': {
          'padding-top': '5rem',
          'padding-bottom': '5rem',
        },
        // Animation delays
        '.animate-delay-100': { 'animation-delay': '100ms' },
        '.animate-delay-200': { 'animation-delay': '200ms' },
        '.animate-delay-300': { 'animation-delay': '300ms' },
        '.animate-delay-400': { 'animation-delay': '400ms' },
        '.animate-delay-500': { 'animation-delay': '500ms' },
        '.animate-delay-600': { 'animation-delay': '600ms' },
      })
    }
  ],
}