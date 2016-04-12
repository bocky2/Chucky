//BULLET

var Bullet = function()
{
	this.image = document.createElement("img");
	this.x = 0;
	this.y = 0;
	this.width = 159;
	this.height = 163;
	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0;
	this.image.src = "golem.png";
}
Bullet.prototype.update = function(deltatime)
{
	if( typeof(this.rotation) == "undefined" )
		this.rotation = 0;
	
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
	{
		this.rotation -= deltatime;
	}
	else
	{
		this.rotation += deltatime;
	}
}
Bullet.prototype.draw = function()
{
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}