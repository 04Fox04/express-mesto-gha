const Card = require('../models/card');

const ERROR_BAD_REQ = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const CREATED = 201;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(ERROR_SERVER).send(error);
    })
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send(error);
      } else {
        res.status(ERROR_SERVER).send(error);
      }
    })
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(error);
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send(error);
      } else {
        res.status(ERROR_SERVER).send(error);
      }
    })
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(error);
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send(error);
      } else {
        res.status(ERROR_SERVER).send(error);
      }
    })
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(error);
        return;
      }
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send(error);
      } else {
        res.status(ERROR_SERVER).send(error);
      }
    })
}

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }