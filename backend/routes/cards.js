const express = require('express');
const Card = require('../models/card');
const cardController = require('../controllers/cards');

const router = express.Router();

router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json({ cards });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las cards' });
  }
});

router.post('/cards', async (req, res) => {
  const {
    name, link, owner, likes,
  } = req.body;
  try {
    const newCard = await Card.create({
      name, link, owner, likes,
    });
    res.status(201).json(newCard);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la card' });
  }
});

router.put('/cards/:cardId/likes', cardController.likeCard);

router.delete('/cards/:cardId/likes', cardController.dislikeCard);

module.exports = router;
