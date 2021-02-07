var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wxRouter = require('./routes/wx');
var backstageRouter = require('./routes/backstage');
var upload = require('./routes/upload');
var wxtoken = require('./wxPublicAPI/accessToken')
var cors = require('cors');

var app = express();

// 微信token，每两小时获取一次 
global.access_token = ''

wxtoken.getToken()


app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/wx', wxRouter);
app.use('/backstage', backstageRouter);
app.use('/upload', upload);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
