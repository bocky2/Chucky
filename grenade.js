//GRENADE STUFF

var Grenade = function()
{

}

var GrenadeIcon = function()
{
	this.image = document.createElement("img");
	
	this.image.src ="grenadeicon.png";
}

var grenadeCount = 3;

GrenadeIcon.prototype.draw = function(x, y)
{
	DrawImage(context, this.image, x, y, 0);
}