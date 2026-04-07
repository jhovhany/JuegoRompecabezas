<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const svgRef = ref(null)
const winAudio = ref(null)
const stepAudio = ref(null)
const playerData = ref({ nombre: '', cantidad: '' })

const pieceWidth = Array(36).fill(185)
const pieceHeight = Array(36).fill(200)

const targetX = [
  157, 257, 357, 457, 557, 640, 174, 257, 357, 457, 557, 657,
  157, 257, 357, 457, 557, 640, 174, 257, 357, 457, 556, 657,
  157, 257, 357, 457, 556, 639, 174, 257, 357, 456, 556, 656
]

const targetY = [
  -23, -40, -23, -40, -23, -40, 60, 60, 60, 60, 60, 60,
  160, 160, 160, 160, 160, 160, 260, 260, 260, 261, 261, 261,
  360, 360, 360, 361, 361, 361, 460, 443, 460, 443, 460, 443
]

const pieces = ref([])
const selectedId = ref(null)
const pointerOffset = ref({ x: 0, y: 0 })
let zCounter = 0

const orderedPieces = computed(() => [...pieces.value].sort((a, b) => a.z - b.z))

function randomizePieces() {
  pieces.value = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 10 + 1),
    y: Math.floor(Math.random() * 409 + 1),
    width: pieceWidth[i],
    height: pieceHeight[i],
    z: i,
    locked: false
  }))
}

function findPiece(id) {
  return pieces.value.find((piece) => piece.id === id)
}

function toSvgCoords(event) {
  const svg = svgRef.value
  const point = svg.createSVGPoint()
  point.x = event.clientX
  point.y = event.clientY
  const ctm = svg.getScreenCTM()
  return point.matrixTransform(ctm.inverse())
}

function onPointerDown(piece, event) {
  if (piece.locked) return
  selectedId.value = piece.id
  zCounter += 1
  piece.z = zCounter

  const coords = toSvgCoords(event)
  pointerOffset.value = {
    x: coords.x - piece.x,
    y: coords.y - piece.y
  }

  event.target.setPointerCapture?.(event.pointerId)
}

function onPointerMove(event) {
  if (selectedId.value === null) return
  const piece = findPiece(selectedId.value)
  if (!piece || piece.locked) return

  const coords = toSvgCoords(event)
  piece.x = coords.x - pointerOffset.value.x
  piece.y = coords.y - pointerOffset.value.y
}

function onPointerUp() {
  if (selectedId.value === null) return

  const piece = findPiece(selectedId.value)
  selectedId.value = null
  if (!piece || piece.locked) return

  const tx = targetX[piece.id]
  const ty = targetY[piece.id]

  if (Math.abs(piece.x - tx) < 15 && Math.abs(piece.y - ty) < 15) {
    piece.x = tx
    piece.y = ty
    piece.locked = true
    stepAudio.value?.play().catch(() => {})
  }

  if (pieces.value.every((p) => p.locked)) {
    winAudio.value?.play().catch(() => {})
    setTimeout(() => {
      router.push('/felicidades')
    }, 1200)
  }
}

onMounted(() => {
  const saved = localStorage.getItem('atelierGameData')
  if (!saved) {
    router.replace('/')
    return
  }

  try {
    playerData.value = JSON.parse(saved)
  } catch {
    router.replace('/')
    return
  }

  randomizePieces()
})
</script>

<template>
  <main class="page puzzle-page">
    <div class="puzzle-wrap">
      <svg
        id="entorno"
        ref="svgRef"
        width="1000"
        height="700"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @pointerleave="onPointerUp"
      >
        <g id="fondo">
          <image href="/img/rompecabezas.jpg" width="600" height="600" x="200" y="10" />
        </g>

        <g v-for="piece in orderedPieces" :key="piece.id" class="padre" :id="String(piece.id)">
          <image
            class="movil"
            :href="`/img/${piece.id + 1}.png`"
            :x="piece.x"
            :y="piece.y"
            :width="piece.width"
            :height="piece.height"
            @pointerdown="onPointerDown(piece, $event)"
          />
        </g>
      </svg>
    </div>

    <audio ref="winAudio" src="/multimedia/monedas1.mp3"></audio>
    <audio ref="stepAudio" src="/multimedia/monedas2.mp3"></audio>
  </main>
</template>
