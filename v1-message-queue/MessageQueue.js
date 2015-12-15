/**
 * This class is responsible for receiving messages and
 * dispatching them to the destination.
 */
MessageQueue = function () {
    this.messages = [];  // list of messages to be dispatched
};


// Public methods

// Add a new message to the queue. The message must be an
// instance of the class Message.
MessageQueue.prototype.add = function(message) {
    this.messages.push(message);
};

// Dispatch all messages in the queue to their destination.
MessageQueue.prototype.dispatch = function() {
    var i,
        entity,
        msg;

    // Iterave over the list of messages
    for(i = 0; this.messages.length; i++) {
        // Get the message of the current iteration
        msg = this.messages[i];

        // Is it valid?
        if(msg) {
            // Fetch the entity that should receive this message (the one in the field 'to')
            entity = msg.to;

            // If that entity exists, deliver the message.
            if(entity) {
                entity.onMessage(msg);
            }

            // Delete the message from the queue
            this.messages.splice(i, 1);
            i--;
        }
    }
};

MessageQueue.prototype.getMessages = function() {
    return this.messages;
};
