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
