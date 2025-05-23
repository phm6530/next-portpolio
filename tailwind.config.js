/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(250px, 1fr))",
      },
      width: {
        "calc-grid": "calc(100% - 40px)",
        "calc-80": "calc(100% - 80px)",
      },
      fontFamily: {
        paperlogy: ["Paperlogy-8ExtraBold", "sans-serif"],
      },
      boxShadow: {
        custom: "5px 14px 29px rgb(100 63 255 / 25%)",
        center: "0px 0px 3px #757575a2",
        "center-dark": "0px 0px 3px #ffffffa2",
      },
      colors: {
        throw: "hsl(var(--throw))",
      },
      height: {
        "calc-screen-lg": "calc(100vh - 140px)", // 기본 설정
        "calc-screen": "calc(100vh - 80px)", // 기본 설정
        "calc-screen-sm": "calc(100% - 60px)", // sm 사이즈에서 높이 변경
        "calc-screen-md": "calc(100% - 50px)", // md 사이즈에서 높이 변경
      },
      maxHeight: {
        "calc-screen-xs": "calc(100% - 20px)", // xs 사이즈에서 높이 변경
      },

      keyframes: {
        opacity: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        fadein: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeout: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        fadein: "fadein .4s ease",
        fadeout: "fadeout 1s",
        opacity: "opacity 0.5s linear infinite alternate",
      },
      fontFamily: {
        pretendard: ["pretendard", "sans-serif"],
        Paperlogy: ["Paperlogy-8ExtraBold", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        "custom-input": "hsl(var(--custom-input))",
        third: "hsl(var(--third))",
        point: "hsl(var(--point))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
