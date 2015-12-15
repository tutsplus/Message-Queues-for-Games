/**
 * Describes the play state.
 */

var PlayState = function() {
	var entities;			// list of entities in the game
	var messageQueue;		// the message queue (dispatcher)
	var background;			// the background image used in the game
	var debug;				// an auxiliar class that renders debug information (e.g. flying envelopes)

	this.create = function() {
		var i;

		// Start Phaser's basics physics system.
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// Initialize the message queue
		messageQueue = new MessageQueue();

		// Add a nice background
		background = this.game.add.sprite(0, 0, 'background');

		// Add a visual representation of all messages
		// that will be exchanged by the entities.
		debug = new Debug(this.game, messageQueue);
		this.game.add.existing(debug);

		// Create a group of entities.
		entities = this.game.add.group();

		// Add runners
		for(i = 0; i < 4; i++) {
			entities.add(new Runner(this.game, this.game.world.width * Math.random(), this.game.world.height * Math.random()));
		}

		// Add hunter
		entities.add(new Hunter(this.game, this.game.world.width * Math.random() * 0.9, this.game.world.height * Math.random() * 0.8));

		// Add healer
		entities.add(new Healer(this.game, this.game.world.width * Math.random() * 0.9, this.game.world.height * Math.random() * 0.8));
	};

	this.update = function() {
		// Make all messages in the message queue reach their destination.
		messageQueue.dispatch();
	};

	this.getMessageQueue = function() {
		return messageQueue;
	};

	this.getEntities = function() {
		return entities;
	};
};
