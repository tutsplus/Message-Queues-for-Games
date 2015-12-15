/**
 * Loads the bare minimum required to create a decent loading screen
 */

var BootState = function() {
	this.create = function() {
		this.state.start('load');
	};

	this.preload = function() {
	};
};
