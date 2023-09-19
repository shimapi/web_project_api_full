const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/utils');

const User = require('../models/user');

/*
const express = require('express');
const router = express.Router();
const cardController = require('./cards');
router.get('/cards', cardController.getAllCards);
router.post('/cards', cardController.createCard);
router.delete('/cards/:cardId', cardController.deleteCardById); */

const doesUserExist = async (email) => {
  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    return new Error('Ha ocurrido un error en el servidor al buscar el usuario');
  }
  return !!user;
};

const hashPassword = async (password) => bcrypt.hash(password, 10);

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);

    if (user && user instanceof Error) {
      return res.status(401).send({ message: user.message });
    }
    const token = await generateToken(user);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(401).send({ message: 'Email o contraseña incorrectos', details: error });
  }
};
/* const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userOrError = await User.findUserByCredentials(email, password);

    if (typeof userOrError === 'string') {
      // Enviar un error 401 con el mensaje de error
      return res.status(401).send({ message: userOrError });
    }

    // Continuar con la generación del token y enviarlo
    const token = await generateToken(userOrError);
    console.log('token', token);
    return res.send({ token });
  } catch (error) {
    return res.status(500).send({ message: 'Error en el servidor', details: error });
  }
}; */

const createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const userExists = await doesUserExist(email);
    if (userExists) {
      return res.status(409).send({ message: 'Mail ya registrado anteriormente' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({ data: newUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ error: 'Error en la validacion de los datos', details: error });
    }
    return res.status(500).send({ error: 'Error al crear el usuario en el servidor' });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: 'Error al actualizar el perfil del usuario' });
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ error: 'Error al actualizar el avatar del usuario' });
  }
};

module.exports = {
  createUser, updateUserProfile, updateUserAvatar, login,
};
