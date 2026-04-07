# Juego de Rompecabezas (Vue 3)

Proyecto migrado a Vue 3 con Vite y Vue Router.

## Requisitos

- Node.js 20+
- npm
- Docker (opcional)

## Ejecutar en desarrollo

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

## Docker

### Producción (Nginx)

```bash
docker compose up --build app
```

Disponible en `http://localhost:8080`.

### Desarrollo (Vite dentro de contenedor)

```bash
docker compose up --build dev
```

Disponible en `http://localhost:5173`.

## Notas de migración

- Flujo SPA con rutas: `/`, `/juego`, `/felicidades`.
- Datos de usuario almacenados en `localStorage` (`atelierGameData`).
- Assets estáticos en `public/img` y `public/multimedia`.
