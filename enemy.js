//ENEMY

var Enemy = function()
{
	this.idleSprite = new Sprite("golem idle-walk.png");
	this.idleSprite.buildAnimation(6, 1, 228, 174, 0,
		[0, 1, 2, 3, 4, 5,]);
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.idleSprite.setAnimationOffset(i, -55, -87);
	}

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
	var posChange = this.velocity.copy();
	posChange.multiplyScalar(deltatime);
	this.position.add(posChange);
}

Enemy.prototype.draw = function()
{
	DrawImage(context, this.image, this.position.x, this.position.y, 0);
}