const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

//============================

//============================
const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', { family: 4 });


app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '64a2f504921a921609564bab' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.listen(3000, () => {
    console.log("Сервер запущен!");
})
