# MindMoving Server

Backend desarrollado en **Node.js + Express** para la aplicación móvil **MindMoving**, orientada al análisis de datos EEG y la gestión personalizada del usuario.

## Tecnologías

- Node.js
- Express
- MongoDB Atlas + Mongoose
- bcryptjs (hash de contraseñas)
- dotenv (variables de entorno)
- CORS & JSON Middleware

## Funcionalidades principales

- Registro de usuarios\*\*: `POST /api/register`
- Inicio de sesión\*\*: `POST /api/login`
- Verificación de contraseña\*\*:
  - `POST /api/verify-password`
  - `POST /api/verificar-password/:id`
- Actualizar datos del usuario\*\*: `PATCH /api/update-user/:id`
- Obtener datos del usuario\*\*: `GET /api/users/:id`
- Guardar sesiones EEG\*\*: `POST /api/sesiones`
- Obtener sesiones de un usuario\*\*: `GET /api/sesiones/:userId`
- Obtener perfil de calibración\*\*: `GET /api/perfil/:usuarioId`

## Configuración

1. Clona el repositorio:

```bash
git clone https://github.com/jooangr/MindMoving-server.git
cd MindMoving-server

npm install
```

## Configuración

Crea un archivo `.env` en la raíz con el siguiente contenido:

```bash
MONGO_URI_LOCAL=mongodb://localhost:27017/mindmovingDB
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/?retryWrites=true&w=majority

```

## Ejecutar

```bash
npm start
```

## Estructura del proyecto

```
MindMoving-server/
├── controllers/           # Lógica de negocio
│   ├── authController.js
│   ├── userController.js
│   ├── sesionController.js
│   ├── perfilController.js
    └── themeController.js
├── models/                # Modelos Mongoose (User, Sesion, Perfil)
├── routes/                # Endpoints organizados por funcionalidad
├── db.js                  # Conexión a MongoDB
├── index.js               # Punto de entrada principal
├── .env                   # Variables de entorno
├── .env.example           # Plantilla de entorno

## Despligue en la nube

Este backend está desplegado en Render (https://mindmoving-api.onrender.com) y conectado a MongoDB Atlas. El cliente móvil consume los datos desde esta URL base.

---
```
