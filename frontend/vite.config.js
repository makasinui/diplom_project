import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  const isProduction = mode === 'production';

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      proxy: {
        '/backend': {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: !isProduction,
          secure: isProduction,
          rewrite: (path) => path.replace(/^\/backend/, ''),
        }
      }
    }
  })
}
