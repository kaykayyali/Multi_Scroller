var Other_Player = function(state, user) {
	this.state = state;
	this.user = user
	this.sprite = Game_Client.game.add.sprite(100, 400, 'dude');
	this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	this.sprite.animations.add('turn', [4], 20, true);
	this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
};


Other_Player.prototype.update = function() {
	this.sprite.position = Client.known_users[this.user.id].position;
};