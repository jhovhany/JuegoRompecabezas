<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const canvasRef = ref(null)
const user = reactive({
  nombre: '',
  cantidad: ''
})

let animationId = 0
let particles = []
let angle = 0
let ctx
let width = 0
let height = 0

function loadUser() {
  const saved = localStorage.getItem('atelierGameData')
  if (!saved) {
    router.replace('/')
    return false
  }

  try {
    const parsed = JSON.parse(saved)
    user.nombre = parsed.nombre || ''
    user.cantidad = parsed.cantidad || ''
    return true
  } catch {
    router.replace('/')
    return false
  }
}

function initParticles() {
  const total = 250
  particles = Array.from({ length: total }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 15 + 1,
    d: Math.random() * total,
    color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`,
    tilt: Math.floor(Math.random() * 5) - 5
  }))
}

function draw() {
  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    ctx.beginPath()
    ctx.lineWidth = p.r
    ctx.strokeStyle = p.color
    ctx.moveTo(p.x, p.y)
    ctx.lineTo(p.x + p.tilt + p.r / 2, p.y + p.tilt)
    ctx.stroke()
  }
}

function update() {
  angle += 0.01

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i]
    p.y += Math.cos(angle + p.d) + 1 + p.r / 2
    p.x += Math.sin(angle) * 2

    if (p.x > width + 5 || p.x < -5 || p.y > height) {
      particles[i] = {
        x: Math.sin(angle) > 0 ? -5 : width + 5,
        y: Math.random() * height,
        r: p.r,
        d: p.d,
        color: p.color,
        tilt: p.tilt
      }
    }
  }
}

function loop() {
  draw()
  update()
  animationId = requestAnimationFrame(loop)
}

function setupCanvas() {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height
  initParticles()
  loop()
}

function restartGame() {
  router.push('/')
}

onMounted(() => {
  if (!loadUser()) return
  setupCanvas()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <main class="page congrats-page">
    <div id="content">
      <span class="winner-line">¡Felicidades! {{ user.nombre }}</span>
      <span class="winner-line">¡Mereces ganar! {{ user.cantidad }}</span>
      <p>Los negocios son como un rompecabezas, tienes que armar pieza por pieza.</p>
      <a href="#" class="button large" @click.prevent="restartGame">
        <span>
          <img src="/img/trofeo.svg" width="40" height="40" alt="Trofeo" />
        </span>
        Comenzar de Nuevo
      </a>
    </div>

    <canvas id="canvas" ref="canvasRef"></canvas>
  </main>
</template>
