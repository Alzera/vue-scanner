# Vue QR Scanner

A lightweight and simple-to-use Vue library for integrating QR code scanning functionality into your web applications.

## Installation
```bash
npm install @alzera/vue-scanner
```

## Components

### BarcodeScanner

Combined version of Scanner component and DropZone component, comes with a built-in button that allows users to switch between the scanning mode and the drop zone mode.

#### Usage

```vue
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
```

#### Props

| Name    | Type | Description |
| -------- | ------- | ------- |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |

### Scanner

Scan barcode from camera stream.

#### Usage

```vue
<script setup>
import { Scanner } from '@alzera/vue-scanner/vue'
import '@alzera/vue-scanner/vue/vue-scanner.css'

const scan = ref('')
</script>

<template>
  <div>
    <Scanner @scan="(v) => scan = v" />
    <p v-if="scan">Scanned Data: {{ scan }}</p>
  </div>
</template>

<style scoped>
div {
  max-width: 500px;
}
</style>
```

#### Props

| Name    | Type | Description |
| -------- | ------- | ------- |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |

### DropZone

Scan barcode from image input.

#### Usage

```vue
<script setup>
import { DropZone } from '@alzera/vue-scanner/vue'
import '@alzera/vue-scanner/vue/vue-scanner.css'

const scan = ref('')
</script>

<template>
  <div>
    <DropZone @scan="(v) => scan = v" />
    <p v-if="scan">Scanned Data: {{ scan }}</p>
  </div>
</template>

<style scoped>
div {
  max-width: 500px;
}
</style>
```

#### Slots

Content of drop zone, inside the border

#### Props

| Name    | Type | Description |
| -------- | ------- | ------- |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector).

## API

### useDecoder

Hook for creating a decoder instance.

#### Usage

```vue
<script setup>
import { useDecoder } from '@alzera/vue-scanner'

const decoder = useDecoder()
</script>
```

#### Props

| Name    | Type | Description |
| -------- | ------- | ------- |
| opts | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector).

## Contributing

We welcome contributions! Feel free to open issues, create pull requests, or provide feedback.
Happy scanning! 📷 🚀