import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const config = {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
  };
  return defineConfig(config);
};