/**
 * This class describes a message
 */
Message = function (to, from, type, data) {
    // Properties
    this.to = to;        // a reference to the entity that will receive this message
    this.from = from;    // a reference to the entity that sent this message
    this.type = type;    // the type of this message
    this.data = data;    // the content/data of this message
};
