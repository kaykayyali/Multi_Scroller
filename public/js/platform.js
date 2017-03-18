var Platform = function(state, x, y){
	// Transfers Game state so we can use the keys already assigned there.
	this.state = state;
	this.sprite = Game_Client.game.add.sprite(x, y, 'platform');
};

Platform.prototype.set_physics = function() {
	Game_Client.game.physics.enable([this.sprite], Phaser.Physics.ARCADE);
	this.sprite.body.immovable = true;
	this.sprite.body.gravity = 0;
};

Platform.prototype.update = function() {
	Game_Client.game.physics.arcade.collide(this.state.player, this.sprite);
};