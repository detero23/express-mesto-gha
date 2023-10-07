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
