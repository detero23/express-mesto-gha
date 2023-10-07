const User = require("../models/user");

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      console.log(`Get User by ID error '${err.name}' - '${err.message}'`)
    );
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      console.log(`Get users error '${err.name}' - '${err.message}'`)
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(`Create user error '${err.name}' - '${err.message}'`);
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
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: `Update user error '${err.name}' - '${err.message}'` })
    );
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
    .then((user) => res.send({ data: user }))
    .catch((err) =>
      res.status(500).send({
        message: `Update avatar error '${err.name}' - '${err.message}'`,
      })
    );
};
