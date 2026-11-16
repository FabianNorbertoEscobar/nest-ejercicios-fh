# Temario — NestJS y Teslo Shop

## 1. El proyecto en una frase

Teslo Shop es una API REST para un catálogo de productos, construida con NestJS, TypeScript, PostgreSQL y TypeORM. Incluye registro e inicio de sesión con JWT, autorización por roles, carga de imágenes, datos de prueba y mensajería en tiempo real con WebSockets.

## 2. Stack tecnológico

| Área | Tecnología | Uso en el proyecto |
| --- | --- | --- |
| Lenguaje y runtime | TypeScript, Node.js | Desarrollo de la API con tipos y decoradores. |
| Framework backend | NestJS 11 | Módulos, controladores, servicios, inyección de dependencias y ciclo de vida HTTP. |
| Servidor HTTP | Express (`@nestjs/platform-express`) | Adaptador HTTP de NestJS y recepción de archivos con Multer. |
| Base de datos | PostgreSQL 14 | Persistencia relacional del catálogo y los usuarios. |
| ORM | TypeORM | Entidades, relaciones, consultas y transacciones. |
| Configuración | `@nestjs/config`, variables de entorno | Parámetros de conexión y secretos separados del código. |
| Validación y transformación | `class-validator`, `class-transformer` | Validar y transformar datos recibidos por la API. |
| Autenticación | JWT, Passport, `passport-jwt`, `bcrypt` | Tokens de acceso, estrategia Bearer y hash de contraseñas. |
| Archivos | Multer, UUID | Recepción de imágenes, nombres únicos y almacenamiento local. |
| Tiempo real | Socket.IO, `@nestjs/websockets` | Gateway autenticado y envío de mensajes/eventos. |
| Documentación | Swagger / OpenAPI (`@nestjs/swagger`) | Metadatos de documentación de endpoints, DTO y modelos. |
| Contenedores | Docker Compose | Levantar PostgreSQL en el entorno local. |
| Pruebas y calidad | Jest, Supertest, ESLint, Prettier | Pruebas, formato y análisis estático del código. |

Las dependencias y scripts están en [package.json](package.json); la configuración de TypeScript está en [tsconfig.json](tsconfig.json) y [tsconfig.build.json](tsconfig.build.json).

## 3. Fundamentos de NestJS

- **Módulos:** agrupan funcionalidades relacionadas y declaran qué controladores y proveedores pertenecen a cada área. Ejemplos: [src/products/products.module.ts](src/products/products.module.ts), [src/auth/auth.module.ts](src/auth/auth.module.ts) y [src/files/files.module.ts](src/files/files.module.ts).
- **Controladores:** definen rutas HTTP, reciben parámetros, query strings y body, y delegan el trabajo. Ejemplos: [src/products/products.controller.ts](src/products/products.controller.ts) y [src/auth/auth.controller.ts](src/auth/auth.controller.ts).
- **Servicios:** contienen lógica de negocio y acceso a datos; Nest los inyecta donde se necesitan. Ejemplos: [src/products/products.service.ts](src/products/products.service.ts) y [src/auth/auth.service.ts](src/auth/auth.service.ts).
- **Inyección de dependencias:** desacopla los componentes y permite que los módulos compartan servicios y repositorios.
- **Decoradores:** describen rutas, parámetros, validación, autorización y metadatos de documentación.
- **Excepciones HTTP:** se usan para expresar errores de validación, autenticación, permisos o recursos inexistentes.
- **Composición de la aplicación:** [src/app.module.ts](src/app.module.ts) configura la aplicación y conecta sus módulos; [src/main.ts](src/main.ts) configura el arranque del servidor.

### Flujo HTTP

1. Una petición llega a una ruta definida por el controlador.
2. Nest ejecuta guardas e interceptores que correspondan.
3. DTO y pipes validan o transforman la entrada.
4. El controlador delega la operación al servicio.
5. El servicio consulta o modifica la base de datos mediante TypeORM.
6. El controlador devuelve la respuesta o Nest serializa/lleva la excepción al cliente.

## 4. API REST y catálogo

