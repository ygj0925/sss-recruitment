import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const jsoncPagesForTests = {
  name: 'jsonc-pages-for-tests',
  enforce: 'pre' as const,
  transform(code: string, id: string) {
    if (id.endsWith('/src/pages.json')) {
      return {
        code: code.replace(/^\s*\/\/.*$/gm, ''),
        map: null,
      }
    }
  },
}

export default defineConfig({
  plugins: [jsoncPagesForTests, vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'src/uni_modules/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@img': path.resolve(process.cwd(), 'src/static/images'),
    },
  },
})
