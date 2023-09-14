const express = require('express');

const router = express.Router();
const cardController = require('./cards');
const User = require('../models/user');

router.get('/cards', cardController.getAllCards);

router.post('/cards', cardController.createCard);

router.delete('/cards/:cardId', cardController.deleteCardById);

exports.updateUserProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el perfil del usuario' });
  }
};

exports.updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true },
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el avatar del usuario' });
  }
};

module.exports = router;
