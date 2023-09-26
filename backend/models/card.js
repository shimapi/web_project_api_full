const mongoose = require('mongoose');

// const avatarValidator = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_~:/?%#@[\]!$&'()*+,;=]+$/;
// const avatarValidator = /^\S+@\S+\.\S+$/;



const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
/*       validator: function validateLink(value) {
        return avatarValidator.test(value);
      },
      message: 'El enlace de la imagen no es válido', */
      validator(value) {
        const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_~:/?%#[\]@!$&'()*+,;=.]+$/;
        return urlRegex.test(value);
      },
      message: (props) => `${props.value} no es una imagen válida`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('card', cardSchema);
module.exports = Card;
