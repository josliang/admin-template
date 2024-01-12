import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
    ],
    theme: {
        breakpoints: {
            "2xl": '1920px',
            xl: '1440px',
            lg: '1280px',
            md: '960px',
            sm: '640px',
        },
    },
})
