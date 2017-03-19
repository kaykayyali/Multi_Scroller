var Menu_State = {
	preload: function() {
		console.log("Initialized Menu State.");
		this.background_music = Game_Client.game.add.audio('intro');
		this.background_music.loop = true;
		this.background_music.play();
		// Game_Client.game.input.onDown.add(this.go_full, this);
		Game_Client.game.input.onDown.add(this.transition_to_game, this);
	},
	create: function () {
		this.create_background();
		this.create_ground_emitter();
		this.create_instructions();
		this.assign_keys();
	},
	update: function() {
		this.background.tilePosition.y += 1;
		if (this.main_key.isDown) {
			this.transition_to_game();
		}
	},
	go_full: function() {
		if (Game_Client.game.scale.isFullScreen) {
			Game_Client.game.scale.stopFullScreen();
		}
		else {
			Game_Client.game.scale.startFullScreen(false);
		}
	},
	assign_keys: function() {
		this.main_key = Game_Client.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	create_background: function() {
		this.background = Game_Client.game.add.tileSprite(0, 0, 800, 480, 'background');
	},
	create_ground_emitter: function() {
		this.ground_emitter = Game_Client.game.add.emitter(700, 200, 5);
		//  Here we're passing an array of image keys. It will pick one at random when emitting a new particle.
		this.ground_emitter.makeParticles(['cactus', 'tumble_weed']);
		this.ground_emitter.setXSpeed(-400, -600);
		this.ground_emitter.setYSpeed(5,10);
		this.ground_emitter.setRotation(-50, 50);
		this.ground_emitter.start(false, 2000, 500);
	},
	create_instructions: function() {
		this.main_label = Game_Client.game.add.text(80, 25, 'Super Action Multi Scroller', {font: '30px Courier', fill: '#000000'});
		this.bar = Game_Client.game.add.graphics();
		this.bar.beginFill(0x000000, 0.2);
		this.bar.drawRect(0, 300, 800, 50);
		var style = { font: "20px Courier", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
		//  The Text is positioned at 0, 100
		this.instruction_label = Game_Client.game.add.text(0, 0, 'Space or Touch to play', style);
		this.instruction_label.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
		//  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
		this.instruction_label.setTextBounds(0, 300, 800, 50);
	},
	transition_to_game: function() {
		this.background_music.stop();
		Game_Client.game.state.start('game');
	}
};