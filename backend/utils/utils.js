const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  const token = jwt.sign({ _id: data._id }, 'developer', { expiresIn: '7d' });

  return token;
};

module.exports = { generateToken };
