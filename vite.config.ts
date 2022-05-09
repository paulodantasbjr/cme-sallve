import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '.env',
  plugins: [react(), tsconfigPaths(), svgrPlugin()],
  build: {
    sourcemap: true,
  },
});
