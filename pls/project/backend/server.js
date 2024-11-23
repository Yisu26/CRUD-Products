const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://23330012:26082003@productos.hvhuv.mongodb.net/?retryWrites=true&w=majority&appName=PRODUCTOS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connectado a MongoDB"))
.catch(err => console.error("MongoDB coonexion error:", err));
app.use(cors({ origin: "http://localhost:5173" }));


app.use(express.json());

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

// Obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo producto
app.post('/products', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const existingProduct = await Product.findOne({ name });
    
    if (existingProduct) {
      return res.status(400).json({ message: 'Producto ya existente' });
    }

    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un producto por su ID
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});


app.listen(port, () => {
  console.log(`Server conectado a http://localhost:${port}`);
});