El módulo de productos implementa operaciones de creación, consulta, actualización y eliminación (CRUD):

- Listar productos con paginación mediante `limit` y `offset`.
- Buscar un producto por UUID, título exacto sin distinguir mayúsculas o slug.
- Crear y actualizar productos, asociándolos al usuario autenticado cuando corresponde.
- Gestionar las imágenes relacionadas con un producto.
- Traducir errores de persistencia —por ejemplo, una restricción de unicidad— a errores HTTP comprensibles.

Los endpoints y la división de responsabilidades están en [src/products/products.controller.ts](src/products/products.controller.ts) y [src/products/products.service.ts](src/products/products.service.ts).

### DTO y validación de entradas

Los DTO definen la forma esperada de los datos y aplican reglas sobre campos como título, precio, stock, tallas, género, etiquetas e imágenes. El DTO de actualización reutiliza el de creación como una versión parcial.

- Registro e inicio de sesión: [src/auth/dto/create-user.dto.ts](src/auth/dto/create-user.dto.ts), [src/auth/dto/login-user.dto.ts](src/auth/dto/login-user.dto.ts).
- Creación y actualización de productos: [src/products/dto/create-product.dto.ts](src/products/dto/create-product.dto.ts), [src/products/dto/update-product.dto.ts](src/products/dto/update-product.dto.ts).
- Mensajes WebSocket: [src/messages-ws/dtos/new-message.dto.ts](src/messages-ws/dtos/new-message.dto.ts).

## 5. Persistencia con PostgreSQL y TypeORM

- **Entidades:** representan tablas y columnas. Las entidades principales son [src/products/entities/product.entity.ts](src/products/entities/product.entity.ts), [src/products/entities/product-image.entity.ts](src/products/entities/product-image.entity.ts) y [src/auth/entities/user.entity.ts](src/auth/entities/user.entity.ts).
- **Relaciones:** el catálogo conecta productos, imágenes y usuarios mediante relaciones de TypeORM.
- **UUID y restricciones:** identificadores y restricciones de unicidad ayudan a identificar y proteger los registros.
- **Repositorios y consultas:** los servicios encapsulan las operaciones de persistencia y las consultas de búsqueda.
- **Query builder y transacciones:** la actualización de productos puede coordinar modificaciones relacionadas, incluidas sus imágenes, dentro de una transacción.
- **Hooks y normalización:** la entidad de producto prepara el slug a partir del título cuando hace falta y lo normaliza antes de persistir.
- **Semilla de datos:** el módulo seed carga usuarios y productos de ejemplo desde [src/seed/data/seed-data.ts](src/seed/data/seed-data.ts), con su lógica en [src/seed/seed.service.ts](src/seed/seed.service.ts).

PostgreSQL se levanta con Docker Compose, definido en [docker-compose.yaml](docker-compose.yaml). La conexión se configura con variables de entorno en [src/app.module.ts](src/app.module.ts).

## 6. Autenticación y autorización

### Autenticación

- Registro e inicio de sesión mediante los endpoints del módulo de autenticación.
- Hash de contraseñas con `bcrypt`; no se debe guardar la contraseña en texto plano.
- Emisión de JWT firmado con una clave secreta de configuración y duración definida.
- Envío del token en el encabezado `Authorization: Bearer <token>`.
- Estrategia `passport-jwt` que valida el token, recupera el usuario y rechaza cuentas inactivas.

Archivos principales: [src/auth/auth.service.ts](src/auth/auth.service.ts), [src/auth/strategies/jwt.strategy.ts](src/auth/strategies/jwt.strategy.ts) y [src/auth/auth.controller.ts](src/auth/auth.controller.ts).

### Autorización

- Las guardas protegen rutas y ejecutan la política de acceso.
- Los roles (`admin`, `super-user`, `user`) permiten limitar operaciones.
- Un decorador de roles añade metadatos que consulta la guarda de roles.
- Decoradores como `@Auth()` y `@GetUser()` reutilizan la protección y el acceso al usuario autenticado en controladores.

