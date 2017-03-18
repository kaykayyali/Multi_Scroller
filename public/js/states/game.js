var Game_State = {
	preload: function() {
		console.log("Initialized Game State.");
		var intro = Game_Client.game.add.audio('intro');
		Game_Client.game.time.desiredFps = 60;
		intro.loop = true;
		intro.play();
	},
	create: function () {
		this.set_environment();
		this.create_background();
		this.create_main_player();
		this.set_physics();
		this.assign_keys();
	},
	update: function() {
		this.player.sprite.body.velocity.x = 0;
		if (this.cursors.left.isDown) {
			this.player.sprite.body.velocity.x = -150;
			if (this.player.facing != 'left') {
				this.player.sprite.animations.play('left');
				this.player.facing = 'left';
			}
		}
		else if (this.cursors.right.isDown) {
			this.player.sprite.body.velocity.x = 150;
			if (this.player.facing != 'right') {
				this.player.sprite.animations.play('right');
				this.player.facing = 'right';
			}
		}
		else {
			if (this.player.facing != 'idle') {
				this.player.sprite.animations.stop();
				if (this.player.facing == 'left') {
					this.player.sprite.frame = 0;
				} 
				else {
					this.player.sprite.frame = 5;
				}
				this.player.facing = 'idle';
			}
		}
		if (this.jump_key.isDown && this.player.sprite.body.onFloor() && Game_Client.game.time.now > this.player.jump_timer) {
			this.player.sprite.body.velocity.y = -500;
			this.player.jumpTimer = Game_Client.game.time.now + 750;
		}
		console.log('Frame')
	},
	assign_keys: function() {
		this.cursors = Game_Client.game.input.keyboard.createCursorKeys();
		this.jump_key = Game_Client.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	create_background: function() {
		this.background = Game_Client.game.add.tileSprite(0, 0, 640, 480, 'background');
	},
	create_main_player: function() {
		this.player = new Player();
	},
	set_environment: function() {
		Game_Client.game.physics.arcade.gravity.y = 1000;
	},
	set_physics: function() {
		var self = this;
		console.log(this)
		this.player.set_physics();
	}
};