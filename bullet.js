//BULLET

var Bullet = function(x, y, moveRight)
{
	this.sprite = new Sprite("bullet.png");
	this.sprite.buildAnimation(1, 1, 64, 57, -1, [0]);
	this.sprite.setAnimationOffset(0, 0, 0);
	this.sprite.setLoop(0, false);
	
	this.position = new Vector2();
	this.position.set(x, y);
	
	this.velocity = new Vector2();
	
	this.moveRight = moveRight;
	if(this.moveRight == true)
		this.velocity.set(MAXDX *2, 0);
	else
		this.velocity.set(-MAXDX *2, 0);
}

Bullet.prototype.update = function(dt)
{
	this.sprite.update(dt);
	this.position.x = Math.floor(this.position.x + (dt * this.velocity.x));
}
Bullet.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x, this.position.y);
}
