const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
  const headerAuth = req.header('Authorization');

  if (!headerAuth) {
    return res.status(403).send('Se requiere autorización para ingresar');
  }
  const token = headerAuth.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, 'developer');
    if (!payload) {
      return res.status(403).send('El token no es válido');
    }

    req.user = payload;
    next();
    return req.user;
  } catch (error) {
    return res.status(403).send('El token no es válido', error);
  }
};

module.exports = authorize;
