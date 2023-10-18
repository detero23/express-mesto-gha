const jwt = require('jsonwebtoken');
const NoAuthError = require('../errors/NoAuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .next(new NoAuthError('Требуется авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'My_Custom_Secret');
  } catch (err) {
    return res
      .next(new NoAuthError('Требуется авторизация'));
  }

  req.user = payload;
  next();
};
