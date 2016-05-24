//ENEMY
var golemANIM_IDLE = 0;
var golemANIM_ATTACK = 1;

var Enemy = function(x,y)
{
	this.sprite = new Sprite("golem.png");
	this.sprite.buildAnimation(6, 2, 185, 130, 0.1,
		[0, 1, 2, 3, 4, 5]);
	this.sprite.setAnimationOffset(0, -90, -91);
	this.sprite.buildAnimation(6, 2, 185, 130, 0.1,
		[6, 7, 8, 9, 10, 11]);
	this.sprite.setAnimationOffset(1, -90, -91);
		
		
	this.position = new Vector2();
	this.position.set(x, y);
	this.velocity = new Vector2();
	this.moveRight = true;
	this.pause = 0;
	
	this.hit = false;
}
Enemy.prototype.update = function(deltaTime)
{	
	this.sprite.update(deltaTime);

	if(this.hit == true)
	{
		if(this.sprite.currentAnimation != golemANIM_ATTACK)
		this.sprite.setAnimation(golemANIM_ATTACK);
	}
	else{
		if(this.sprite.currentAnimation != golemANIM_IDLE)
		this.sprite.setAnimation(golemANIM_IDLE);
	}

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
	this.sprite.draw(context, this.position.x, this.position.y);
}