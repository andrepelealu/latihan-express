var express = require('express');


var usersRouter = require('./routes/users');
bodyParser = require('body-parser');
const errorHandler = require('./error/apiErrorHandler')

var app = express();
app.use(bodyParser.json());
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', usersRouter);
app.listen(process.env.PORT || 5000)

module.exports = app;
