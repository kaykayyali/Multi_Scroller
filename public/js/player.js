var Player = function(state){
	// Transfers Game state so we can use the keys already assigned there.
	this.state = state;
	this.sprite = Game_Client.game.add.sprite(100, 400, 'dude');
	this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	this.sprite.animations.add('turn', [4], 20, true);
	this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	this.sprite.animations.play('right');
	this.run_speed = 5;
	this.jump_power = -500;
	this.facing = 'left';
	this.jump_timer = 0;
};

Player.prototype.set_physics = function() {
	Game_Client.game.physics.arcade.enable(this.sprite);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.bounce.y = 0.1;
	this.sprite.body.friction = 10;
};

Player.prototype.update = function() {
	Game_Client.game.physics.arcade.collide(this.sprite, this.state.platforms, this.state.setFriction, null, this);
	this.standing = this.sprite.body.blocked.down || this.sprite.body.touching.down;
	this.sprite.body.velocity.x = 0;
	if (this.state.cursors.left.isDown) {
		this.sprite.body.velocity.x = -150;
		if (this.facing != 'left') {
			this.sprite.animations.play('left');
			this.facing = 'left';
		}
	}
	else if (this.state.cursors.right.isDown) {
		this.sprite.body.velocity.x = 150;
		if (this.facing != 'right') {
			this.sprite.animations.play('right');
			this.facing = 'right';
		}
	}
	else {
		if (this.facing != 'idle') {
			this.sprite.animations.stop();
			if (this.facing == 'left') {
				this.sprite.frame = 0;
			} 
			else {
				this.sprite.frame = 5;
			}
			this.facing = 'idle';
		}
	}
	if (this.state.jump_key.isDown && this.standing) {
		this.sprite.body.velocity.y = this.jump_power;
		this.jump_timer = Game_Client.game.time.now + 750;
	}
};
