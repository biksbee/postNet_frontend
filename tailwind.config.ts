import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    theme: {
      screens: {
        xl: "1440px",
        md: "890px",
        xx: "500px"
      },
      fontFamily: {
        mont: ['Montserrat Alternates'],
        exo: ['Exo\\ 2'],
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter']
      },
      extend: {
        backgroundImage: {

        },
        colors: {
          c_grey:{
            light: 'rgba(244,244,245,1)',
            primary_G350: 'rgba(166,166,166,1)',
            alpha04: 'rgba(0,0,0,0.04)',
            alpha08: 'rgba(0,0,0,0.08)',
            alpha16: 'rgba(0,0,0,0.16)',
            alpha48: 'rgba(0,0,0,0.48)',
            alpha5: 'rgba(0,0,0,1)',
          },
          c_blue: {
            light: 'rgba(213,228,247,1)',
            grey: 'rgba(33,40,48,1)',
            primary_G800: 'rgba(51,51,51,1)',
          },
          c_purple: {
            '100': 'rgba(85,88,250,1)',
          },
          c_green: {
            emer: 'rgba(5,174,113,0.15)'
          },
          c_red: {
            berry: 'rgba(232,78,88,0.15)'
          }
        }
      },
    },
  },
  plugins: [],
}
export default config
