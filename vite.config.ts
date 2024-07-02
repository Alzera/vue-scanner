import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      staticImport: true,
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      name: 'BarcodeScanner',
      entry: {
        'useDecoder': resolve(__dirname, 'src/use-decoder.ts'),
        'Scanner': resolve(__dirname, 'src/Scanner.vue'),
        'DropZone': resolve(__dirname, 'src/DropZone.vue'),
        'BarcodeScanner': resolve(__dirname, 'src/BarcodeScanner.vue'),
        'index': resolve(__dirname, 'src/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        'barcode-detector/pure',
        'vue',
      ],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
});