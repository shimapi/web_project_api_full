const jwt = require('jsonwebtoken');
const NotAuthorized = require('../errors/NotAuthorized');

const authorize = async (req, res, next) => {
  const headerAuth = req.header('Authorization');

  if (!headerAuth) {
    throw new NotAuthorized('Acceso no autorizado');
  }

  const token = headerAuth.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, 'ParalelePiPed0');

    if (!payload) {
      // return res.status(403).send({ message: 'El token no es válido' });
      throw new NotAuthorized('El token no es válido');
    }

    req.user = payload;
    return next();
  } catch (err) {
    // return res.status(403).send({ message: 'El token no es válido' });
    throw new NotAuthorized('El token no es válido');
  }
};

module.exports = authorize;
