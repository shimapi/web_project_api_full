const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const generateToken = (data) => {
  const token = jwt.sign(
    { _id: data._id },
    'developer',
    { expiresIn: '7d' },
    NODE_ENV === 'production' ? JWT_SECRET : 'secret-keyyy',
  );

  return token;
};

module.exports = { generateToken };
