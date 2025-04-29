# 🧠 Backend - ToDo List: Backlog & Sprint Manager

API RESTful para gestionar tareas, backlog y sprints en un flujo de trabajo ágil.  
Construido con Node.js, Express y MongoDB.

---

## 🚀 Tecnologías utilizadas

- ⚙️ Node.js + Express
- 🗂 MongoDB + Mongoose
- 🧪 express-validator (validación)
- 🔀 Routers modulares por recurso
- 🌐 CORS habilitado para frontend local
- 📦 Dotenv para variables de entorno

---

## 📦 Endpoints principales

### 📝 Tareas (`/tasks`)
- `GET /tasks`: Obtener todas las tareas (con filtros opcionales)
- `GET /tasks/:id`: Obtener tarea por ID
- `POST /tasks`: Crear tarea
- `PUT /tasks/:id`: Actualizar tarea
- `DELETE /tasks/:id`: Eliminar tarea

### 📋 Backlog (`/backlog`)
- `GET /backlog`: Obtener backlog con tareas
- `POST /backlog`: Crear un backlog (si no existe)
- `PUT /backlog/add-task/:taskId`: Agregar tarea al backlog

### 🏃‍♂️ Sprints (`/sprints`)
- `GET /sprints`: Listar todos los sprints
- `GET /sprints/:id`: Ver detalles de un sprint
- `POST /sprints`: Crear un sprint
- `PUT /sprints/:id`: Actualizar un sprint
- `DELETE /sprints/:id`: Eliminar un sprint
- `PUT /sprints/:id/add-task/:taskId`: Agregar tarea al sprint

---

## 🗂 Estructura de carpetas

📁 src/ 
├── controllers/ → Lógica de negocio (tasks, backlog, sprint) 
├── models/ → Schemas de Mongoose 
├── routes/ → Rutas separadas por recurso 
├── validators/ → Validaciones con express-validator 
├── middlewares/ → Middleware de validaciones 
├── index.js → Configuración principal del servidor 
└── .env → Variables de entorno
---

## ⚙️ Instalación y ejecución

### 1. Clonar el repositorio

    ```bash
    git clone https://github.com/tu-usuario/backToDoList.git
    cd backToDoList
### 2. Instalar dependencias
npm install
### 3. Configurar variables de entorno
Crear un archivo .env:
MONGO_URL=mongodb://localhost:27017/todolist
PORT=3000
### 4. Iniciar el servidor
npm run dev
Servidor activo en: http://localhost:3000
---
## 📋 Validaciones
Se utilizan middlewares con express-validator para:
Crear tareas, sprints
Agregar tareas a sprint/backlog
Validar IDs de MongoDB


