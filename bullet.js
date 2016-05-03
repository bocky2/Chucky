//BULLET

var Bullet = function()
{
	this.image = document.createElement("img");
	this.position = new Vector2();
	this.position.add(player.position);
	this.velocity = new Vector2(1, 0);
	this.width = 33;
	this.height = 21;
	var speed = 256;
	this.rotation = player.rotation;
	
	this.velocity.rotateDirection(this.rotation);
	this.velocity.multiplyScalar(speed);
	

}

Bullet.prototype.update = function(deltatime)
{
	var posChange = this.velocity.copy();
	posChange.multiplyScalar(deltatime);
	this.position.add(posChange);
}

Bullet.prototype.draw = function()
{
	DrawImage(context, this.image, this.position.x, this.position.y, this.rotation);
}