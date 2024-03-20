import type { BarcodeDetectorOptions } from "barcode-detector/pure";

export default interface ScannerProps {
  flipHorizontally?: boolean
  delay?: number
  aspectRatio?: string
  decoderOptions?: BarcodeDetectorOptions
}