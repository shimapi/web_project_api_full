const express = require('express');
const Card = require('../models/card');
const cardController = require('../controllers/cards');
const authorize = require('../middlewares/auth');

const router = express.Router();

router.get('/cards', authorize, async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json({ cards });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las cards' });
  }
});

router.post('/cards', authorize, async (req, res) => {
  const {
    name, link,
  } = req.body;
  const { _id } = req.user; // owner = _id
  console.log(req.body);
  try {
    const newCard = await Card.create({
      name, link, owner: _id,
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la card' });
  }
});

router.put('/cards/:cardId/likes', cardController.likeCard);

router.delete('/cards/:cardId/likes', cardController.dislikeCard);

module.exports = router;
