/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require('./middlewares/auth');

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected'))
  .catch((err) => console.log(`Connection error '${err.name}' - '${err.message}'`));

app.post('/signin', require('./controllers/users').login);
app.post('/signup', require('./controllers/users').createUser);
app.use('/cards', auth, require('./routes/cards'));
app.use('/users', auth, require('./routes/users'));

app.use((req, res) => {
  res.status(404).send({
    message: '404 Страница не найдена',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
