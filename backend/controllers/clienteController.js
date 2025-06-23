const Cliente = require('../models/Cliente');

// Crear nuevo cliente
exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar todo el cliente (editar)
exports.actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(clienteActualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar solo el estatus del cliente
exports.actualizarEstatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { estatus } = req.body;
    const clienteActualizado = await Cliente.findByIdAndUpdate(id, { estatus }, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(clienteActualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    if (!clienteEliminado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
