//GRENADE STUFF

var Grenade = function()
{
	
	
}

var GrenadeIcon = function()
{
	this.image = document.createElement("img");
	
	this.image.src ="grenadeicon.png";
}


GrenadeIcon.prototype.draw = function()
{
	DrawImage(context, this.image, 1710, 480, 0);
	DrawImage(context, this.image, 1780, 480, 0);
	DrawImage(context, this.image, 1850, 480, 0);
}