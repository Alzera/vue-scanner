import type { App, Plugin } from 'vue'

import BarcodeScanner from "./BarcodeScanner.vue";
import Scanner from "./Scanner.vue";
import DropZone from "./DropZone.vue";

export { BarcodeScanner, Scanner, DropZone }
export { setZXingModuleOverrides, type BarcodeDetectorOptions } from 'barcode-detector/pure'

export function install(app: App) {
  app.component('barcode-scanner', BarcodeScanner)
  app.component('scanner', Scanner)
  app.component('drop-zone', DropZone)
}
const plugin: Plugin = { install }
export { plugin as QrScannerPlugin }