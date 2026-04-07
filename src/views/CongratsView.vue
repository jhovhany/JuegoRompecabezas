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
const handleResize = () => {
  resizeCanvas(true)
}

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
  const total = 320
  particles = Array.from({ length: total }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 10 + 2,
    d: Math.random() * total,
    color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`,
    tilt: Math.floor(Math.random() * 7) - 6,
    vx: (Math.random() - 0.5) * 3.2,
    vy: Math.random() * 2.6 + 2.2,
    wobble: Math.random() * 0.08 + 0.03
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
  angle += 0.03

  for (let i = 0; i < particles.length; i += 1) {
    const p = particles[i]
    p.y += p.vy + Math.cos(angle + p.d) * 0.7
    p.x += p.vx + Math.sin(angle * 2 + p.d) * 2.4
    p.tilt += Math.sin(angle + p.d) * p.wobble

    if (p.x > width + 18 || p.x < -18 || p.y > height + 18) {
      const fromTop = Math.random() < 0.8
      particles[i] = {
        x: fromTop ? Math.random() * width : Math.sin(angle) > 0 ? -12 : width + 12,
        y: fromTop ? -12 : Math.random() * height,
        r: p.r,
        d: p.d,
        color: p.color,
        tilt: Math.floor(Math.random() * 7) - 6,
        vx: (Math.random() - 0.5) * 3.2,
        vy: Math.random() * 2.6 + 2.2,
        wobble: Math.random() * 0.08 + 0.03
      }
    }
  }
}

function loop() {
  draw()
  update()
  animationId = requestAnimationFrame(loop)
}

function resizeCanvas(resetParticles = false) {
  const canvas = canvasRef.value
  if (!canvas) return

  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width
  canvas.height = height

  if (resetParticles) {
    initParticles()
  }
}

function setupCanvas() {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  resizeCanvas(true)
  loop()
}

function restartGame() {
  router.push('/')
}

onMounted(() => {
  if (!loadUser()) return
  setupCanvas()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <main class="page congrats-page">
    <section id="content" class="congrats-card" aria-live="polite">
      <div class="badge-pill">Victoria desbloqueada</div>
      <h1 class="winner-line">¡Felicidades, {{ user.nombre }}!</h1>
      <h2 class="winner-amount">Te mereces ganar {{ user.cantidad }}</h2>
      <p>
        Los negocios son como un rompecabezas: se construyen con paciencia,
        estrategia y cada pieza bien colocada.
      </p>
      <a href="#" class="button large" @click.prevent="restartGame">
        <span>
          <img src="/img/trofeo.svg" width="40" height="40" alt="Trofeo" />
        </span>
        Comenzar de nuevo
      </a>
    </section>

    <canvas id="canvas" ref="canvasRef"></canvas>
  </main>
</template>
