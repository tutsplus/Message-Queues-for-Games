/**
 * This class draws into the screen a representation of the messages
 * being exchanged by the entities
 */
Debug = function (game, messageQueue) {
    // Properties
    this.messageQueue = messageQueue;
    this.displayCounter = 0;

    // Call parent's class constructor
    Phaser.Group.call(this, game);

    // Create a bunch of envelopes that will be used
    // to graphically represent the messages being
    // exchanged by the entities.
    for(var i = 0; i < 40; i++) {
        this.add(new DebugEnvelope(game));
    }
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Debug.prototype = Object.create(Phaser.Group.prototype);
Debug.prototype.constructor = Debug;

// Public methods

Debug.prototype.update = function() {
    var messages = this.messageQueue.getMessages(),
        total = messages.length,
        message,
        i,
        to,
        from,
        envelope;

    Phaser.Group.prototype.update.call(this);

    // Count the time to add new envelopes
    this.displayCounter -= this.game.time.elapsedMS;

    if(this.displayCounter <= 0) {
        // It's  time to add new envelopes to the screen.

        for(i = 0; i < total; i++) {
            message = messages[i];

            if(message) {
                to = message.to;
                from = message.from;

                // Get a debug envolope to represent the current message
                envelope = this.getFirstExists(false);

                if(envelope) {
                    envelope.activate(from, to, this.getColorByMessageType(message.type));
                }
            }
        }

        // Schedule next addition of envelopes
        this.displayCounter = 200;
    }
};

Debug.prototype.getColorByMessageType = function(type) {
    switch(type) {
        case "heal":   return 0; break;
        case "damage": return 1; break;
        default:       return 0; break;
    }
};

// Inner class to represent the flying envelopes
DebugEnvelope = function (game) {
    // Properties
    this.origin = null;
    this.destination = null;
    this.velocity = new Phaser.Point();

    // Call parent's class constructor
    Phaser.Sprite.call(this, game, 0, 0, 'envelope');
    this.kill();
    this.scale.setTo(0.8);
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
DebugEnvelope.prototype = Object.create(Phaser.Sprite.prototype);
DebugEnvelope.prototype.constructor = DebugEnvelope;

DebugEnvelope.prototype.activate = function(origin, destination, type) {
    this.origin = origin;
    this.destination = destination;
    this.frame = type;

    this.anchor.setTo(0.5);

    this.reset(this.origin.x, this.origin.y);
};

DebugEnvelope.prototype.update = function() {
    var velocity;

    Phaser.Sprite.prototype.update.call(this, 0, 0, 'envelope');

    // If we exist, then we are moving from one point
    // to another. Otherwise, we do nothing.
    if(this.exists) {
        // Let's move
        velocity = Phaser.Point.subtract(this.destination, this.position);
        velocity.normalize().multiply(3, 3);

        // Move by using the calculated velocity
        this.position.add(velocity.x, velocity.y);

        if(this.position.distance(this.destination.position) <= 20 || !this.inWorld) {
            // We arrived at the destination :D
            this.kill();
        }
    }
};
