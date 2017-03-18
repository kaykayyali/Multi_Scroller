var Boot_State = {
	preload: function() {
		console.log("Initialized Boot State.");
	},
	create: function() {
		Game_Client.game.physics.startSystem(Phaser.Physics.ARCADE);
		Game_Client.game.state.start('load');
	}
};