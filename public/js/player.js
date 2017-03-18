var Player = function(){
	this.sprite = Game_Client.game.add.sprite(100, 400, 'dude');
	this.sprite.animations.add('left', [0, 1, 2, 3], 10, true);
	this.sprite.animations.add('turn', [4], 20, true);
	this.sprite.animations.add('right', [5, 6, 7, 8], 10, true);
	this.sprite.animations.play('right');
	this.run_speed = 5;
	this.jump_power = 100;
	this.facing = 'left';
	this.jump_timer = 0;
};

Player.prototype.set_physics = function() {
	Game_Client.game.physics.enable([this.sprite], Phaser.Physics.ARCADE);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.bounce.y = 0.1;
	this.sprite.body.friction = 10;
	this.sprite.body.onCollide = new Phaser.Signal()
	this.sprite.body.onCollide.add(this.handle_collide, this);
};

Player.prototype.handle_collide = function(object) {
	console.log("Called");
	this.last_jump = false;
};