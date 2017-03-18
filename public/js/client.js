var Client = {
	init: function() {
		this.connect_to_socket_server();
	},
	connect_to_socket_server:  function() {
		var self = this;
		this.connection = io();
		this.connection.on('connect', _.bind(this.handle_socket_connect, this));
	},
	handle_socket_connect: function(socket) {
		console.log('Connected');
		this.apply_socket_listeners();
	},
	apply_socket_listeners: function() {
		this.connection.on('user_created', _.bind(this.handle_user_created, this));
	},
	handle_user_created: function(user) {
		this.user = user;
		console.log('User is ', user);
		Game_Client.init();
	}
};