const express = require('express');

const router = express.Router();

const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/users');
const authorize = require('../middlewares/auth');
const { validateURL } = require('../middlewares/validator');

router.get('/', authorize, (req, res) => {
  userController.getUsers(req, res);
});

router.get('/me', authorize, (req, res) => {
  userController.getUserbyId(req, res);
});

/* /* test de celebrate middleware
const userSchemaValidation = Joi.object()
  .keys({
    name: Joi.string().empty('').default('Jacques Cousteau').min(2).max(30),
    about: Joi.string().empty('').default('Explorador').min(2).max(30),
    avatar: Joi.string().empty('').default('https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg').uri(),

    email: Joi.string()
      .required()
      .email({ tlds: { allow: true } }) // Habilita la validación de TLDs
      .messages({
        'string.email': 'Debe ser un email válido',
      }),
    password: Joi.string()
      .required()
      .min(6)
      .custom((value, helpers) => {
        if (value.length < 6) {
          return helpers.message(
            'La contraseña debe tener al menos 8 caracteres',
          );
        }
        return value;
      }, 'custom validation for password'),
  })
  .with('email', 'password');
  // Si se proporciona un email, también debe proporcionarse una contraseña

 */

/* router.post(
  '/signup',
  authorize,
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(2).max(30),
      password: Joi.string().required().min(2).max(30),
    }),
  }),
  (req, res) => {
    userController.createUser(req, res);
  },
); */

router.patch(
  '/me',
  authorize,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  (req, res) => {
    userController.updateUserProfile(req, res);
  },
);

router.patch(
  '/me/avatar',
  authorize,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(validateURL),
    }),
  }),
  (req, res) => {
    userController.updateUserAvatar(req, res);
  },
);

module.exports = router;
