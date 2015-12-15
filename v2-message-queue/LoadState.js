/**
 * Loads all assets used by the game
 */

var LoadState = function() {
	this.create = function() {
		this.state.start('play');
	};

	this.preload = function() {
		this.load.spritesheet('runner', 'assets/runner.png?5', 64, 56); // Public domain, http://opengameart.org/content/classic-hero-and-baddies-pack
		this.load.spritesheet('healer', 'assets/healer.png?6', 80, 80); // Public doming, http://opengameart.org/content/mr-necromancer-man-animated
		this.load.image('background', 'assets/background.png?3');
		this.load.spritesheet('hunter', 'assets/hunter.png?48', 80, 80); // Public doming, http://opengameart.org/content/mr-necromancer-man-animated
		this.load.spritesheet('envelope', 'assets/envelope.png', 30, 20);
	};
};
