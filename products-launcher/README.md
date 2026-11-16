# Products Launcher

Tienda basada en **microservicios** con NestJS. Un API Gateway recibe las peticiones HTTP y se comunica con los microservicios a través de **NATS**.

```
cliente ──HTTP──> client-gateway ──NATS──> auth-ms | products-ms | orders-ms | payments-ms
```

## Servicios

| Servicio | Función | Base de datos |
|---|---|---|
| [client-gateway](./client-gateway) | API Gateway HTTP (puerto 3000) | — |
| [auth-ms](./auth-ms) | Registro, login, JWT | MongoDB (Atlas) vía Prisma |
| [products-ms](./products-ms) | Catálogo de productos | SQLite vía Prisma |
| [orders-ms](./orders-ms) | Órdenes | PostgreSQL vía Prisma |
| [payments-ms](./payments-ms) | Pagos con Stripe y webhook | — |

## Stack

NestJS, NATS, Prisma, MongoDB, PostgreSQL, SQLite, Stripe, Docker / Docker Compose, Google Cloud Build + Kubernetes (Helm chart en [`k8s/`](./k8s)).

## Cómo levantarlo (desarrollo)

1. Copiar `.env.template` a `.env` y completar los valores (URL de MongoDB para auth, `JWT_SECRET`, claves de Stripe, etc.).
2. Levantar todo:
   ```bash
   docker compose up --build
   ```

El gateway queda en `http://localhost:3000/api` (según `CLIENT_GATEWAY_PORT`).

## Producción

```bash
docker compose -f docker-compose.prod.yml build
```

Las imágenes se construyen con los `dockerfile.prod` y `cloudbuild.yml` de cada servicio. Para el despliegue en Kubernetes ver [K8s.README.md](./K8s.README.md).

## Más información

- [TEMARIO-CURSO.md](./TEMARIO-CURSO.md)
- Cada servicio tiene su README para correrlo de forma individual.
- Las credenciales del `docker-compose.yml` (Postgres `123456`) son solo para desarrollo local.
