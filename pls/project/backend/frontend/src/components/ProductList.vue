<template>
  <div class="product-container">
    <h1><b>Productos</b></h1>
    <div class="add-product-form">
      <input v-model="newProduct.name" type="text" placeholder="Name" />
      <input v-model="newProduct.description" type="text" placeholder="Description" />
      <input v-model.number="newProduct.price" type="number" placeholder="Price" />
      <button @click="addProduct">Add</button>
    </div>

    <div class="product-list">
      <h2><b>Lista de productos</b></h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product._id">
            <td>{{ product._id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click="editProduct(product)">📝</button>
              <button @click="deleteProduct(product._id)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductList",
  data() {
    return {
      products: [],
      newProduct: {
        name: "",
        description: "",
        price: 0,
      },
    };
  },
  async created() {
    await this.fetchProducts();
  },
  methods: {
    // Fetch products from API
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error al obtener products:", error);
      }
    },

    // Add a new product
    async addProduct() {
      try {
        await axios.post("http://localhost:5000/products", this.newProduct);
        alert("Producto añadido correctamente.");
        this.newProduct = { name: "", description: "", price: 0 };
        await this.fetchProducts(); // Update the list after adding
      } catch (error) {
        console.error("Error al añadir el producto:", error);
      }
    },

    // Delete a product
    async deleteProduct(id) {
      console.log("ID a eliminar:", id);
      if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        try {
          await axios.delete(`http://localhost:5000/products/${id}`);
          this.products = this.products.filter((product) => product._id !== id);
          alert("Producto eliminado correctamente.");
        } catch (error) {
          console.error("Error al eliminar producto:", error);
          alert("Hubo un problema al eliminar el producto.");
        }
      }
    },

    // Placeholder for editing a product (optional)
    editProduct(product) {
      alert(`Editar producto con ID: ${product._id}`);
      // Aquí puedes implementar una lógica para abrir un modal/formulario de edición.
    },
  },
};
</script>

<style scoped>
.product-container {
  font-family: 'Montserrat', sans-serif;
  max-width: 800px;
  margin: 0 auto;
}
.add-product-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.add-product-form input {
  padding: 5px;
  border-radius: 20px;
  border: 1px solid green;
}
.product-list table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 20px;
}
.product-list th,
.product-list td {
  border: 1px solid red;
  padding: 10px;
  text-align: left;
}

.product-list button {
  margin-left: 20px;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  background-color: #e43721;
  color: #fff;
  cursor: pointer;
}

.add-product-form button{
  margin-left: 20px;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  background-color: #21e472;
  color: #fff;
  cursor: pointer;
}
</style>
