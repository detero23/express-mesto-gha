const Card = require("../models/card");
const ERR_IncorrectData = {
  code: 400,
  name: "IncoorectDataError",
  message: "Переданы некорректные данные",
};
const ERR_NotFound = {
  code: 404,
  name: "NotFoundError",
  message: "Указанное id не найдено",
};
const ERR_Unknown = {
  code: 500,
  name: "UnknownError",
  message: "Неизвестная ошибка",
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name == "ValidationError") {
        res.status(ERR_IncorrectData.code).send({
          message: `${ERR_IncorrectData.message} при получении списка карточек`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
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
      if (err.name == "ValidationError") {
        res.status(ERR_IncorrectData.code).send({
          message: `${ERR_IncorrectData.message} при создании карточки`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка создания карточки '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.id })
    .then((card) => {
      if (!card) {
        throw ERR_NotFound;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name == "NotFoundError") {
        res.status(ERR_NotFound.code).send({
          message: `${ERR_NotFound.message} при удалении карточки`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка удаления карточки '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.putCardLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw ERR_NotFound;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name == "NotFoundError") {
        res.status(ERR_NotFound.code).send({
          message: `${ERR_NotFound.message} при лайке карточки`,
        });
        return;
      }
      if (err.name == "ValidationError") {
        res.status(ERR_IncorrectData.code).send({
          message: `${ERR_IncorrectData.message} при лайке карточки`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка лайка карточки '${err.name}' - '${err.message}'`,
      });
    });

module.exports.deleteCardLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw ERR_NotFound;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name == "NotFoundError") {
        res.status(ERR_NotFound.code).send({
          message: `${ERR_NotFound.message} при удалении лайка карточки`,
        });
        return;
      }
      if (err.name == "ValidationError") {
        res.status(ERR_IncorrectData.code).send({
          message: `${ERR_IncorrectData.message} при удалении лайка карточки`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка удаления лайка карточки '${err.name}' - '${err.message}'`,
      });
    });
