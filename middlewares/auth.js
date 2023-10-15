const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Auth required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'My_Custom_Secret');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Auth required' });
  }

  req.user = payload;
  next();
};
