const express = require('express');
const router = express.Router();
// middleware/apiKeyAuth.js
module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

const clienteController = require('../controllers/clienteController');


router.post('/', clienteController.crearCliente);
router.get('/', clienteController.obtenerClientes);
router.put('/:id', clienteController.actualizarCliente);
router.put('/estatus/:id', clienteController.actualizarEstatus);
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
