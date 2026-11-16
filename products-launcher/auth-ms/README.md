# Auth Microservice

Microservicio de autenticación: registro de usuarios, login (contraseñas con bcrypt) y emisión/verificación de JWT. Se comunica por NATS.

## Stack

- NestJS + TypeScript (microservicio NATS)
- Prisma + MongoDB
- JWT (`@nestjs/jwt`), bcrypt
- `joi` para validar variables de entorno

## Cómo levantarlo

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.template` a `.env` y completar (`PORT`, `NATS_SERVERS`, `DATABASE_URL` de MongoDB, `JWT_SECRET`).
3. Levantar NATS:
   ```bash
   docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
   ```
4. Iniciar (genera el cliente de Prisma automáticamente):
   ```bash
   npm run start:dev
   ```

## Producción

```bash
docker build -f dockerfile.prod -t auth-ms .
```
