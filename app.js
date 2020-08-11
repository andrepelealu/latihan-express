var express = require('express');


var usersRouter = require('./routes/users');
bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', usersRouter);

app.listen(env.proccess.PORT || 4000)

module.exports = app;
