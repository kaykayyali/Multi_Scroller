var express = require('express');
var app = express();
var http = require('http').Server(app);
var User = require('./lib/server_user');


app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// io.on('connection', function(socket){
//   	var new_user = new User(socket.id);
//   	socket.emit('user_created', new_user);
//   	socket.on('disconnect', function(data){
//    		console.log('user disconnected', data);
//   	});
// });

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});


