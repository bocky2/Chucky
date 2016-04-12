//ENEMY

var Enemy = function()
{
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.width = 274;
	this.height = 209;
	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0;
	
	this.image.src = "golem.png";
}
Enemy.prototype.update = function(deltatime)
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
Enemy.prototype.draw = function()
{
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}