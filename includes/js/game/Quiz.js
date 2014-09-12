/**
 * @author nilo.castro
 */
Quiz = function(game) {

	this.game = game;
	this.container = [];
	this.containerCheck = [];
	this.bg = null;
	this.map = null;
	this.collisionLayer = null;
	this.checks = null;
	this.confirmar = null;
	this.quizGroup;
	//this.check = null;
	
	this.pergunta = "Pergunta game plataforma";
	this.alternativas = [
		"alternativa1",
		"alternativa2",
		"alternativa3",
		"alternativa4"
	];
	this.feed = "Muito bem vc acertou a resposta";
	
	this.perguntaContainer;
	this.feedContainer;
	this.index = 0;
	this.line = '';
	this.confirmarStatus = false;
};

Quiz.prototype = {
	preload: function() {
		this.game.load.image('backgroundQuiz', 'includes/img/backgroundQuiz.png');
		this.game.load.spritesheet('check', 'includes/img/check.png', 32, 32);
		this.game.load.spritesheet('confirmar', 'includes/img/confirmar.png', 192, 96);
	},

	create: function() 
	{
		
	},
	update: function() {
		
	},
	render: function() {
		
	},
	callQuiz: function() 
	{
		this.quizGroup = this.game.add.group();
	 	///BG
		this.bg = this.game.add.tileSprite(0, 0, 864, 512, 'backgroundQuiz');
		this.bg.fixedToCamera = true;
		this.bg.alpha = 0;
		this.quizGroup.add( this.bg );
		this.game.add.tween(this.bg).to({ alpha: 1 }, 1000 * 0.3, Phaser.Easing.Cubic.InOut, true, 1000 * 0.4, false)
									.onComplete.addOnce( 
										function(){  
											this.createConteudo( this ); 
										} , this );	
	},
	createConteudo: function( _this )
	{
		// //Pergunta
		_this.createPergunta();
		
		//Auternativas
		for( var i=0; i <this.alternativas.length; i++ )
		{ 
			//
			_this.createAlternativas( 100, 150 + (i * 50 ), i );
		}
			
	},
	createPergunta: function()
	{
		//Pergunta
		this.perguntaContainer = this.game.add.text(100,30, '', { font: "30pt Courier" } , this.quizGroup );
		this.perguntaContainer.name = "pergunta";
		this.perguntaContainer.fixedToCamera = true;
		this.nextLine( this.pergunta, this.perguntaContainer );
		
		//Container
		this.container.push( this.perguntaContainer );		
	},
	createAlternativas: function( _x, _y, _index )
	{
		var check  = this.quizGroup.create(_x, _y, 'check' );
		check.alpha = 0;
		check.frame = 0;
		check.name = "check" + ( _index + 1 );
		this.game.add.tween(check).to({ alpha: 1 }, 1000 * 1, Phaser.Easing.Cubic.InOut, true, 1000 * 0.5, false);
		check.fixedToCamera = true;
		check.inputEnabled=true;
       	check.events.onInputDown.add( this.onCheckClick,this);
       	this.containerCheck.push( check );
		
		//Alternativas
		this.alternativaContainer = this.game.add.text( _x + 30, _y, '', { font: "20pt Courier" } , this.quizGroup );
		this.alternativaContainer.name = "alternativa" + ( _index + 1 );
		this.alternativaContainer.fixedToCamera = true;
		this.alternativaContainer.setText(this.alternativas[ _index ] );
		this.alternativaContainer.alpha = 0;
		this.game.add.tween(this.alternativaContainer).to({ alpha: 1 }, 1000 * 1, Phaser.Easing.Cubic.InOut, true, 1000 * 0.5, false);
		this.quizGroup.add( this.alternativaContainer );
		
		//
		this.container.push( this.alternativaContainer );
				
	},
	nextLine: function( _textoString , textoContainer  ) 
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
        textoContainer.setText(this.line);
	},
	onCheckClick: function( _check, pointer ) 
	{
		///// controle Check
		for( var i=0; i <this.containerCheck.length; i++ )
		{
			this.containerCheck[i].frame = 0;
		}
		_check.frame = 1;
		
		console.log( _check.name );
		
		///CreateConfirme
		if( this.confirmar == null )
		{
			this.confirmar = this.game.add.button( 864/2, 512 - 100, 'confirmar', this.OnConfirme, this, 0, 1 , 0);
			this.confirmar.fixedToCamera = true;
			this.confirmar.anchor.setTo(0.5,0.5);
			this.quizGroup.add( this.confirmar );
		}
		///CreateConfirme
	},
	OnConfirme : function()
	{
		this.confirmar = null;		
		feedback.callFeedBack();
	},
	removeConteudo : function() //// Função chamada no Feed
	{
		for(var i = 0; i < this.quizGroup.length; i++) /// Imagens
		{
			this.quizGroup.getAt(i).destroy();		
		}
		for(var j = 0; j < this.container.length; j++) /// Texto
		{
			this.container[j].destroy();		
		}	
	}
};
