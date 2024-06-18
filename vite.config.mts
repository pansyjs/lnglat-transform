import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: (format) => {
        if (format === 'cjs') {
          return 'index.cjs'
        }

        return 'index.mjs'
      },
      formats: ['es', 'cjs'],
    },
    minify: false,
  },
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      rollupTypes: true,
    }),
  ],
})
