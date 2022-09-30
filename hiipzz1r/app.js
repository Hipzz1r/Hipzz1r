var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomRouter = require('./routes/rooms');

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

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

const server = http.createServer(app);

var io = require('socket.io')(server);

//네임스페이스 설정
const room = io.of('/room');

room.on('connection', function (socket) {
  console.log('Connect from Client: ' + socket)

  var req = socket.request;

  const {
    headers: {referer},
  } = req;
  const roomId = referer.split('/')[referer.split('/').length-1].replace(/\?.+/,'');
  socket.join(roomId);

  socket.to(roomId).emit('join', {
    user: socket.userId,
    category : socket.avatarcategory,
    nickname : socket.usernickname
  });

  socket.on('onFacialExpression', function (data) {

  });
  socket.on('onUserExit', function (data) {
    console.log('user exit' + data.userId)
    var rtnMessage = {
      message : data.userId
      ,socketId : data.socketId
    };
    socket.to(roomId).emit('onUserExit', rtnMessage);
    socket.leave(roomId);
  });
})


server.listen(3000, function() {
  console.log("Socket IO server listening on port 3000")
})

module.exports = app;
