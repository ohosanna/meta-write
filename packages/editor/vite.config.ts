import path from "path"
import { defineConfig } from 'vite'

const libraryName = 'meta-write-editor'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

module.exports = defineConfig({
  plugins: [
  ], 
  resolve: {
    alias: {
      '@': _resolve('src'),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: libraryName,
      formats: ['es', 'umd'], // adding 'umd' requires globals set to every external module
      fileName: (format: string) => `index.${format}.js`,
    },
    rollupOptions: {
      // external modules won't be bundled into your library
      external: ['vue'], // not every external has a global
      output: {
        // disable warning on src/index.ts using both default and named export
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps (not useful if 'umd' is not in lib.formats)
        globals: {
        },
      },
    },
    emptyOutDir: false, // to retain the types folder generated by tsc
  },
})