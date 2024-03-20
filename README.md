
# Vue QR Scanner

<a href="https://www.npmjs.com/package/@alzera/vue-scanner"><img src="https://badge.fury.io/js/@alzera%2Fvue-scanner.svg" alt="npm version"></a> <a href="https://bundlephobia.com/package/@alzera/vue-scanner"><img src="https://img.shields.io/bundlephobia/min/%40alzera%2Fvue-scanner" title="minified size"></a> <a href="https://bundlephobia.com/package/@alzera/vue-scanner"><img src="https://img.shields.io/bundlephobia/minzip/%40alzera%2Fvue-scanner" title="minified zip size"></a>

`@alzera/vue-scanner` is a lightweight and simple-to-use Vue library for integrating QR code scanning functionality into your web applications. The primary goal of this library is to provide a hassle-free solution for developers who need a quick and efficient way to incorporate QR code scanning without the bloat.

## Features

-   **Lightweight:** Keep your web application nimble with a minimalistic QR code scanning solution.
-   **Simplicity:** Easy-to-use API designed for developers of all skill levels.
-   **Legacy:** Support image input as camera fallback.
-   **Customizable:** Tailor the scanner's appearance to suit your application's needs.

## Installation

Install `@alzera/vue-scanner` using your preferred package manager:

    npm install @alzera/vue-scanner

## Components

### QRScanner

Combined version of Scanner component and DropZone component, comes with a built-in button that allows users to switch between the scanning mode and the drop zone mode.

#### Basic Example

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

#### Slots

| Name    | Description |
| -------- | ------- |
| drop-children | Customize the content of the drop area component. |
| switch-label | Customize the label for the switch component. |

#### Events

| Name    | Type | Description |
| -------- | ------- | ------- |
| scan | (value: string) => void | Triggered when a QR code is scanned. Passes the scanned data as an argument. |
| error | (error: any) => void | Triggered when an error occurs during scanning. |

#### Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| flipHorizontally | boolean | Flip the video feed horizontally. |
| delay | number | Set the delay (in milliseconds) between scans. |
| aspectRatio | string | Set the aspect ratio of the scanner window, using css aspect-ratio. |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |


### Scanner

Simple component wrapper for barcode-detector library.

#### Basic Example

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

#### Events

| Name    | Type | Description |
| -------- | ------- | ------- |
| scan | (value: string) => void | Triggered when a QR code is scanned. Passes the scanned data as an argument. |
| error | (error: any) => void | Triggered when an error occurs during scanning. |

#### Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| flipHorizontally | boolean | Flip the video feed horizontally. |
| delay | number | Set the delay (in milliseconds) between scans. |
| aspectRatio | string | Set the aspect ratio of the scanner window, using css aspect-ratio. |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |

### DropZone

Simple component wrapper for barcode-detector library.

#### Basic Example

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

#### Slots

Content of drop zone, inside the border

#### Events

| Name    | Type | Description |
| -------- | ------- | ------- |
| scan | (value: string) => void | Triggered when a QR code is scanned. Passes the scanned data as an argument. |
| error | (error: any) => void | Triggered when an error occurs during scanning. |

#### Properties

| Name    | Type | Description |
| -------- | ------- | ------- |
| decoderOptions | BarcodeDetectorOptions | Exposed BarcodeScanner config, more on [here](https://github.com/Sec-ant/barcode-detector). |

## Contributing

We welcome contributions! Feel free to open issues, create pull requests, or provide feedback.

Happy scanning! 📷 🚀