# Orders Microservice

Microservicio de órdenes de compra: crea órdenes consultando precios a `products-ms`, gestiona estados y el pago. Se comunica por NATS.

## Stack

- NestJS + TypeScript (microservicio NATS)
- Prisma + PostgreSQL 16
- `class-validator`, `joi`
- Docker Compose (base de datos)

## Cómo levantarlo

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.template` a `.env` (`PORT`, `DATABASE_URL`, `NATS_SERVERS`, host/puerto de products-ms).
3. Levantar PostgreSQL:
   ```bash
   docker compose up -d
   ```
4. Levantar NATS:
   ```bash
   docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
   ```
5. Iniciar (ejecuta `prisma migrate dev` y `prisma generate`):
   ```bash
   npm run start:dev
   ```

## Producción

```bash
docker build -f dockerfile.prod -t orders-ms .
```
