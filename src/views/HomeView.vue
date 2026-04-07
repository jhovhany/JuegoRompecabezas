<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  nombre: '',
  cantidad: ''
})

function comenzar() {
  if (!form.nombre.trim()) {
    alert('¡Ingresa tu nombre, por favor!')
    return
  }

  if (!form.cantidad.trim()) {
    alert('¡Ingresa la cantidad que deseas ganar, por favor!')
    return
  }

  localStorage.setItem(
    'atelierGameData',
    JSON.stringify({
      nombre: form.nombre.trim(),
      cantidad: form.cantidad.trim()
    })
  )

  router.push('/juego')
}
</script>

<template>
  <main class="page form-page">
    <form class="start-card" @submit.prevent="comenzar">
      <h2>Rompecabezas</h2>
      <input
        v-model="form.nombre"
        type="text"
        placeholder="🔒 ¿Cuál es tu nombre?"
        name="text1"
        autocomplete="off"
      />
      <input
        v-model="form.cantidad"
        type="text"
        placeholder="💰 ¿Cuánto quieres ganar?"
        name="text2"
        autocomplete="off"
      />
      <button type="submit">Comenzar</button>
    </form>
  </main>
</template>
