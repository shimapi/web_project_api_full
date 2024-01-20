const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const users = require('./routes/users');
const cards = require('./routes/cards');
const userController = require('./controllers/users');

const requestLogger = require('./middlewares/request.log');
const errorLogger = require('./middlewares/error.log');

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_MONGO)
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

app.post('/signup', (req, res) => {
  userController.createUser(req, res);
});
app.post('/signin', (req, res) => {
  userController.login(req, res);
});

app.use('/users', users);
app.use('/cards', cards);

app.get('/', (req, res) => {
  res.status(200).send('Hola, back funcionando');
});

app.use(errorLogger);
app.use(errors());// controlador de errores de celebrate// controlador de errores centralizados

app.use((error, req, res, next) => res.status(400).send('404: Recurso no encontrado'));

app.use((error, req, res, next) => res.status(500).send('500: Error interno del servidor'));

app.use((error, req, res, next) => {
  res.send({ message: error.message });
});

module.exports.createCard = (req) => {
  console.log(req.user._id);
};

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
