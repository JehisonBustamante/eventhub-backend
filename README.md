# EventHub Backend

API REST para la plataforma EventHub, construida con NestJS y TypeORM.

Creado por Jehison Bustamante.

## Descripcion

Este proyecto proporciona un backend robusto para la gestion de eventos. Incluye autenticacion de usuarios, creacion de eventos y un sistema de inscripciones donde los usuarios pueden unirse o retirarse de los eventos.

## Características

- Autenticacion: Sistema de autenticacion seguro local y basado en JWT.
- Gestion de Eventos: Operaciones CRUD para eventos (Crear, Leer, Actualizar, Eliminar).
- Acceso Publico: Rutas optimizadas para la exploracion publica de eventos.
- Sistema de Inscripcion: Relación Muchos-a-Muchos entre usuarios y eventos que permite a los usuarios inscribirse (unirse) o cancelar su inscripcion (salir) de los eventos.
- Seguridad: CORS habilitado para una integracion perfecta con el frontend y Pipes de Validacion para la integridad de los datos.

## Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- PostgreSQL (o su base de datos preferida compatible con TypeORM)

## Instalacion

1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en un archivo .env (ver .env si esta disponible).

## Ejecuccion de la aplicacion

```bash
# desarrollo
npm run start

# modo watch (seguimiento)
npm run start:dev

# modo produccion
npm run start:prod
```

## Endpoints de la API

### Autenticación
- POST /auth/login: Inicio de sesion de usuario
- POST /auth/register: Registro de usuario

### Eventos
- GET /events: Listar todos los eventos (Publico)
- GET /events/:id: Obtener detalles de un evento (Publico)
- POST /events: Crear un nuevo evento (Autenticado)
- PATCH /events/:id: Actualizar un evento (Autenticado)
- DELETE /events/:id: Eliminar un evento (Autenticado)
- POST /events/:id/join: Unirse a un evento (Autenticado)
- DELETE /events/:id/leave: Salirse de un evento (Autenticado)

## Licencia

Este proyecto está bajo la Licencia MIT.
