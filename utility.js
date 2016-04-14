//UTILITY

function DrawImage(ctx, img, posX, posY, ang)
{
	ctx.save();
		ctx.translate(posX, posY);
		ctx.rotate(ang);
		ctx.drawImage(img, -img.width/2, -img.height/2);
	ctx.restore();
}

function SetupImageEvents(object, img)
{
	img.onload = function() {
		object.width = img.width;
		object.height = img.height;
	};
	img.onerror = function() {
		console.log("Failed to load image at path " + this.src);
	};
}

function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
{
	if(y2 + h2 < y1 - hl/2 ||
		x2 + w2 < x1 - wl/2 ||
		x2 - w2/2 > x1 + w1 ||
		y2 - h2/2 > y1 + h1)
	{
		return false;
	}
	return true;
}

function rand(floor, ceil)
{
	return  (Math.random()* (ceil-floor)) + floor ;
}