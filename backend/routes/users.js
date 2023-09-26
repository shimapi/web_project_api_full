const express = require('express');

const userController = require('../controllers/users');
const authorize = require('../middlewares/auth');

const router = express.Router();

router.get('/', authorize, (req, res) => {
  userController.getUsers(req, res);
});

router.get('/me', authorize, (req, res) => {
  userController.getUserbyId(req, res);
});

router.patch('/me', authorize, (req, res) => {
  userController.updateUserProfile(req, res);
});

router.patch('/me/avatar', authorize, (req, res) => {
  userController.updateUserAvatar(req, res);
});

module.exports = router;
