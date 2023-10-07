const User = require("../models/user");
const ERR_IncorrectData = {
  code: 400,
  name: "IncoorectDataError",
  message: "Переданы некорректные данные",
};
const ERR_NotFound = {
  code: 404,
  name: "NotFoundError",
  message: "Указанное _id не найдено",
};
const ERR_Unknown = {
  code: 500,
  name: "UnknownError",
  message: "Неизвестная ошибка",
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.name == "ValidationError") {
        res.status(ERR_IncorrectData.code).send({
          message: `${ERR_IncorrectData.message} при получении списка пользователей`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка получения списка пользователей '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name == "ValidationError") {
        res.status(ERR_IncorrectData.code).send({
          message: `${ERR_IncorrectData.message} при создании пользователя`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка создания пользователя '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw ERR_NotFound;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name == "NotFoundError") {
        res.status(ERR_NotFound.code).send({
          message: `${ERR_NotFound.message} при получении пользователя`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка создания пользователя '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .then((user) => {
      if (!user) {
        throw ERR_NotFound;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name == "NotFoundError") {
        res.status(ERR_NotFound.code).send({
          message: `${ERR_NotFound.message} при обновлении пользователя`,
        });
        return;
      }
      if (err.name == "ValidationError") {
        res.status(ERR_IncorrectData.code).send({
          message: `${ERR_IncorrectData.message} при обновлении пользователя`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка обновления пользователя '${err.name}' - '${err.message}'`,
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .then((user) => {
      if (!user) {
        throw ERR_NotFound;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name == "NotFoundError") {
        res.status(ERR_NotFound.code).send({
          message: `${ERR_NotFound.message} при обновлении аватара`,
        });
        return;
      }
      if (err.name == "ValidationError") {
        res.status(ERR_IncorrectData.code).send({
          message: `${ERR_IncorrectData.message} при обновлении аватара`,
        });
        return;
      }
      res.status(ERR_Unknown.code).send({
        message: `Ошибка обновления аватара '${err.name}' - '${err.message}'`,
      });
    });
};
