const BadRequest = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

const NotAuthorized = (message) => {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
};

const Forbidden = (message) => {
  const error = new Error(message);
  error.statusCode = 403;
  return error;
};

const NotFoundError = (message) => {
  const error = new Error(message);
  error.statusCode = 404;
  return error;
};

const Conflict = (message) => {
  const error = new Error(message);
  error.statusCode = 409;
  return error;
};

const ServerError = (message) => {
  const error = new Error(message);
  error.statusCode = 500;
  return error;
};

module.exports = {
  ServerError,
  NotFoundError,
  NotAuthorized,
  BadRequest,
  Conflict,
  Forbidden,
};