Los guards, estrategias, roles y decoradores están organizados en `src/auth/guards/`, `src/auth/strategies/`, `src/auth/interfaces/` y `src/auth/decorators/`.

Distinción importante: **autenticación** responde quién es el usuario; **autorización** determina qué puede hacer.

## 7. Subida y entrega de imágenes

El módulo de archivos usa Multer para recibir imágenes, genera nombres únicos con UUID y las guarda en `static/products`. Un helper filtra los tipos de archivo permitidos y el servicio/controller manejan la carga y la recuperación por nombre.

Los archivos de este módulo son [src/files/files.controller.ts](src/files/files.controller.ts), [src/files/files.service.ts](src/files/files.service.ts), [src/files/helpers/fileFilter.helper.ts](src/files/helpers/fileFilter.helper.ts) y [src/files/helpers/fileNamer.helper.ts](src/files/helpers/fileNamer.helper.ts).

Temas asociados: `multipart/form-data`, interceptores de archivos, rutas estáticas, nombres no predecibles y validación de contenido/tamaño. El filtro actual se basa en el MIME declarado por el cliente, por lo que no equivale a verificar el contenido real de la imagen.

## 8. WebSockets y Socket.IO

El gateway de [src/messages-ws/messages-ws.gateway.ts](src/messages-ws/messages-ws.gateway.ts) ofrece una conexión bidireccional en tiempo real. Autentica conexiones con JWT, registra clientes conectados y distribuye eventos y mensajes. El servicio asociado mantiene el registro de clientes y permite relacionar mensajes con el usuario.

El módulo permite contrastar HTTP (petición/respuesta) con WebSocket (conexión persistente), así como observar el ciclo de conexión/desconexión y la validación de identidad al conectar un cliente.

## 9. Swagger, configuración y ejecución

- Swagger/OpenAPI documenta la interfaz de la API mediante decoradores de NestJS.
- `@nestjs/config` y `.env` mantienen parámetros de entorno fuera del código fuente.
- Docker Compose configura PostgreSQL para desarrollo local.
- Nest CLI compila y ejecuta la aplicación en desarrollo, depuración o producción.

Según [README.md](README.md), el flujo local documentado consiste en instalar dependencias, preparar `.env` a partir de `.env.template`, levantar la base de datos, iniciar Nest en modo watch y ejecutar el seed en `/api/seed`.

Scripts útiles de [package.json](package.json): `start:dev`, `build`, `start:prod`, `lint`, `format`, `test` y `test:e2e`.

## 10. Detalles del repositorio

Este apartado distingue lo implementado de lo que sería una ampliación o tarea pendiente:

- TypeORM está configurado con `synchronize: true`; es cómodo para desarrollo, pero en producción se prefieren migraciones controladas.
- En [src/app.module.ts](src/app.module.ts), el servicio de archivos estáticos apunta a `public`, mientras que el árbol del repositorio contiene `static`; conviene revisar esa diferencia antes de depender de esa ruta.
- El seed elimina datos existentes antes de cargar los de ejemplo y su endpoint no muestra actualmente una protección activa. No debe exponerse así en producción.
- Los datos del seed incluyen un rol `super` que no coincide con el rol definido `super-user`.
- La suite e2e disponible parece conservar la expectativa inicial de `GET /` con `Hello World!`; no se observan pruebas unitarias `*.spec.ts` en `src`.
- No se identifican módulos de carrito, pedidos, pagos ni flujo de compra; el alcance actual se centra en catálogo, autenticación, imágenes y mensajería.
- El análisis es del código del repositorio; no implica que las pruebas hayan sido ejecutadas.

## 11. Mapa de módulos

| Módulo | Responsabilidad |
| --- | --- |
| `products` | CRUD, búsqueda, paginación y persistencia de productos e imágenes relacionadas. |
| `auth` | Registro, login, JWT, estrategia, guards, roles y decoradores de autenticación. |
| `files` | Carga y recuperación de imágenes. |
| `messages-ws` | Conexiones y mensajería Socket.IO en tiempo real. |
| `seed` | Datos iniciales/de demostración. |
| `common` | Elementos compartidos entre módulos. |