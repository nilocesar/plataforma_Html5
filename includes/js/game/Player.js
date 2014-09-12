/**
 * @author nilo.castro
 */



Player = function(game) {
	
	this.game = game;
	this.player = null;
	this.controlEsquerda = null;
	this.controlDireita = null;
	this.controlUp = null;
	this.cursors = null;
	this.jumpButton = null;
	this.facing = null;
	this.jumpTimer = null;
	this.statusTouch = false;
	this.leftTouch = false;
	this.rightTouch = false;
	this.upTouch = false;
	this.startTouch = false;
	
	
	if (Modernizr.touch) 
	{ 
		this.statusTouch = true;
	} else { 
		this.statusTouch = true;
	}
};

Player.prototype = {

	preload: function () {
	
		this.game.load.spritesheet('dude', 'includes/img/dude.png', 32, 48);
		this.game.load.image('setaDireita', 'includes/img/setaDireita.png');
		this.game.load.image('setaEsquerda', 'includes/img/setaEsquerda.png');
		this.game.load.image('setaUp', 'includes/img/setaUp.png');
	},

	create: function () {
		
		this.game.physics.arcade.gravity.y = 250; // PESO DO OBJETO COM BASE NA GRAVIDADE

	    this.player = this.game.add.sprite(32, 32, 'dude');
	    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
	
	    this.player.body.bounce.y = 0.2;
	    this.player.body.collideWorldBounds = true;
	    this.player.body.setSize(20, 32, 5, 16);
	
	    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	    this.player.animations.add('turn', [4], 20, true);
	    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
	
	    this.game.camera.follow(this.player);
	
	    this.cursors = this.game.input.keyboard.createCursorKeys();
	    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	  
	    if( this.statusTouch )
	    {
			this.createControlTouch();
	    }
	    
	    //
	    this.game.input.addPointer();
	    this.game.input.addPointer();
	    this.game.input.addPointer();
	    this.game.input.addPointer();
		//	
	},


	update: function() {
		
		this.game.physics.arcade.collide(this.player, level.collisionLayer);
	    this.player.body.velocity.x = 0;
		
		if( playing )
		{
			if( this.statusTouch )/// ativar status touch
		    {
				this.updateControlTouch();	    
		    }
			
		    if (this.cursors.left.isDown || this.leftTouch )
		    {
		        this.player.body.velocity.x = -150;
		
		        if (this.facing != 'left')
		        {
		            this.player.animations.play('left');
		            this.facing = 'left';
		        }
		    }
		    else if (this.cursors.right.isDown || this.rightTouch )
		    {
		        this.player.body.velocity.x = 150;
		
		        if (this.facing != 'right')
		        {
		            this.player.animations.play('right');
		            this.facing = 'right';
		        }
		    }
		    else
		    {
		        if (this.facing != 'idle')
		        {                                                 
		            this.player.animations.stop();
		
		            if (this.facing == 'left')
		            {
		                this.player.frame = 0;
		            } else
		            {
		                this.player.frame = 5;
		            }
		
		            this.facing = 'idle';
		        }
		    }
		   
		   var jumpDown = this.upTouch || this.jumpButton.isDown || this.cursors.up.isDown;
		   
		   		   
		    if ( jumpDown && this.player.body.onFloor() && this.game.time.now > this.jumpTimer)
		    {
		        this.player.body.velocity.y = -250;
		        this.jumpTimer = this.game.time.now + 750;
		    }
	   }
	},
	render: function() 
	{
		// this.game.debug.pointer(this.game.input.mousePointer);
	    // this.game.debug.pointer(this.game.input.pointer1);
	    // this.game.debug.pointer(this.game.input.pointer2);
	    // this.game.debug.pointer(this.game.input.pointer3);
	    // this.game.debug.pointer(this.game.input.pointer4);
	    // this.game.debug.pointer(this.game.input.pointer5);
	    // this.game.debug.pointer(this.game.input.pointer6);
	},
	createControlTouch: function()
	{
		this.controlEsquerda = this.game.add.button(100, 400, 'setaEsquerda');
		this.controlEsquerda.inputEnabled = true;
		this.controlEsquerda.input.useHandCursor = true;
		this.controlEsquerda.fixedToCamera = true;
		this.controlEsquerda.input.priorityID = 0;
		this.controlEsquerda.events.onInputDown.add(onTouchStartLeft,this);
		this.controlEsquerda.events.onInputUp.add(onTouchEndLeft,this);
		function onTouchStartLeft (e) {
		 this.leftTouch = true;
		};
		function onTouchEndLeft (e) {
		  this.leftTouch = false;
		};
		
		// alert( this.game.device.iOS );
		
		this.controldireito = this.game.add.sprite(200, 400, 'setaDireita');
		this.controldireito.inputEnabled = true;
		this.controldireito.input.useHandCursor = true;
		this.controldireito.fixedToCamera = true;
		this.controldireito.input.priorityID = 0;
		this.controldireito.events.onInputDown.add(onTouchStartRight,this);
		this.controldireito.events.onInputUp.add(onTouchEndRight,this);
		function onTouchStartRight (e) {
		 this.rightTouch = true;
		};
		function onTouchEndRight (e) {
		  this.rightTouch = false;
		};
		
		this.controlUp = this.game.add.sprite(680, 400, 'setaUp');
		this.controlUp.inputEnabled = true;
		this.controlUp.input.useHandCursor = true;
		this.controlUp.fixedToCamera = true;
		this.controlUp.input.priorityID = 0;
		this.controlUp.events.onInputDown.add(onTouchStartUp,this);
		this.controlUp.events.onInputUp.add(onTouchEndUp,this);
		function onTouchStartUp (e) {
			this.upTouch = true;
		};
		function onTouchEndUp (e) {
		  	this.upTouch = false;
		};
		
	
	},
	updateControlTouch: function()
	{
		// console.log( " screenX " + this.game.input.mousePointer.screenX 
		// + " pageX " + this.game.input.mousePointer.pageX
		// + " clientX " + this.game.input.mousePointer.clientX
		// + " controldireito.x " + this.controldireito.x
		// + " controldireito.screenX " + this.controldireito.screenX
		 // );

		var  widthGame = this.game.width/2;
		var quadrante1 = widthGame/2;
		var quadrante2 = widthGame;
		
		
		if( this.game.input.pointer1.isDown  )
		{
			//LEFT
			if( this.game.input.pointer1.screenX < quadrante1 )
			{
				this.leftTouch = true;
			}
			else
			{
				this.leftTouch = false;	
			}
			
			//RIGHT
			if( this.game.input.pointer1.screenX >= quadrante1 && this.game.input.pointer1.screenX < quadrante2 )
			{
				this.rightTouch = true;	
			}
			else
			{
				this.rightTouch = false;
			}		
			
			
			//UP
			if( this.game.input.pointer1.screenX >= quadrante2 )
			{
				this.upTouch = true;
			}
			
		}
		
		if( this.game.input.pointer1.isUp )
		{
			if( this.rightTouch == true) this.rightTouch = false;
			if( this.leftTouch == true) this.leftTouch = false;
			//if( this.upTouch == true) this.upTouch = false;
		}
		
		
		if( this.game.input.pointer2.isDown  )
		{
			//UP
			if( this.game.input.pointer2.screenX >= quadrante2 )
			{
				this.upTouch = true;	
			}
		}
			
		
		if( this.game.input.pointer2.isUp )
		{
			if( this.upTouch == true) this.upTouch = false;			
		}
		
		$("#console").text( "cosole UP " + this.upTouch );	
	}
};
