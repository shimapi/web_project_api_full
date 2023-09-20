const mongoose = require('mongoose');
const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');
const userController = require('./controllers/users');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

app.post('/signup', (req, res) => {
  userController.createUser(req, res);
});
app.post('/signin', (req, res) => {
  userController.login(req, res);
});

app.use('/users', users);
app.use(cards);

app.get('/', (req, res) => {
  res.status(200).send('Hola, web funcionando');
});
app.use((error, req, res) => {
  res.status(404).send({ error: '404: Recurso no encontrado' });
});
app.use((error, req, res) => {
  res.status(500).send({ error: '500: Error interno del servidor' });
});
app.use((error, req, res, next) => {
  res.send({ message: error.message });
});

module.exports.createCard = (req) => {
  console.log(req.user._id);
};

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});
