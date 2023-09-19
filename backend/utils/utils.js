const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  const token = jwt.sign({ _id: data._id }, 'ParalelePiPed0', { expiresIn: '7d' });

  return token;
};

module.exports = { generateToken };
