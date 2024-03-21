<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import type ScannerProps from "./types/scanner-props";
import createDecoder from "./utils/create-decoder"

interface HTMLVideoElementExtended extends HTMLVideoElement {
  mozSrcObject?: MediaStream
}

const emit = defineEmits<{
  scan: [value: string];
  error: [error: any];
}>();
const {
  flipHorizontally = false, // need to test this default value
  delay = 800,
  aspectRatio = '1/1',
  decoderOptions,
} = defineProps<ScannerProps>()

const devices = ref<MediaDeviceInfo[]>([])
const selectedDevice = ref<number>()
const preview = ref<HTMLVideoElementExtended>()
const decoder = computed(() => createDecoder(decoderOptions))

let timeout: NodeJS.Timeout | null = null,
  stopCamera: (() => void) | null = null,
  isMounted = false

const handleVideo = (stream: MediaStream) => {
  if (!preview.value) return

  if (preview.value.srcObject !== undefined) {
    preview.value.srcObject = stream
  } else if (preview.value.mozSrcObject !== undefined) {
    preview.value.mozSrcObject = stream
  } else if (window.URL.createObjectURL) {
    preview.value.src = window.URL.createObjectURL(stream as any)
  } else if (window.webkitURL) {
    preview.value.src = window.webkitURL.createObjectURL(stream as any)
  } else {
    preview.value.src = stream as any
  }

  const [track] = stream.getVideoTracks()
  stopCamera = track.stop.bind(track)
  preview.value.addEventListener('canplay', handleCanPlay)
}

const handleCanPlay = () => {
  if (!preview.value) return

  preview.value.play()
    .then(() => timeout = setTimeout(check, delay))
    .catch(err => emit('error', err))
  preview.value.removeEventListener('canplay', handleCanPlay)
}

const check = () => {
  if (!preview.value) return

  if (preview.value.readyState === preview.value.HAVE_ENOUGH_DATA) {
    const decode = () => {
      if (!preview.value) return

      decoder.value?.(preview.value).then((code) => {
        timeout = setTimeout(decode, delay)
        if (code) emit('scan', code)
      })
    }
    decode()
  } else {
    timeout = setTimeout(check, delay)
  }
}

const release = () => {
  if (timeout) clearTimeout(timeout)
  if (stopCamera) stopCamera()
  if (preview.value) {
    preview.value.removeEventListener('canplay', handleCanPlay)
    preview.value.src = ''
    preview.value.srcObject = null
    preview.value.load()
  }
}

const selectedChange = (e: Event) => {
  if (!e.target) return;
  const target = e.target as HTMLInputElement
  const v = parseInt(target.value)
  selectedDevice.value = Number.isNaN(v) ? undefined : v
}

watch(() => preview.value, (v, __, onCleanup) => {
  if (!v) return

  navigator
    .mediaDevices
    .enumerateDevices()
    .then(ds => ds.filter((d) => d.kind === 'videoinput'))
    .then(ds => {
      devices.value = ds
      selectedDevice.value = 0
    })
    .catch(err => emit('error', err))

  onCleanup(release)
})

watch(selectedDevice, (v, _, onCleanup) => {
  if (v == undefined || v >= devices.value.length) return

  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: {
        deviceId: devices.value[v].deviceId
      }
    })
    .then(stream => {
      if(isMounted) handleVideo(stream)
      else for (const track of stream.getTracks()) {
        stream.removeTrack(track)
        track.stop()
      }
    })
    .catch(err => emit('error', err))

  onCleanup(release)
})

onMounted(() => isMounted = true)
onBeforeUnmount(() => {
  isMounted = false
  release()
})
</script>

<template>
  <div id="qr-scanner">
    <video ref="preview" preload="none" playsInline :style="{
      'aspect-ratio': aspectRatio,
      'transform': flipHorizontally ? 'scaleX(1)' : 'scaleX(-1)'
    }"></video>
    <select :value="selectedDevice" @change="selectedChange">
      <option v-for="(d, i) in devices" :key="i" :value="i">{{ d.label }}</option>
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