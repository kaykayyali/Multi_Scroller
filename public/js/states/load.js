var Load_State = {
	preload: function() {
		console.log("Initialized Load State.");
		this.loading_label = Game_Client.game.add.text(80, 150, 'Loading: Audio', {font: '30px Courier', fill: '#ffffff'});
		Game_Client.game.load.audio('intro', ['assets/audio/intro.wav']);
		this.loading_label.setText('Loading: Images');
		Game_Client.game.load.image('background', 'assets/images/background_2.png');
		Game_Client.game.load.image('bird_one', 'assets/images/bird_one.png');
		Game_Client.game.load.image('bird_two', 'assets/images/bird_two.png');
		Game_Client.game.load.image('bird_three', 'assets/images/bird_three.png');
		Game_Client.game.load.image('cactus', 'assets/images/cactus.png');
		Game_Client.game.load.image('tumble_weed', 'assets/images/tumble_weed.png');
		Game_Client.game.load.image('player', 'assets/images/player_stand.png');
		Game_Client.game.load.image('platform', 'assets/images/platform.png');
		Game_Client.game.load.spritesheet('dude', 'assets/images/dude.png', 32, 48);
		this.loading_label.setText('Loading: Complete');
	},
	create: function () {
		Game_Client.game.state.start('menu');
	}
};