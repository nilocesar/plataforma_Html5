/**
 * @author nilo.castro
 */
var playing = true;/// variavel que controla o status do jogo
var game = new Phaser.Game(864, 512, Phaser.AUTO, 'gamePlataforma', { preload: preload, create: create, update: update, render: render });
var level = null;
var feedback = null;
var quiz = null;
var player = null;
var coin = null;

//window.location="mailto:contato@site.com.br";

function preload()
{
	level = new Level(game);
   	level.preload();
   	
   	coin = new Coin(game);
   	coin.preload();
   	
   	player = new Player(game);
   	player.preload();
   
   	quiz = new Quiz(game);
   	quiz.preload();
   	
   	feedback = new Feedback(game);
   	feedback.preload();
}

function create()
{
    level.create();
	coin.create();
	player.create();
	quiz.create();
	feedback.create();
}

function update() 
{
	level.update();
	coin.update();
	player.update();
	quiz.update();
	feedback.update();
}

function render() {
	
	player.render(); 
}
