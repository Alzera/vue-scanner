// import type { App, Plugin } from 'vue'

import useDecoder from './use-decoder'
import BarcodeScanner from "./BarcodeScanner.vue";
import Scanner from "./Scanner.vue";
import DropZone from "./DropZone.vue";

export { BarcodeScanner, Scanner, DropZone, useDecoder }
export { setZXingModuleOverrides, type BarcodeDetectorOptions } from 'barcode-detector/pure'

// export function install(app: App) {
//   app.provide('use-decoder', useDecoder)
//   app.component('barcode-scanner', BarcodeScanner)
//   app.component('scanner', Scanner)
//   app.component('drop-zone', DropZone)
// }
// const QrScannerPlugin: Plugin = { install }
// export { QrScannerPlugin }