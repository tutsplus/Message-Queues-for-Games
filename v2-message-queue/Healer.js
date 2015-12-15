/**
 * This class describes an entity that is
 * able to heal any runner that passes nearby.
 */
Healer = function (game, x, y) {
    // Call parent's class constructor
    Entity.call(this, game, x, y, 'healer');

    this.anchor.setTo(0.5);

    this.animations.add('moving', [0, 1, 2], 10, true);
    this.animations.play('moving');
    this.tooltipText.text = 'HEALER: wanders around healing the Runners.';
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Healer.prototype = Object.create(Entity.prototype);
Healer.prototype.constructor = Healer;

// Public methods

Healer.prototype.update = function() {
    var entities,
        i,
        size,
        entity,
        msg;

    // Call the base class's original update() method
    // so the healer continues to move like a runner.
    Entity.prototype.update.call(this);

    // The the list of entities in the game
    entities = this.getPlayState().getEntities();

    for(i = 0, size = entities.length; i < size; i++) {
        entity = entities.getChildAt(i);

        // Is it a valid entity?
        if(entity) {
            // Check if the entity is within the healing radius
            if(this.isEntityWithinReach(entity)) {
                // The entity can be healed!
                // First of all, create a new message regaring the healing
                msg = new Message(entity, this, "heal", 2);

                // Send the message away!
                this.getMessageQueue().add(msg); // or just entity.onMessage(msg); if you want to bypass the message queue for some reasong.
            }
        }
    }
};

// Check if the entity is not a healer nor a hunter and is withing the healing radius.
Healer.prototype.isEntityWithinReach = function(entity) {
    return !(entity instanceof Healer) && !(entity instanceof Hunter) && entity.position.distance(this.position) <= 200;
};

// This method is invoked by the message queue
// to make the healer deal with incoming messages.
Healer.prototype.onMessage = function(message) {
    // Deal with the new message
};
