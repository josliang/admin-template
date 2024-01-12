import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
    ],
    theme: {
        breakpoints: {
            "2xl": '(max-width: 1920px)',
            xl: '(max-width: 1440px)',
            lg: '(max-width: 1280px)',
            md: '(max-width: 960px)',
            sm: '(max-width: 640px)',
        },
    },
})
