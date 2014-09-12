/**
 * @author nilo.castro
 */



Coin = function(game) {

	this.game = game;
	this.coins = null;
};

Coin.prototype = {

	preload: function () 
	{
		this.game.load.spritesheet('coin', 'includes/img/coin.png', 32, 32);
		this.game.load.spritesheet('explosion', 'includes/img/explosion.png', 320, 320);
	},

	create: function () 
	{
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	    this.game.physics.arcade.checkCollision.down = false;


		this.coins = this.game.add.group();
		this.coins.enableBody = true;
		this.coins.physicsBodyType = Phaser.Physics.ARCADE;


		 //  Here we'll create 12 of them evenly spaced apart
	    for (var i = 0; i < 5; i++)
	    {
			var coin = this.coins.create( this.game.rnd.integerInRange(200, 864), this.game.rnd.integerInRange(0, 150), 'coin');
			
			
			//coin.body.bounce.set(0.5); /// fica picando bem legal
			coin.body.immovable = true;
			coin.animations.add('coinAnim', [0,1,2,3,4, 5, 6, 7, 8, 9 ]);
			coin.play('coinAnim', 20, true);
			coin.body.allowGravity = false;
		}
	},


	update: function() 
	{
		this.game.physics.arcade.collide( this.coins, level.collisionLayer);
		 // object1, object2, collideCallback, processCallback, callbackContext
    	this.game.physics.arcade.overlap(player.player, this.coins, collisionHandler, null, this);
		
	}
};

function collisionHandler( _player , _coin )
{
	 // 
    if( playing )
    {
   	 	playing = false;
   	 	createExplosion(_coin);
   	} 	
}


function createExplosion( _coin )
{
	_coin.kill();
	var explosion = game.add.sprite( _coin.x, _coin.y, 'explosion');
	explosion.animations.add('explosionAnim', [0,1,2,3,4, 5, 6, 7, 8, 9 ]);
	explosion.play('explosionAnim', 20, false);
	explosion.anchor.setTo(0.5,0.5);
	this.game.add.tween(explosion).to({angle: 360}, 1000 * 1, Phaser.Easing.Cubic.InOut, true, 1000 * 0, true);
	this.game.add.tween(explosion.scale).to({x: 70, y:70}, 1000 * 1.2, Phaser.Easing.Cubic.InOut, true, 1000 * 0.2, false).onComplete.addOnce(theEnd, this);
	quiz.callQuiz();
	
	function theEnd( _this )
	{
		explosion.kill();
	}
}
