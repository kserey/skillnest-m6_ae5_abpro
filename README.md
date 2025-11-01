# 📦 API RESTful de Gestión de Inventario (M6_AE5_ABPRO)

Este repositorio contiene la solución para el **Ejercicio Grupal M6_AE5_ABPRO** del Bootcamp Full Stack de Skillnest.

El proyecto es una API RESTful simple desarrollada con **Node.js** y **Express.js** que simula un sistema de gestión de inventarios. Implementa las operaciones CRUD (Crear, Leer, Actualizar, Eliminar), manteniendo la persistencia de los datos en un archivo **JSON** a través del módulo nativo **`fs`** (File System) de Node.js.

---

## ✨ Características Principales

* **Persistencia en JSON:** El inventario de productos se almacena en `products.json`.
* **Modularización Avanzada:** La lógica de lectura/escritura de archivos (`fs.readFileSync` y `fs.writeFileSync`) está completamente separada en **`fileUtils.js`**, permitiendo que `server.js` se enfoque únicamente en la definición de las rutas de la API.
* **API Pura:** Diseño enfocado en servir datos de inventario (no hay vistas HTML).

---

## 🛠️ Tecnologías Utilizadas

* **Node.js / Express.js:** Servidor web y rutas de la API.
* **Módulo `fs` (File System):** Manejo síncrono de la persistencia de datos en disco.
* **JSON:** Formato de almacenamiento de los productos.

---

## 📂 Estructura del Proyecto
```
.
├── node_modules/ # (Ignorada por .gitignore)
├── printsPostman/ # Evidencia de pruebas de la API (Screenshots)
│ ├── products_delete.png
│ ├── products_get.png
│ ├── products_post.png
│ └── products_put.png
├── fileUtils.js # Módulo de utilidades para leer/escribir en products.json
├── server.js # Servidor Express y definición de rutas (API)
├── products.json # Archivo de persistencia (almacena el inventario)
├── package.json
├── package-lock.json
└── .gitignore
```

---

## 🚀 Puesta en Marcha

Para iniciar el servidor y probar la API:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/kserey/skillnest-m6_ae5_abpro.git
    cd skillnest-m6_ae5_abpro
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar el servidor:**
    ```bash
    node server.js
    ```
    El servidor se ejecutará en `http://localhost:3000`.

---

## 🔬 Uso de la API con Postman

La API se gestiona completamente a través de peticiones HTTP en la ruta base `/products`. Asegúrate de configurar el tipo de cuerpo para `POST` y `PUT` como **`Body` → `raw` → `JSON`**.

| Método | Ruta | Descripción | Body (JSON Requerido) |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:3000/` | **Ruta de Bienvenida** (Instrucciones detalladas). | N/A |
| `GET` | `http://localhost:3000/products` | Obtiene el inventario completo de productos. | N/A |
| `POST` | `http://localhost:3000/products` | Crea un nuevo producto (genera automáticamente `id`). | `{"name": "Laptop", "price": 1200, "quantity": 15}` |
| `PUT` | `http://localhost:3000/products/:id` | Actualiza propiedades como `name`, `price` o `quantity` de un producto. | `{"price": 1150}` o `{"quantity": 20}` |
| `DELETE` | `http://localhost:3000/products/:id` | Elimina un producto según el ID proporcionado en la URL. | N/A |

**Nota sobre `:id`:** Para las operaciones `PUT` y `DELETE`, debes reemplazar `:id` con un ID real de un producto obtenido con la petición `GET`.
