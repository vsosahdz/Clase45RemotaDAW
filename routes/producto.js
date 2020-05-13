const express = require('express');
const productoController = require('../controllers/producto');

const router = express.Router();

router.get('/agregar-producto', productoController.getAgregarProducto);
router.get('/productos', productoController.getProductos);
router.post('/agregar-producto', productoController.postAgregarProducto);
router.get('/editar-producto/:productoId', productoController.getEditarProducto);
router.post('/editar-producto', productoController.postEditarProducto);
router.post('/eliminar-producto', productoController.postEliminarProducto);

module.exports = router;
