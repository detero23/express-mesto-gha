const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      console.log(`Get cards error '${err.name}' - '${err.message}'`)
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = { _id: req.user._id };

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      console.log(`Create card error '${err.name}' - '${err.message}'`);
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove({ _id: req.params.id })
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      console.log(`Delete card by ID error '${err.name}' - '${err.message}'`)
    );
};

module.exports.putCardLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      console.log(`Put card like error '${err.name}' - '${err.message}'`)
    );

module.exports.deleteCardLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      console.log(`Delete card like error '${err.name}' - '${err.message}'`)
    );
