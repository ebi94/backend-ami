var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var muthowifRouter = require('./routes/muthowif');
var reservationRouter = require('./routes/reservation');
var airlineRouter =  require('./routes/airline');
var travelRouter = require('./routes/travel');
var authRouter = require('./routes/auth');
var app = express();
var cors = require('cors')

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(
  "/script-adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte/"))
);
app.use('/', indexRouter);
app.use('/muthowif', muthowifRouter);
app.use('/reservation', reservationRouter);
app.use('/airline', airlineRouter);
app.use('/travel', travelRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
