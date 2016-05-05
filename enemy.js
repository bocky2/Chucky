//ENEMY

var golemLEFT = 1;
var golemRIGHT = 0;

var golemANIM_IDLE_LEFT = 0;
var golemANIM_IDLE_RIGHT = 1;
var golemANIM_ATTACK_LEFT = 0;
var golemANIM_ATTACK_RIGHT = 1;
var golemANIM_APPEAR_LEFT = 0;
var golemANIM_APPEAR_RIGHT = 1;
var golemANIM_DIE_LEFT = 0;
var golemANIM_DIE_RIGHT = 1;


var Enemy = function()
{
	this.idleSprite = new Sprite("golem idle-walk.png");
	this.idleSprite.buildAnimation(6, 2, 228, 174, 0,
		[0, 1, 2, 3, 4, 5,]);
	this.idleSprite.buildAnimation(6, 2, 228, 174, 0, 
		[11, 10, 9, 8, 7, 6]);
	
	this.attackSprite = new Sprite("golem attack.png");
	this.attackSprite.buildAnimation(6, 2, 264, 186, 0,
		[0, 1, 2, 3, 4, 5]);
	this.attackSprite.buildAnimation(6, 2, 264, 186, 0,
		[11, 10, 9, 8, 7, 6]);

	this.appearSprite = new Sprite("golem appear.png");
	this.appearSprite.buildAnimation(15, 2, 228, 174, 0,
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
	this.appearSprite.buildAnimation(15, 2, 228, 174, 0,
		[29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15]);
		
	this.dieSprite = new Sprite("golem die.png");
	this.dieSprite.buildAnimation(7, 2, 228, 252, 0,
		[0, 1, 2, 3, 4, 5, 6]);
	this.dieSprite.buildAnimation(7, 2, 228, 252, 0,
		[13, 12, 11, 10, 9, 8, 7]);
		

	this.position = new Vector2();
	this.position.set( 9*TILE, 0*TILE );
	
	this.width = 228;
	this.height = 174;
	
	this.velocity = new Vector2();
	
	this.falling = true;
	
	this.direction = LEFT;
}
Enemy.prototype.update = function(deltatime)
{
	this.sprite.update(deltatime);
}

Enemy.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}