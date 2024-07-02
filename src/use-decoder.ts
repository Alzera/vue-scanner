import { BarcodeDetector, type BarcodeDetectorOptions } from "barcode-detector/pure";
import { computed } from "vue";

export type Decoder = (imageData: ImageBitmapSourceWebCodecs) => Promise<string | null | undefined>

const createDecoder = (opts?: BarcodeDetectorOptions) => {
  const detector = new BarcodeDetector(opts || {
    formats: ['qr_code']
  })
  return async (imageData: ImageBitmapSourceWebCodecs) => {
    try {
      const decoded = await detector.detect(imageData);
      if (decoded.length) return decoded.at(0)?.rawValue
    } catch (_) {
      return null
    }
  }
}

export default function useDecoder(opts?: BarcodeDetectorOptions) {
  return computed(() => createDecoder(opts))
}
