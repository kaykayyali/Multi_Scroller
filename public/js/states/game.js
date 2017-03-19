var Game_State = {
	preload: function() {
		console.log("Initialized Game State.");
		// Login player
		Client.connect_player();
		var intro = Game_Client.game.add.audio('intro');
		Game_Client.game.time.desiredFps = 60;
		intro.loop = true;
		intro.play();
	},
	create: function () {
		this.set_environment();
		this.create_background();
		this.create_main_player();
		this.create_platforms();
		this.set_physics();
		this.assign_keys();
	},
	update: function() {
		this.player.update();
		this.update_platforms();
		this.update_other_players();
	},
	assign_keys: function() {
		this.cursors = Game_Client.game.input.keyboard.createCursorKeys();
		this.jump_key = Game_Client.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	check_delete_players: function() {
		_.each(this.other_players, _.bind(this.check_delete_player, this));
	},
	check_delete_player: function(value, key) {
		if (!Client.known_users[key]) {
			console.log("Deleted a player ", value);
			this.other_players[key].sprite.kill();
			delete this.other_players[key];
		}
	},
	check_new_players: function() {
		_.each(Client.known_users, _.bind(this.check_new_player, this));
	},
	check_new_player: function(value, key) {
		if (!this.other_players[key]) {
			console.log("Found a new player", value);
			this.other_players[key] = new Other_Player(this, value);
		}
	},
	create_background: function() {
		this.background = Game_Client.game.add.tileSprite(0, 0, 640, 480, 'background');
	},
	create_main_player: function() {
		this.player = new Player(this);
	},
	create_platforms: function() {
		this.platforms = this.add.physicsGroup();
		this.platforms.create(400, 412, 'platform');
		this.platforms.create(300, 352, 'platform');
		this.platforms.create(200, 296, 'platform');
		this.platforms.create(100, 180, 'platform');
		this.platforms.create(0, 64, 'platform');
		this.platforms.setAll('body.allowGravity', false);
		this.platforms.setAll('body.immovable', true);
		this.platforms.setAll('body.velocity.x', 100);
	},
	set_environment: function() {
		this.platforms = [];
		this.other_players = {};
		Game_Client.game.physics.arcade.gravity.y = 1000;
	},
	set_physics: function() {
		var self = this;
		this.player.set_physics();
	},
	setFriction: function (player, platform) {
		if (platform.key === 'ice-platform') {
			player.body.x -= platform.body.x - platform.body.prev.x;
		}
	},
	update_platforms: function() {
		this.platforms.forEach(this.wrap_platform, this);
	},
	update_other_players: function() {
		this.check_new_players();
		this.check_delete_players();
		_.each(this.other_players, _.bind(this.update_other_player,this));
	},
	update_other_player: function(value, key) {
		this.other_players[key].update();
	},
	wrap_platform: function (platform) {
		if (platform.body.velocity.x < 0 && platform.x <= -160) {
		    platform.x = 640;
		}
		else if (platform.body.velocity.x > 0 && platform.x >= 640) {
		    platform.x = -160;
		}
	},
};