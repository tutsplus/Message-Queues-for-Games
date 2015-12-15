/**
 * This class describes an entity that just
 * wanders around hurting the runners that pass by.
 */
Hunter = function (game, x, y) {
    // Call parent's class constructor
    Entity.call(this, game, x, y, 'hunter');

    this.animations.add('moving', [0, 1, 2], 8, true);
    this.animations.play('moving');
    this.tooltipText.text = 'HUNTER: wanders around attacking the Runners.';
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Hunter.prototype = Object.create(Entity.prototype);
Hunter.prototype.constructor = Hunter;

// Public methods

Hunter.prototype.update = function() {
    var entities,
        i,
        size,
        entity,
        msg;

    // Call the base class's original update() method
    // so the hunter continues to move like a runner.
    Entity.prototype.update.call(this);

    // Get a list of entities
    entities = this.getPlayState().getEntities();

    for(i = 0, size = entities.length; i < size; i++) {
        entity = entities.getChildAt(i);

        // Is this entity a runner and is it close?
        if(this.canEntityBeAttacked(entity)) {
            // Yeah, so it's time to cause some damage!
            msg = new Message(entity, this, "damage", 2);

            // Send the message away!
            this.getMessageQueue().add(msg); // or just entity.onMessage(msg); if you want to bypass the message queue for some reasong.
        }
    }
};

// Check if the entity is valid, is a runner and is within the attack range.
Hunter.prototype.canEntityBeAttacked = function(entity) {
    return entity && entity != this && (entity instanceof Runner) && !(entity instanceof Hunter) && entity.position.distance(this.position) <= 150;
};

// This method is invoked by the message queue
// to make the hunter deal with incoming messages.
Hunter.prototype.onMessage = function(message) {
    // TODO: deal with messages
};
