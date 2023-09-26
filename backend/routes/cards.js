const express = require('express');
const Card = require('../models/card');
const cardController = require('../controllers/cards');
const authorize = require('../middlewares/auth');

const router = express.Router();

router.get('/', authorize, async (req, res) => {
  try {
    const cards = await Card.find();
    return res.status(200).json({ cards });
  } catch (error) {
    return res.status(500).send('Error al obtener las cards');
  }
});

router.post('/', authorize, async (req, res) => {
  const {
    name, link,
  } = req.body;
  const { _id } = req.user;
  console.log(req.body);
  try {
    const newCard = await Card.create({
      name, link, owner: _id,
    });
    return res.status(201).json(newCard);
  } catch (error) {
    console.log(error);
    return res.status(400).send('Error al crear la card');
  }
});

router.put('/:cardId/likes', cardController.likeCard);

router.delete('/:cardId/likes', cardController.dislikeCard);

module.exports = router;
