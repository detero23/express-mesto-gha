const User = require('../models/user');

const errorData = {
  code: 400,
  name: 'IncoorectDataError',
  message: 'Переданы некорректные данные',
};
const errorNotFound = {
  code: 404,
  name: 'NotFoundError',
  message: 'Указанное id не найдено',
};
const errorUnknown = {
  code: 500,
  name: 'UnknownError',
  message: 'Неизвестная ошибка',
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorData.code).send({
          message: `${errorData.message} при получении списка пользователей`,
        });
        return;
      }
      res.status(errorUnknown.code).send({
        message: `Ошибка получения списка пользователей '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorData.code).send({
          message: `${errorData.message} при создании пользователя`,
        });
        return;
      }
      res.status(errorUnknown.code).send({
        message: `Ошибка создания пользователя '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw errorNotFound;
      }
      res.send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError' || err.name === 'CastError') {
        res.status(errorNotFound.code).send({
          message: `${errorNotFound.message} при получении пользователя`,
        });
        return;
      }
      res.status(errorUnknown.code).send({
        message: `Ошибка получения пользователя по id '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw errorNotFound;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError' || err.name === 'CastError') {
        res.status(errorNotFound.code).send({
          message: `${errorNotFound.message} при обновлении пользователя`,
        });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(errorData.code).send({
          message: `${errorData.message} при обновлении пользователя`,
        });
        return;
      }
      res.status(errorUnknown.code).send({
        message: `Ошибка обновления пользователя '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw errorNotFound;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError' || err.name === 'CastError') {
        res.status(errorNotFound.code).send({
          message: `${errorNotFound.message} при обновлении аватара`,
        });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(errorData.code).send({
          message: `${errorData.message} при обновлении аватара`,
        });
        return;
      }
      res.status(errorUnknown.code).send({
        message: `Ошибка обновления аватара '${err.name}' - '${err.message}'`,
      });
    });
};
