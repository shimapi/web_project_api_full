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

mongoose.connect(process.env.DB_MONGO || 'mongodb://127.0.0.1:27017/aroundb');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});
app.post('/signup', (req, res) => {
  userController.createUser(req, res);
});
app.post('/signin', (req, res) => {
  userController.login(req, res);
});

app.use('/users', users);
app.use('/cards', cards);

app.get('/', (req, res) => {
  res.status(200).send('Hola, back funcionando :)');
});

app.use(errorLogger);
app.use(errors());

app.use((error, req, res) => res.status(400).send({ message: '404: Recurso no encontrado' }));

app.use((error, req, res) => res.status(500).send({ message: '500: Error interno del servidor' }));
/*
app.use((error, req, res) => {
  res.send({ message: error.message });
}); */

app.listen(process.env.PORT || 3000);
