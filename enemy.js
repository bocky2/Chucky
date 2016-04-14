//ENEMY

var Enemy = function()
{
	this.image = document.createElement("img");
	this.position = new Vector2(canvas.width/2, canvas.height/2);
	this.width = 274;
	this.height = 209;
	this.velocity = new Vector2();
	this.angularVelocity = 0;
	var speed = 120;
	
	while(this.velocity.magnitude() == 0)
	{
		this.velocity.set(rand(-10, 10), rand(-10, 10));
	}
	this.velocity.normalize();
	
	var offset = this.velocity.copy();
	offset.set(offset.x * canvas.width,
			   offset.y * canvas.height);
	this.position.add(offset);
	
	this.velocity.reverse();
	this.velocity.multiplyScalar(speed);
	
	this.image.src = "golem.png";
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