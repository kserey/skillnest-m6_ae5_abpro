const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, 'products.json');


// ==== FUNCIONES DE UTILIDAD ====

const readProducts = () => {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {

        return []; 
    }
};


const writeProducts = (products) => {
    try {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    } catch (error) {
        console.error("Error al escribir productos:", error.message);
    }
};


const generateId = () => {
    return Number(Date.now());
};


module.exports = {
    readProducts,
    writeProducts,
    generateId
};