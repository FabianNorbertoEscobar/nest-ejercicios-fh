# Products Microservice

Microservicio de catálogo de productos (CRUD con paginación). Se comunica por NATS.

## Stack

- NestJS + TypeScript (microservicio NATS)
- Prisma + SQLite
- `class-validator`, `joi`

## Cómo levantarlo

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.template` a `.env` (`PORT`, `DATABASE_URL`, `NATS_SERVERS`).
3. Crear la base y aplicar migraciones:
   ```bash
   npx prisma migrate dev
   ```
   (Opcional: `data/products.sql` contiene productos de ejemplo.)
4. Levantar NATS:
   ```bash
   docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
   ```
5. Iniciar:
   ```bash
   npm run start:dev
   ```

## Producción

```bash
docker build -f dockerfile.prod -t products-ms .
```
