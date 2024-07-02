<script setup lang="ts">
import type { BarcodeDetectorOptions } from "barcode-detector/pure";
import { ref } from 'vue'

import Scanner from "./Scanner.vue";
import DropZone from "./DropZone.vue";

const emit = defineEmits<{
  scan: [value: string];
  error: [error: any];
}>();
const {
  decoderOptions,
} = defineProps<{
  decoderOptions?: BarcodeDetectorOptions
}>()

const isScanner = ref(true)

const onScan = (v: string) => emit('scan', v)
const onError = (err: any) => emit('error', err)
</script>

<template>
  <div id="qr-scanner-layout">
    <Scanner v-if="isScanner" @scan="onScan" @error="onError" :decoderOptions="decoderOptions" />
    <DropZone v-else @scan="onScan" @error="onError" :decoderOptions="decoderOptions">
      <slot name="drop-children"></slot>
    </DropZone>
    <button type="button" @click="() => isScanner = !isScanner">
      <slot name="switch-label">
        Switch to {{ isScanner ? 'image input' : 'scanner' }}
      </slot>
    </button>
  </div>
</template>

<style scoped>
#qr-scanner-layout {
  width: 100%;
}

#qr-scanner-layout>button {
  width: 100%;
  margin-top: 16px;
  font-size: 1rem;
}
</style>