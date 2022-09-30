var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const https = require('https');
const fs = require('fs');
const server = https.createServer(app);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms')(io);

var apiRouter = require('./routes/api');

const session = require('express-session');
const MemoryStore = require('memorystore')(session);

global.roomList = [];
const HTTPS_PORT = 8443;

const options = {
  key: fs.readFileSync('./cer/rootca.key'),
  cert: fs.readFileSync('./cer/rootca.crt')
};

var app = express();
app.set('socketio', io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionObj = {
  secret: 'hiipzz1r',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: (3.6e+6)*24 }),
  cookie: {
    maxAge: (3.6e+6)*24
  },
};

app.use(session(sessionObj));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/', apiRouter);

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


server.listen(HTTPS_PORT, function() {
  console.log("Socket IO server listening on port "+HTTPS_PORT);
})

module.exports = app;


// const express = require('express');
// const http = require('http');
// const https = require('https');
// const fs = require('fs');

// const HTTP_PORT = 8080;
// const HTTPS_PORT = 8443;

// const options = {
//   key: fs.readFileSync('./cer/rootca.key'),
//   cert: fs.readFileSync('./cer/rootca.crt')
// };

// const app = express();

// // Default route for server status
// app.get('/', (req, res) => {
//   res.json({ message: `Server is running on port ${req.secure ? HTTPS_PORT : HTTP_PORT}` });
// });

// // Create an HTTP server.
// http.createServer(app).listen(HTTP_PORT);

// // Create an HTTPS server.
// https.createServer(options, app).listen(HTTPS_PORT);

// module.exports = app;