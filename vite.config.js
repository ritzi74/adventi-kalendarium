import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// A relatív base ('./') miatt az oldal bármilyen GitHub Pages útvonalon
// (pl. https://felhasznalo.github.io/adventi-kalendarium/) módosítás nélkül működik.
export default defineConfig({
  plugins: [vue()],
  base: './',
})
