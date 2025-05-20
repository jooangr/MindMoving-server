# MindMoving Server

Backend Node.js + Express para la aplicación MindMoving.

## 🔧 Tecnologías
- Node.js
- Express
- MongoDB + Mongoose
- bcrypt (para cifrado de contraseñas)
- dotenv (variables de entorno)

## 🚀 Funcionalidades
- Registro de usuarios (`POST /api/register`)
- Inicio de sesión (`POST /api/login`)
- Guardar sesiones EEG (`POST /api/sesiones`)
- Obtener sesiones de un usuario (`GET /api/sesiones/:userId`)

## 🛠️ Instalación
```bash
git clone https://github.com/jooangr/MindMoving-server.git
cd MindMoving-server
npm install
```

## ⚙️ Configuración
Crea un archivo `.env` en la raíz con el siguiente contenido:
```bash
MONGO_URI=mongodb://localhost:27017/mindmovingDB
```

## ▶️ Ejecutar
```bash
npm start
```

## 📦 Estructura del proyecto
```
server/
├── controllers/
├── models/
├── routes/
├── db.js
├── index.js
├── .env.example
```

## 🧠 Autor
- Joan G. (jooangr)