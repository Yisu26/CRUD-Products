import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue'; // Lista de productos
import ProductAdd from '../components/ProductAdd.vue';   // Vista para añadir producto

const routes = [
  { path: '/', component: ProductList },         // Ruta para la lista de productos
  { path: '/add', component: ProductAdd },       // Ruta para añadir un producto
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
