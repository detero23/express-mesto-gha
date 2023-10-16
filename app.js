/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
// eslint-disable-next-line no-useless-escape
const pattern = '/^(http|https):\/\/[^ "]+$/';

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected'))
  .catch((err) => console.log(`Connection error '${err.name}' - '${err.message}'`));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(pattern)),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), require('./controllers/users').login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), require('./controllers/users').createUser);
app.use('/cards', auth, require('./routes/cards'));
app.use('/users', auth, require('./routes/users'));

app.use(() => { throw new NotFoundError('Ошибка 404 Страница не найдена'); });
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
