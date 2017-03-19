var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var User = require('./lib/server_user');


app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  	var new_user = new User(socket.id);
  	socket.emit('registered', new_user);
	socket.on('user:registered', function(data){
		io.emit('user:registered', data);
	});
	socket.on('user:update', function(data){
		io.emit('user:update', data);
	});
	socket.on('disconnect', function(){
		io.emit('user:disconnect', socket.id);
	});
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});


