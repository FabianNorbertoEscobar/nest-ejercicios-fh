# Car Dealership

Ejercicio introductorio de NestJS: API REST de una concesionaria con autos y marcas, con datos guardados en memoria (sin base de datos).

## Stack

- NestJS + TypeScript
- Validación con `class-validator` / `class-transformer`
- `uuid` para los identificadores

## Cómo levantarlo

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar en desarrollo:
   ```bash
   npm run start:dev
   ```
3. Poblar los datos de ejemplo: `GET http://localhost:3000/seed`

Los datos se pierden al reiniciar la aplicación.

## Tests

```bash
npm run test
```
