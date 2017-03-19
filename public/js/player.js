var Player = function(state){
	// Transfers Game state so we can use the keys already assigned there.
	this.state = state;
	this.sprite = Game_Client.game.add.sprite(200, 3000, 'dude');
	this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	this.sprite.animations.add('idle', [4], 20, true);
	this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	this.sprite.animations.play('right');
	this.run_speed = 5;
	this.jump_power = -500;
	this.facing = 'left';
	this.jump_timer = 0;
	this.jump_sound = Game_Client.game.add.audio('jump');
	Game_Client.game.camera.follow(this.sprite);
	this.pad = Game_Client.game.plugins.add(Phaser.VirtualJoystick);
	this.stick = this.pad.addDPad(0, 0, 200, 'dpad');
	this.stick.alignBottomLeft(0);
	this.buttonA = this.pad.addButton(725, 405, 'dpad', 'button1-up', 'button1-down');
	console.log(this.state);
	this.buttonA.onDown.add(this.jump, this);
};

Player.prototype.set_physics = function() {
	Game_Client.game.physics.arcade.enable(this.sprite);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.bounce.y = 0.1;
	this.sprite.body.friction = 10;
};

Player.prototype.update = function() {
	Game_Client.game.physics.arcade.collide(this.sprite, this.state.platforms, this.set_friction, null, this);
	this.sprite.body.velocity.x = 0;
	if (this.state.cursors.left.isDown || (this.stick.isDown && this.stick.direction === Phaser.LEFT)) {
		this.sprite.body.velocity.x = -150;
		if (this.facing != 'left') {
			this.sprite.animations.play('left');
			this.facing = 'left';
		}
	}
	else if (this.state.cursors.right.isDown || (this.stick.isDown && this.stick.direction === Phaser.RIGHT)) {
		this.sprite.body.velocity.x = 150;
		if (this.facing != 'right') {
			this.sprite.animations.play('right');
			this.facing = 'right';
		}
	}
	else {
		if (this.facing != 'turn') {
			this.sprite.animations.play('idle');
			this.facing = 'turn';
		}
	}
	if (this.state.jump_key.isDown) {
		this.jump()
	}
	this.update_client_data();
};

Player.prototype.set_friction = function (player, platform) {
	if (platform.key === 'platform_ice') {
		this.sprite.body.x += Game_Client.game.rnd.integerInRange(-3, 3);
	}
	else {
		console.log("Adding this much to x", platform.body.x ,platform.body)
		this.sprite.body.x += platform.body.x - platform.body.prev.x;
	}
};

Player.prototype.update_client_data = function() {
	Client.user.position = this.sprite.position;
	Client.user.facing = this.facing;
};

Player.prototype.jump = function() {
	Game_Client.game.physics.arcade.collide(this.sprite, this.state.platforms, this.state.setFriction, null, this);
	this.standing = this.sprite.body.blocked.down || this.sprite.body.touching.down;
	if (this.standing) {
		this.jump_sound.play();
		this.sprite.body.velocity.y = this.jump_power;
		this.jump_timer = Game_Client.game.time.now + 750;
	}
};