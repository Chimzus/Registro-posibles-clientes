const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

const clienteRoutes = require('./routes/clienteRoutes');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar MongoDB:', err));

app.use('/api/clientes', clienteRoutes);
app.get('/', (req, res) => {
  res.send('✅ Backend funcionando correctamente');
});

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado a WebSocket');

  socket.on('actualizarEstatus', (data) => {
    io.emit('estatusActualizado', data);
  });
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
