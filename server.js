const express = require('express');
const { readProducts, writeProducts, generateId } = require('./fileUtils');
const app = express();
const PORT = 3000;

app.use(express.json());

// ==== URL BASE ====

// server.js (Ruta GET /)
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>API de Gestión de Inventarios (M6_AE5_ABPRO)</title>
            <style>
                body { font-family: sans-serif; margin: 40px; background-color: #f4f4f9; color: #333; }
                h1 { color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
                h2 { color: #28a745; margin-top: 30px; }
                code { background-color: #eee; padding: 2px 5px; border-radius: 4px; }
                .instructions { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                th { background-color: #e9ecef; }
            </style>
        </head>
        <body>
            <h1>Servidor de Inventarios (API RESTful)</h1>
            <p><strong>Ejercicio:</strong> M6_AE5_ABPRO - Gestión de Inventario con persistencia en archivos JSON.</p>
            <p>La API está en funcionamiento. Utiliza un cliente HTTP como <strong>Postman</strong> para interactuar con las siguientes rutas:</p>

            <div class="instructions">
                <h2>Rutas de la API (CRUD)</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Método</th>
                            <th>Ruta</th>
                            <th>Descripción</th>
                            <th>Body (JSON)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>GET</code></td>
                            <td><code>/products</code></td>
                            <td>Obtiene el listado completo de productos del inventario.</td>
                            <td>No requerido</td>
                        </tr>
                        <tr>
                            <td><code>POST</code></td>
                            <td><code>/products</code></td>
                            <td>Crea un nuevo producto en el inventario.</td>
                            <td><code>{"name": "Laptop", "price": 1200, "quantity": 15}</code></td>
                        </tr>
                        <tr>
                            <td><code>PUT</code></td>
                            <td><code>/products/:id</code></td>
                            <td>Actualiza un producto específico por su ID.</td>
                            <td><code>{"price": 1150}</code> o <code>{"quantity": 20}</code></td>
                        </tr>
                        <tr>
                            <td><code>DELETE</code></td>
                            <td><code>/products/:id</code></td>
                            <td>Elimina un producto específico por su ID.</td>
                            <td>No requerido</td>
                        </tr>
                    </tbody>
                </table>
                
                <h2>Instrucciones para Postman</h2>
                <p>Asegúrate de configurar el tipo de cuerpo para las peticiones <code>POST</code> y <code>PUT</code> como <strong>Body → raw → JSON</strong>.</p>
                <p><strong>Ejemplo de uso de ID:</strong> Para <code>PUT</code> o <code>DELETE</code>, reemplaza <code>:id</code> en la URL por un ID real obtenido con la petición <code>GET</code>.</p>
            </div>
        </body>
        </html>
    `);
});

// === CREAR PRODUCTO ===
app.post('/products', (req, res) => {
    const products = readProducts();
    const { name, price, quantity } = req.body;

    if (!name || !price || !quantity) {
        return res.status(400).json({ message: 'Faltan propiedades requeridas: name, price, quantity.' });
    }
    
    const newProduct = {
        id: generateId(),
        name,
        price: Number(price),
        quantity: Number(quantity)
    };

    products.push(newProduct);
    writeProducts(products);
    
    res.status(201).json(newProduct);
});

// === LISTAR TODOS LOS PRODUCTOS ===
app.get('/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});


// === ACTUALIZAR UN PRODUCTO (PUT /products/:id) ===
app.put('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    let products = readProducts();
    
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const productToUpdate = products[index];
    
    if (req.body.name !== undefined) {
        productToUpdate.name = req.body.name;
    }
    if (req.body.price !== undefined) {
        productToUpdate.price = Number(req.body.price);
    }
    if (req.body.quantity !== undefined) {
        productToUpdate.quantity = Number(req.body.quantity);
    }

    writeProducts(products);
    res.json(productToUpdate);
});


// === ELIMINAR UN PRODUCTO (DELETE /products/:id) ===
app.delete('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    const products = readProducts();

    const initialLength = products.length;
    const updatedProducts = products.filter(p => p.id !== productId);

    if (updatedProducts.length === initialLength) {
        return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
    }

    writeProducts(updatedProducts);

    res.status(204).send(); 
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});