# nest-ejercicios-fh

Ejercicios y proyectos prácticos de **NestJS** (curso de Fernando Herrera / DevTalles), reunidos en un único repositorio.

## Proyectos

| Proyecto | Descripción | Stack principal |
|---|---|---|
| [nest-pokedex](./nest-pokedex) | API REST de una Pokédex con semilla de datos desde PokeAPI | NestJS, MongoDB, Mongoose |
| [nest-teslo-shop](./nest-teslo-shop) | API de una tienda (productos, auth JWT, archivos, WebSockets, Swagger) | NestJS, PostgreSQL, TypeORM, Passport, Socket.IO |
| [nest-teslo-shop/nest-car-dealership](./nest-teslo-shop/nest-car-dealership) | Ejercicio de concesionaria de autos (CRUD en memoria) | NestJS |
| [products-launcher](./products-launcher) | Tienda basada en microservicios, orquestada con Docker Compose / Kubernetes | NestJS, NATS, Prisma, Stripe, Docker, K8s |
| ↳ [client-gateway](./products-launcher/client-gateway) | API Gateway HTTP hacia los microservicios | NestJS, NATS |
| ↳ [auth-ms](./products-launcher/auth-ms) | Registro, login y verificación de JWT | NestJS, Prisma + MongoDB, NATS |
| ↳ [products-ms](./products-launcher/products-ms) | Catálogo de productos | NestJS, Prisma + SQLite, NATS |
| ↳ [orders-ms](./products-launcher/orders-ms) | Órdenes de compra | NestJS, Prisma + PostgreSQL, NATS |
| ↳ [payments-ms](./products-launcher/payments-ms) | Pagos y webhooks | NestJS, Stripe, NATS |

Cada proyecto es independiente y tiene su propio `README.md` con la explicación y los pasos para levantarlo.

## Requisitos generales

- [Node.js](https://nodejs.org/) 18+ (recomendado 20 LTS)
- [Docker](https://www.docker.com/) y Docker Compose (bases de datos, NATS)
- Yarn o npm, según el proyecto (se indica en cada README)

## Variables de entorno

Los archivos `.env` **no se versionan**. Cada proyecto incluye un `.env.template` que hay que copiar a `.env` y completar con valores propios (claves JWT, Stripe, credenciales de bases de datos, etc.).

## Notas

- Los datos locales de las bases de datos (`mongo/`, `postgres/`) y `node_modules/`, `dist/` están ignorados por git.
- `nest-pokedex` no contiene el código fuente (`src/`) en este repositorio; ver su README.
