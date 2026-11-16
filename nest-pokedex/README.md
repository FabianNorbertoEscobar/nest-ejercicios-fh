# Pokédex API

API REST de una Pokédex construida con NestJS. Guarda Pokémon en MongoDB, permite CRUD con paginación y se puebla con una semilla que consume [PokeAPI](https://pokeapi.co/).

> **Atención:** en este repositorio falta la carpeta `src/` de este proyecto (solo están la configuración, Docker y `package.json`). Para ejecutarlo hay que restaurar el código fuente.

## Stack

- NestJS (Express) + TypeScript
- MongoDB 5 + Mongoose
- Validación con `class-validator` / `class-transformer` y `joi` (variables de entorno)
- `@nestjs/serve-static`, Axios
- Docker / Docker Compose

## Cómo levantarlo (desarrollo)

1. Instalar dependencias:
   ```bash
   yarn install
   ```
2. Levantar MongoDB:
   ```bash
   docker-compose up -d
   ```
3. Copiar `.env.template` a `.env` y completar las variables (`MONGODB`, `PORT`, `DEFAULT_LIMIT`, `SECRET_KEY`, `JWT_SEED`).
4. Iniciar la app:
   ```bash
   yarn start:dev
   ```
5. Poblar la base con la semilla: `GET http://localhost:3000/api/v2/seed`

## Producción

1. Crear `.env.prod` con las variables de producción.
2. Construir y levantar:
   ```bash
   docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
   ```
