const express = require('express');

const cardController = require('../controllers/cards');
const authorize = require('../middlewares/auth');

const router = express.Router();

router.get('/', authorize, async (req, res) => {
  cardController.getAllCards(req, res);
});

router.post('/', authorize, async (req, res) => {
  cardController.createCard(req, res);
});

router.put('/:cardId/likes', authorize, async (req, res) => {
  cardController.likeCard(req, res);
});

router.delete('/:cardId/likes', authorize, async (req, res) => {
  cardController.dislikeCard(req, res);
});
module.exports = router;
