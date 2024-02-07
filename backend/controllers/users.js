const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/utils');

const User = require('../models/user');

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
  // console.log('req', req);
  console.log('req.body', req.body); // me lista mail y pass aunq no esté en la BD
  try {
    const user = await User.findUserByCredentials(email, password);
    console.log('user', user); // usuario no encontrado

    if (user && user instanceof Error) {
      return res.status(403).send(user.message);
    }
    const token = await generateToken(user);
    return res.status(200).send({ token });
  } catch (error) {
    return res.status(401).send({ message: 'Email o contraseña incorrectos', details: error });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const userExists = await doesUserExist(email);
    if (userExists) {
      return res.status(409).send('Mail ya registrado anteriormente');
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
      return res.status(400).send('Error en la validacion de los datos');
    }
    return res.status(500).send('Error al crear el usuario en el servidor');
  }
};

const getUserbyId = async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send('Ha ocurrido un error en el servidor al buscar el usuario');
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
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).send('Error al actualizar el perfil del usuario');
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
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(400).send({ error: 'Error al actualizar el avatar del usuario' });
  }
};

module.exports = {
  createUser, updateUserProfile, updateUserAvatar, login, getUserbyId,
};
