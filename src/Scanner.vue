<script setup lang="ts">
import { onMounted } from 'vue'

import type { BarcodeDetectorOptions } from "barcode-detector/pure";
import useDecoder from './use-decoder';
import { useCamera } from '@alzera/vue-use-camera';

const emit = defineEmits<{
  scan: [value: string];
  error: [error: any];
}>();
const {
  decoderOptions,
} = defineProps<{
  decoderOptions?: BarcodeDetectorOptions
}>()

const cameraController = useCamera()
const decoder = useDecoder(decoderOptions)

const decode =  async () => {
  if (!cameraController.video.value) return

  try {
    const result = await decoder.value(cameraController.video.value)
    if (result) emit('scan', result)
    window.requestAnimationFrame(decode)
  } catch (err) {
    emit('error', err)
  }
}

onMounted(() => {
  decode()
})

const selectedChange = (e: Event) => {
  if (!e.target) return;
  const target = e.target as HTMLInputElement
  cameraController.device.selected = cameraController.device.list.find((d) => d.deviceId === target.value)
}
</script>

<template>
  <div id="qr-scanner">
    <video :ref="cameraController.video" preload="none" playsInline></video>
    <select :value="cameraController.device.selected?.deviceId" @change="selectedChange">
      <option v-for="(d, i) in cameraController.device.list" :key="i" :value="d.deviceId">{{ d.label }}</option>
    </select>
  </div>
</template>

<style scoped>
#qr-scanner>video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#qr-scanner>select {
  width: 100%;
  margin-top: 8px;
  font-size: 1rem;
}
</style>