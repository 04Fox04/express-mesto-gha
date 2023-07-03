const User = require('../models/user');

const ERROR_BAD_REQ = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const CREATED = 201;

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send(error);
      } else {
        res.status(ERROR_SERVER).send(error);
      }
    })
}

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch((error) => {
      res.status(ERROR_SERVER).send(error);
    })
}

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send(error);
        return;
      }
      res.send(user)
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(ERROR_BAD_REQ).send(error);
      } else {
        res.status(ERROR_SERVER).send(error);
      }
    })
}

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send(error);
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send(error);
      } else {
        res.status(ERROR_SERVER).send(error);
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send(error);
        return;
      }
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(ERROR_BAD_REQ).send(error);
      } else {
        res.status(ERROR_SERVER).send(error);
      }
    });
};

module.exports = { createUser, getUsers, getUser, updateUser, updateAvatar }