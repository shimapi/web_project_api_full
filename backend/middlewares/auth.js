const jwt = require('jsonwebtoken');
const {
  NotAuthorized,
} = require('./errors');

const authorize = async (req, res, next) => {
  const headerAuth = req.header('Authorization');

  if (!headerAuth) {
    return res.send(NotAuthorized('Acceso no autorizado'));
  }
  console.log('testing');
  const token = headerAuth.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, 'developer');
    console.log('payload', payload);
    if (!payload) {
      return NotAuthorized('El token no es válido');
    }

    req.user = payload;
    next();
    return req.user;
  } catch (err) {
    console.log('err', err);
    return NotAuthorized('El token no es válido');
  }
};

module.exports = authorize;
