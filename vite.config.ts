import { defineConfig, loadEnv } from 'vite';

import vue from '@vitejs/plugin-vue';
import * as path from 'path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      vue(),
    ],
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
  });
};
