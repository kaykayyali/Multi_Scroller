var express = require('express');
var app = express();
var http = require('http').Server(app);
var User = require('./lib/server_user');
var User_Cache = require('./lib/server_user_cache');

var user_cache = new User_Cache();

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  	var new_user = new User(socket.id);
  	socket.emit('user_created', new_user);
  	socket.on('disconnect', function(data){
   		console.log('user disconnected', data);
  	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


