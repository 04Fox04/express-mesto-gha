const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const ERROR_NOT_FOUND = 404;

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });

app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64a2f504921a921609564bab',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res, next) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
  next();
});

app.listen(3000, () => {
  console.log('Сервер запущен!');
});
