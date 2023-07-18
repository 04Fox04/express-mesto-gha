const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const jwtToken = req.cookies.token;
  let payload;
  try {
    payload = jwt.verify(jwtToken, 'super-mega-strong-secret');
  } catch (err) {
    next(new AuthError('Вы не авторизированы'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
