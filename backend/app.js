const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

app.use('/users', users);
app.use(cards);

app.get('/', (req, res) => {
  res.send('Holis, web funcionando');
});
app.use((req, res) => {
  res.status(404).json({ error: '404: Recurso no encontrado' });
});
app.use((err, req, res) => {
  res.status(500).json({ error: '500: Error interno del servidor' });
});

app.use((req, res, next) => {
  req.user = {
    _id: 'dbfe53c3c4d568240378b0c6',
  };

  next();
});

module.exports.createCard = (req) => {
  console.log(req.user._id); // _id se volverá accesible
};

app.listen(3005);
