import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pokedex',
        short_name: 'Pokedex',
        description: 'Pokemon list and details',
        start_url: '/',
        scope: '/',
        dir: 'ltr',
        lang: 'en',
        display: 'standalone',
        orientation: 'any',
        theme_color: '#D02434',
        background_color: '#D02434',
        related_applications: [],
        prefer_related_applications: false,
        icons: [{
            src: 'images/icons/icon_16.png',
            sizes: '16x16',
            type: 'image/png'
          }, {
            src: 'images/icons/icon_32.png',
            sizes: '32x32',
            type: 'image/png'
          }, {
            src: 'images/icons/icon_64.png',
            sizes: '64x64',
            type: 'image/png'
          }, {
            src: 'images/icons/icon_128.png',
            sizes: '128x128',
            type: 'image/png'
          }, {
            src: 'images/icons/icon_256.png',
            sizes: '256x256',
            type: 'image/png'
          }, {
            src: 'images/icons/icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          }]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
