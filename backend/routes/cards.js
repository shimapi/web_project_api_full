const express = require('express');

const { celebrate, Joi } = require('celebrate');
const cardController = require('../controllers/cards');
const authorize = require('../middlewares/auth');
const { validateURL } = require('../middlewares/validator');

const router = express.Router();

router.get('/', authorize, async (req, res) => {
  cardController.getAllCards(req, res);
});

router.post(
  '/',
  authorize,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom(validateURL),
    }),
  }),
  async (req, res) => {
    cardController.createCard(req, res);
  },
);

router.put('/likes/:cardId', authorize, async (req, res) => {
  cardController.likeCard(req, res);
});

router.delete('/likes/:cardId', authorize, async (req, res) => {
  cardController.dislikeCard(req, res);
});

router.delete('/:cardId', authorize, async (req, res) => {
  cardController.deleteCardById(req, res);
});

module.exports = router;
