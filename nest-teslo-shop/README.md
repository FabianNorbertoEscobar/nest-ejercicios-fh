# Teslo Shop API

API REST de una tienda de ropa: productos con imágenes, autenticación con JWT y roles, carga de archivos, chat en tiempo real por WebSockets y documentación Swagger. Incluye una semilla de datos.

## Stack

- NestJS + TypeScript
- PostgreSQL 14 + TypeORM
- Autenticación: Passport, JWT, bcrypt
- Socket.IO (`@nestjs/websockets`)
- Swagger (`@nestjs/swagger`)
- Archivos estáticos con `@nestjs/serve-static` y subida con Multer
- Docker Compose (base de datos)

## Cómo levantarlo

1. Instalar dependencias:
   ```bash
   yarn install
   ```
2. Copiar `.env.template` a `.env` y completar los valores (`DB_*`, `PORT`, `HOST_API`, `JWT_SECRET`).
3. Levantar PostgreSQL:
   ```bash
   docker-compose up -d
   ```
4. Iniciar la app en modo desarrollo:
   ```bash
   yarn start:dev
   ```
5. Cargar la semilla de datos: `GET http://localhost:3000/api/seed`

La documentación Swagger queda disponible en `http://localhost:3000/api`.

## Tests

```bash
yarn test
yarn test:e2e
```

## Contenido relacionado

- [`nest-car-dealership`](./nest-car-dealership): ejercicio previo del curso.
- [`TEMARIO-REPASO.md`](./TEMARIO-REPASO.md): temario de repaso.
