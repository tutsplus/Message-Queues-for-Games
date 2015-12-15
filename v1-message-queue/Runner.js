/**
 * This class describes an entity that just
 * wanders around.
 */
Runner = function (game, x, y, asset) {
    // Properties
    this.healthbar = game.add.graphics(0, 0);

    // Call parent's class constructor
    Entity.call(this, game, x, y, asset || 'runner');

    // Init everything
    this.init();
    this.tooltipText.text = 'RUNNER: just wanders around.';
};

// Lovely pants-in-the-head javascript boilerplate for OOP.
Runner.prototype = Object.create(Entity.prototype);
Runner.prototype.constructor = Runner;

// Public methods

Runner.prototype.init = function() {
    this.animations.add('moving', [0, 1, 2], 10, true);
    this.animations.play('moving');
};

Runner.prototype.update = function() {
    Entity.prototype.update.call(this);

    // Update position of the health bar
    this.healthbar.position.x = this.x - 25;
    this.healthbar.position.y = this.y + 40;

    // Update the health bar fill
    this.healthbar.clear();
    this.healthbar.beginFill(0x00ff00);
    this.healthbar.drawRect(0, 0, (this.health / Entity.MAX_LIFE) * 50, 5);
    this.healthbar.endFill();
    this.healthbar.lineStyle(2, 0x004400, 1);
    this.healthbar.drawRect(0, 0, 50, 5);
};

// This method is invoked by the message queue
// to make the runner deal with incoming messages.
Runner.prototype.onMessage = function(message) {
    var amount;

    // Check the message type so it's possible to
    // decide if this message should be ignored or not.
    if(message.type == "damage") {
        // The message is about damage.
        // We must decrease our health points. The amount of
        // this decrease was informed by the message sender
        // in the 'data' field.
        amount = message.data;
        this.addHealth(-amount);

    } else if (message.type == "heal") {
        // The message is about healing.
        // We must increase our health points. Again the amount of
        // health points to increase was informed by the message sender
        // in the 'data' field.
        amount = message.data;
        this.addHealth(amount);

    } else {
        // Here  deal with messages we are not able to process.
        // Probably just ignore them :)
    }
};

// Changes the health points of the runner.
Runner.prototype.addHealth = function(value) {
    this.health += value;
    this.health = this.health < 0 ? 0 : this.health;
    this.health = this.health > Entity.MAX_LIFE ? Entity.MAX_LIFE : this.health;
};
