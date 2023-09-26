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

/* router.post('/', (req, res) => {
  userController.createUser(req, res);
});

router.post('/login', (req, res) => {
  userController.login(req, res);
}); */

/* const express = require('express');

const router = express.Router();
const userController = require('../controllers/users');

router.post('/', (req, res) => {
  res.send('Creando usuario', res);
  return userController.createUser;
});
router.get('/users', (req, res) => {
  res.send('Obteniendo usuarios');
  userController.getUsers(req, res);
});

router.get('/users/:userId', (req, res) => {
  res.status(200).send('Obteniendo usuarios');
  userController.getUserbyId(req, res);
});

router.patch('/me', (req, res) => {
  res.send('Actualizando usuario');
  userController.updateUserProfile(req, res);
});

router.patch('/me/avatar', (req, res) => {
  res.send('Actualizando avatar del usuario');
  userController.updateUserAvatar(req, res);
});

module.exports = router; */

/* router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUserbyId); */

/* router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

router.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

router.post('/users', async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await User.create({ name, about, avatar });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
}); */
