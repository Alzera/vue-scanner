<script setup>
import { BarcodeScanner } from '@alzera/vue-scanner'
import '@alzera/vue-scanner/style.css'

const scan = ref('')
</script>

<template>
  <div>
    <BarcodeScanner @scan="(v) => scan = v" />
    <p v-if="scan">Scanned Data: {{ scan }}</p>
  </div>
</template>

<style scoped>
div {
  max-width: 500px;
}
</style>