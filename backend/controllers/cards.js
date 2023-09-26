const Card = require('../models/card');

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    return res.status(200).json({ cards });
  } catch (error) {
    return res.status(500).send('Error al obtener las cards', error);
  }
};

exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  try {
    const newCard = await Card.create({ name, link, owner: _id });
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(400).send('Error al crear la card', error);
  }
};

exports.deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      return res.status(404).send('Card no encontrada');
    }
    return res.status(200).json({ message: 'Card eliminada correctamente' });
  } catch (error) {
    return res.status(500).send('Error al eliminar la Card', error);
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
    return res.status(400).send('Error al dar like a la Card', error);
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
    return res.status(400).send('Error al dar unlike a la Card', error);
  }
};
