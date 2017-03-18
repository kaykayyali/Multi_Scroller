var Game = function() {
	this.game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-target');
	this.apply_states();
	this.start_game();
	return this.game;
};

Game.prototype.apply_states = function() {
	this.game.state.add('boot', Boot_State);
	this.game.state.add('load', Load_State);
	this.game.state.add('menu', Menu_State);
};

Game.prototype.start_game= function() {
	this.game.state.start('boot');
};