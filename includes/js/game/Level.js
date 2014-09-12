/**
 * @author nilo.castro
 */
Level = function(game) {

	this.game = game;

	this.bg = null;
	this.map = null;
	this.collisionLayer = null;
	this.grama = null;
};

Level.prototype = {

	preload: function() {
		this.game.load.tilemap('level1', 'includes/json/level1.json', null, Phaser.Tilemap.TILED_JSON);
	    this.game.load.image('tiles-1', 'includes/img/tiles-1.png');
	    this.game.load.image('background', 'includes/img/background.png');
	},

	create: function() {
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	this.game.stage.backgroundColor = '#000000';
    	
    	this.bg = this.game.add.tileSprite(0, 0, 864, 512, 'background');
	    this.bg.fixedToCamera = true;
		
		
	    this.map = this.game.add.tilemap('level1');
	    this.map.addTilesetImage('tiles-1');
		
		
	    this.collisionLayer = this.map.createLayer('Tile Layer 1');
	    this.collisionLayer.debug = true;
		this.collisionLayer.resizeWorld();
		
	
		this.grama = this.map.createLayer('grama');
	    this.grama.debug = true;
	    this.grama.resizeWorld();
	    
	    this.map.setCollisionByExclusion([ ], true, 'Tile Layer 1');/// fisica apenas nas plataformas
     
	},

	update: function() {
		
	},
	
	render: function() {
		
	}

};