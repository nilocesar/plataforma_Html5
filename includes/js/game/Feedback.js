/**
 * @author nilo.castro
 */
Feedback = function(game) {

	this.game = game;

	this.bgFeed = null;
	this.goFeed = null;
	this.feed = "Muito bem vc acertou a resposta";
	this.line = '';
	this.feedGroup;
	this.container = [];
};

Feedback.prototype = {

	preload: function() 
	{
		this.game.load.image('backgroundFeed', 'includes/img/backgroundFeed.png');
		this.game.load.spritesheet('goFeed', 'includes/img/goFeed.png', 192, 96);
	},
	create: function() 
	{
		
	},
	update: function() 
	{
		
	},
	
	render: function() 
	{
		
	},
	nextLine: function( _textoString , textoContainer  ) ///Animaçao de linha
	{
		this.line = '';
	    this.game.time.events.repeat(20, 
	    							_textoString.length + 1, 
	    							function(){  this.updateLine( _textoString , textoContainer ); } , 
	    							this );
	},
	updateLine: function( _textoString , textoContainer ) 
	{
		this.line = _textoString.substr(0, this.line.length + 1);
        textoContainer.setText( this.line );
        
        //Active btn
        if( _textoString.length == this.line.length + 1  ) 
        {
       		///GO FEED
			if( this.goFeed == null )
			{
				this.goFeed = this.game.add.button( 864/2, 512 - 100, 'goFeed', this.OnGoFeed, this, 0, 1 , 0);
				this.goFeed.fixedToCamera = true;
				this.goFeed.anchor.setTo(0.5,0.5);
				this.feedGroup.add( this.goFeed );
				this.container.push( this.goFeed );
			}
			///GO FEED
        }
       
	},
	callFeedBack : function()
	{
		//
		this.feedGroup = this.game.add.group();
		
		///BG
		this.bgFeed = this.game.add.tileSprite(0, 0, 864, 512, 'backgroundFeed');
		this.bgFeed.fixedToCamera = true;
		this.bgFeed.alpha = 0;
		this.feedGroup.add( this.bgFeed );
		this.container.push( this.bgFeed );
		this.game.add.tween( this.bgFeed ).to({ alpha: 1 }, 1000 * 1, Phaser.Easing.Cubic.InOut, true, 1000 * 0, false)
		.onComplete.addOnce(
		function()
		{
				//Remove Quiz
				quiz.removeConteudo();
							  	
				//Create Feed
				this.feedContainer = this.game.add.text(50,30, '', { font: "30pt Courier" });
				this.feedContainer.fixedToCamera = true;
				this.feedGroup.add( this.feedContainer );
				this.nextLine( this.feed, this.feedContainer );
				this.container.push( this.feedContainer );
								
		} , this );
	},
	OnGoFeed : function()
	{
		this.goFeed = null;
				
		for(var k = 0; k < this.container.length; k++) /// 
		{
			this.container[k].destroy();
		}
		
		//this.feedGroup.removeAll();
		playing = true;
	}
};