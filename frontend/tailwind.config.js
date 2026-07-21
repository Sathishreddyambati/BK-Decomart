/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Bodoni Moda"', "ui-serif", "Georgia", "serif"],
                sans: ['Manrope', "ui-sans-serif", "system-ui", "sans-serif"],
            },
            colors: {
                ivory: "#FAF9F6",
                beige: "#F5F0E6",
                linen: "#E3D5C8",
                champagne: "#D4AF37",
                walnut: "#4B3621",
                matte: "#1A1A1A",
                charcoal: "#333333",
                brandred: "#D32F2F",
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            letterSpacing: {
                overline: "0.24em",
            },
            boxShadow: {
                soft: "0 8px 30px rgb(0 0 0 / 0.04)",
                deep: "0 20px 40px rgb(0 0 0 / 0.08)",
                inset: "inset 0 0 0 1px rgba(212,175,55,0.25)",
            },
            keyframes: {
                'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
                'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
                fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
                marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-up': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both',
                'shimmer': 'shimmer 2.4s linear infinite',
                'marquee': 'marquee 40s linear infinite',
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};
