const Card = require('../models/card');
const {
  ServerError, BadRequest, NotFoundError,
} = require('../middlewares/errors');

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    return res.status(200).json({ cards });
  } catch (error) {
    return ServerError('Error al obtener las cards');
  }
};

exports.createCard = async (req, res) => {
  const { name, link, owner } = req.body;
  try {
    const newCard = await Card.create({ name, link, owner });
    return res.status(201).json(newCard);
  } catch (error) {
    return BadRequest('Error al crear la card');
  }
};

exports.deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return NotFoundError('Card no encontrada');
    }
    return res.status(200).json({ message: 'Card eliminada correctamente' });
  } catch (error) {
    return ServerError('Error al eliminar la Card');
  }
};

exports.likeCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    return res.status(200).json(updatedCard);
  } catch (error) {
    return BadRequest('Error al dar like a la Card');
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    return res.status(200).json(updatedCard);
  } catch (error) {
    return BadRequest('Error al dar unlike a la Card');
  }
};
