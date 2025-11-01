const express = require('express');
const { readProducts, writeProducts, generateId } = require('./fileUtils');
const app = express();
const PORT = 3000;

app.use(express.json());

// ==== URL BASE ====

// server.js (Ruta GET /)
app.get('/', (req, res) => {
    res.send('<h1>API de Gestión de Inventarios (M6_AE5_ABPRO) está en funcionamiento. Usa /products para CRUD.</h1>');
});

// --- A. Crear un Producto (POST /products) ---
app.post('/products', (req, res) => {
    const products = readProducts();
    const { name, price, quantity } = req.body; // Desestructura las propiedades del body

    if (!name || !price || !quantity) {
        return res.status(400).json({ message: 'Faltan propiedades requeridas: name, price, quantity.' });
    }
    
    // Crear el nuevo producto con ID y las propiedades del body
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

// --- B. Obtener Todos los Productos (GET /products) ---
app.get('/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});


// --- C. Modificar un Producto (PUT /products/:id) ---
app.put('/products/:id', (req, res) => {
    const productId = Number(req.params.id); // Convertir a número para la comparación
    let products = readProducts();
    
    // Buscar el índice del producto
    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const productToUpdate = products[index];
    
    // Aplicar solo las actualizaciones permitidas (name, price, quantity)
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


// --- D. Eliminar un Producto (DELETE /products/:id) ---
app.delete('/products/:id', (req, res) => {
    const productId = Number(req.params.id);
    const products = readProducts();

    const initialLength = products.length;
    // Filtrar, dejando solo los productos cuyo ID NO coincide
    const updatedProducts = products.filter(p => p.id !== productId);

    if (updatedProducts.length === initialLength) {
        return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
    }

    writeProducts(updatedProducts);

    // 204 No Content es el código estándar para una eliminación exitosa
    res.status(204).send(); 
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de inventario iniciado en http://localhost:${PORT}`);
});