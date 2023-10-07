const Card = require('../models/card');

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

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorData.code).send({
          message: `${errorData.message} при получении списка карточек`,
        });
        return;
      }
      res.status(errorUnknown.code).send({
        message: `Ошибка получения списка карточек '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = { _id: req.user._id };

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorData.code).send({
          message: `${errorData.message} при создании карточки`,
        });
        return;
      }
      res.status(errorUnknown.code).send({
        message: `Ошибка создания карточки '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.id })
    .then((card) => {
      if (!card) {
        throw errorNotFound;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'NotFoundError' || err.name === 'CastError') {
        res.status(errorNotFound.code).send({
          message: `${errorNotFound.message} при удалении карточки`,
        });
        return;
      }
      res.status(errorUnknown.code).send({
        message: `Ошибка удаления карточки '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.putCardLike = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw errorNotFound;
    }
    res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'NotFoundError' || err.name === 'CastError') {
      res.status(errorNotFound.code).send({
        message: `${errorNotFound.message} при лайке карточки`,
      });
      return;
    }
    if (err.name === 'ValidationError') {
      res.status(errorData.code).send({
        message: `${errorData.message} при лайке карточки`,
      });
      return;
    }
    res.status(errorUnknown.code).send({
      message: `Ошибка лайка карточки '${err.name}' - '${err.message}'`,
    });
  });

module.exports.deleteCardLike = (req, res) => Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw errorNotFound;
    }
    res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'NotFoundError' || err.name === 'CastError') {
      res.status(errorNotFound.code).send({
        message: `${errorNotFound.message} при удалении лайка карточки`,
      });
      return;
    }
    if (err.name === 'ValidationError') {
      res.status(errorData.code).send({
        message: `${errorData.message} при удалении лайка карточки`,
      });
      return;
    }
    res.status(errorUnknown.code).send({
      message: `Ошибка удаления лайка карточки '${err.name}' - '${err.message}'`,
    });
  });
