# Payments Microservice

Microservicio de pagos con **Stripe**: crea sesiones de checkout y recibe el webhook de Stripe para notificar el pago a las órdenes. Se comunica por NATS.

## Stack

- NestJS + TypeScript (aplicación híbrida HTTP + NATS)
- Stripe SDK
- `joi` para validar variables de entorno

## Cómo levantarlo

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.template` a `.env` y completar (`PORT`, `STRIPE_SECRET`, `STRIPE_ENDPOINT_SECRET`, `STRIPE_SUCCESS_URL`, `STRIPE_CANCEL_URL`, `NATS_SERVERS`). Las claves se obtienen en el [dashboard de Stripe](https://dashboard.stripe.com/test/apikeys).
3. Levantar NATS:
   ```bash
   docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
   ```
4. Iniciar:
   ```bash
   npm run start:dev
   ```
5. Para probar el webhook en local, reenviar eventos con la [Stripe CLI](https://stripe.com/docs/stripe-cli) hacia `http://localhost:3003/payments/webhook`.

## Producción

```bash
docker build -f dockerfile.prod -t payments-ms .
```
