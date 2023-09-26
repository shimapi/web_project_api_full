const isEmail = require('validator/lib/isEmail');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const avatarValidator = /^(http|https):\/\/(www\.)?[^\s/$.?#].[^\s]*$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return avatarValidator.test(v);
      },
      message: 'El enlace del avatar no es válido',
    },
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: (props) => `${props.value} no es un email válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    console.log('user', user);
    return 'Usuario no encontrado';
  }
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    console.log('matched', matched);
    return 'Contraseña incorrecta';
  }

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
