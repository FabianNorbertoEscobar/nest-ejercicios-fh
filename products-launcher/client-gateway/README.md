# Client Gateway

Punto de entrada HTTP de la tienda. Recibe las peticiones de los clientes, valida el JWT y las reenvía por NATS a los microservicios (productos, órdenes, pagos, auth), devolviendo la respuesta.

## Stack

- NestJS (Express) + TypeScript
- NATS (`@nestjs/microservices`)
- `class-validator`, `joi`

## Cómo levantarlo

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.template` a `.env` y completar (`PORT`, `NATS_SERVERS`).
3. Levantar NATS:
   ```bash
   docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
   ```
4. Tener corriendo los microservicios a consumir (ver [products-launcher](../README.md)).
5. Iniciar:
   ```bash
   npm run start:dev
   ```

Los endpoints cuelgan del prefijo `/api`.

## Producción

```bash
docker build -f dockerfile.prod -t client-gateway .
```
