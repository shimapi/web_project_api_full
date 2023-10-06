const validator = require('validator');

const validateURL = (value, err) => {
  if (validator.isURL(value)) {
    return value;
  }
  return err.error('string.uri');
};

module.exports = {
  validateURL,
};
