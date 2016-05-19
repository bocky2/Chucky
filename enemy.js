//ENEMY
var golemANIM_IDLE_LEFT = 0;
var golemANIM_IDLE_RIGHT = 1;
var golemANIM_ATTACK_LEFT = 0;
var golemANIM_ATTACK_RIGHT = 1;
var golemANIM_APPEAR_LEFT = 0;
var golemANIM_APPEAR_RIGHT = 1;
var golemANIM_DIE_LEFT = 0;
var golemANIM_DIE_RIGHT = 1;


var Enemy = function(x,y)
{
	this.idleSprite = new Sprite("golem idle-walk.png");
	this.idleSprite.buildAnimation(6, 2, 161, 124, 0.1,
		[0, 1, 2, 3, 4, 5,]);
	this.idleSprite.buildAnimation(6, 2, 230, 176, 0.1, 
		[11, 10, 9, 8, 7, 6]);
	this.idleSprite.setAnimationOffset(0, -55, -87);
	
	this.attackSprite = new Sprite("golem attack.png");
	this.attackSprite.buildAnimation(6, 2, 264, 186, 0.05,
		[0, 1, 2, 3, 4, 5]);
	this.attackSprite.buildAnimation(6, 2, 264, 186, 0.05,
		[11, 10, 9, 8, 7, 6]);

	this.appearSprite = new Sprite("golem appear.png");
	this.appearSprite.buildAnimation(15, 2, 228, 174, 0.05,
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
	this.appearSprite.buildAnimation(15, 2, 228, 174, 0.05,
		[29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15]);
		
	this.dieSprite = new Sprite("golem die.png");
	this.dieSprite.buildAnimation(7, 2, 228, 252, 0.05,
		[0, 1, 2, 3, 4, 5, 6]);
	this.dieSprite.buildAnimation(7, 2, 228, 252, 0.05,
		[13, 12, 11, 10, 9, 8, 7]);
	
		

	this.position = new Vector2();
	this.position.set(x, y);
	this.velocity = new Vector2();
	this.moveRight = true;
	this.pause = 0;
}
Enemy.prototype.update = function(deltaTime)
{	
	this.idleSprite.update(deltaTime);


	if(this.pause > 0)
	{
		this.pause -= deltaTime;
	}
	else
	{
		var ddx = 0; // acceleration
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // true if enemy overlaps right
		var ny = (this.position.y)%TILE; // true if enemy overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
		if(this.moveRight)
		{
			if(celldiag && !cellright) {
				ddx = ddx + ENEMY_ACCEL; // enemy wants to go right
			}
			else {
				this.velocity.x = 0;
				this.moveRight = false;
				this.pause = 0.5;
			}
		}
	if(!this.moveRight)
	{
		if(celldown && !cell) {
			ddx = ddx - ENEMY_ACCEL; // enemy wants to go left
		}
		else {
			this.velocity.x = 0;
			this.moveRight = true;
			this.pause = 0.5;
		}
	}
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx),
	-ENEMY_MAXDX, ENEMY_MAXDX);
	}
}

Enemy.prototype.draw = function()
{
	this.idleSprite.draw(context, this.position.x, this.position.y);
}