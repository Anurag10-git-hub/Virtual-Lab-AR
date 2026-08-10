import { defineConfig } from 'vite'

export default defineConfig({
  root: './public',
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      '3000-iwvbay0xjprd3earwo2ou-6532622b.e2b.dev' // add your tunnel/IDE host here
    ]
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './public/index.html',
        experiments: './public/experiments.html',
        viewer: './public/viewer.html',
        about: './public/about.html',
        contact: './public/contact.html'
      }
    }
  }
})
