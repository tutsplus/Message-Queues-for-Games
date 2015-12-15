/**
 * This class describes a generic entity. All entities
 *are able to move. They also have a <code>onMessage()</code>
 * method to handle message exchange.
 */
Entity = function (game, x, y, asset) {
    // Properties
    this.counter;
    this.destination;
    this.tooltipText;

    // Call parent's class (Phaser.Sprite) constructor
    Phaser.Sprite.call(this, game, x, y, asset);

    // Init everything
    this.health = Entity.MAX_LIFE;
    this.counter = 0;
    this.destination = new Phaser.Point();

    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.collideWorldBounds = true;
    this.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
    this.anchor.setTo(0.5);

    this.initTooltips();
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

// Constants
Entity.MAX_LIFE = 100;

// Public methods

Entity.prototype.update = function(message) {
    Phaser.Sprite.prototype.update.call(this);

    // Update the counter used to change movement
    // direction from time to time.
    this.counter -= this.game.time.elapsedMS;

    if(this.counter <= 0) {
        // It's time to find a new location to move to.
        this.destination.set(this.game.rnd.integerInRange(0, this.game.world.width), this.game.rnd.integerInRange(0, this.game.world.height));

        // Change velocity direction to point to new location
        this.body.velocity = Phaser.Point.subtract(this.destination, this.position);
        this.body.velocity.normalize();
        this.body.velocity.multiply(50, 50);

        // Schedule the next location change.
        this.counter = Math.random() * 3000;
    }

    // Make the sprite face the direction it is moving to
    this.scale.x = Math.abs(this.body.velocity.angle(new Phaser.Point(1, 0), true)) < 120 ? -1 : 1;
};

Entity.prototype.onMessage = function(message) {
    // Handle new message here
};

Entity.prototype.getPlayState = function() {
    return this.game.state.states[this.game.state.current];
};

// Get a reference to the message queue.
Entity.prototype.getMessageQueue = function() {
    return this.getPlayState().getMessageQueue();
};

Entity.prototype.initTooltips = function() {
    this.tooltipText = this.game.add.text(10, this.game.world.height - 40, 'This is a test', {fill: '#ffffff', font: 'bold 20px Arial'});
    this.tooltipText.visible = false;
    this.tooltipText.lineSpacing = -5;

    this.inputEnabled = true;
    this.events.onInputOver.add(this.onMouseOver, this);
    this.events.onInputOut.add(this.onMouseOut, this);
};

Entity.prototype.onMouseOver = function() {
    this.tooltipText.visible = true;
};

Entity.prototype.onMouseOut = function() {
    this.tooltipText.visible = false;
};
