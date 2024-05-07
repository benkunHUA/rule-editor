import { defineConfig } from 'father';

export default defineConfig({
  esm: {},
  umd: {
    entry: './src/packages/index.ts',
  },
});
