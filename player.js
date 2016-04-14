//PLAYER

var Player = function()
{
	this.image = document.createElement("img");
	this.position = new Vector2(this.x = canvas.width/2, this.y = canvas.height/2);
	this.width = 159;
	this.height = 163;
	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0;
	
	this.image.src = "hero.png";
}
Player.prototype.update = function(deltatime)
{
		if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true)
		{
			this.rotation -= deltatime;
		}
		else
		{
			this.rotation += deltatime;
		}
}
Player.prototype.draw = function()
{
	DrawImage(context, this.image, this.position.x, this.position.y, this.rotation);
}