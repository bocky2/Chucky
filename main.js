var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame


function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}


//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;


// some variables to calculate the Frames Per Second (FPS - this tells use
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;



var LAYER_COUNT = 6;
var LAYER_BACKGOUND = 0;
var LAYER_TORCHES = 1;
var LAYER_LAVA = 2;
var LAYER_PLATFORMS = 3;
var LAYER_LADDERS = 4;
var LAYER_EXIT = 5;

var MAP = {tw:54, th:15};
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

 // abitrary choice for 1m
var METER = TILE;
 // very exaggerated gravity (6x)
var GRAVITY = METER * 9.8 * 4;
 // max horizontal speed (10 tiles per second)
var MAXDX = METER * 9;
 // max vertical speed (15 tiles per second)
var MAXDY = METER * 17;
 // horizontal acceleration - take 1/2 second to reach maxdx
var ACCEL = MAXDX * 3;
 // horizontal friction - take 1/6 second to stop from maxdx
var FRICTION = MAXDX * 2.5;
 // (a large) instantaneous jump impulse
var JUMP = METER * 150000;

var cells = [];
function initialize() {
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) {
		cells[layerIdx] = [];
		var idx = 0;
		for (var y = 0; y < level1.layers[layerIdx].height; y++) {
			cells[layerIdx][y] = [];
			for(var x = 0; x < level1.layers[layerIdx].width; x++) {
				if(level1.layers[layerIdx].data[idx] != 0) {
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1) {
					cells[layerIdx][y][x] = 0;
				}
				idx++;
			}
		}
	}
}

// load an image to draw
var chuckNorris = document.createElement("img");
chuckNorris.src = "hero.png";

var player = new Player();
var keyboard = new Keyboard();
var enemy = new Enemy();
var grenadeIcon = new GrenadeIcon();


var bullets = [];
bullets.push(new Bullet());

var score = 0;

function run()
{
	context.fillStyle = "#ccc";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	drawMap();
	
	player.update(deltaTime);
	player.draw();
	
	if(grenadeCount >= 3){
		grenadeIcon.draw(1850, 480);
	}
	if(grenadeCount >= 2) {
		grenadeIcon.draw(1780, 480);
	}
	if(grenadeCount >= 1) {
		grenadeIcon.draw(1710, 480);
	}
	
	for(var i = 0; i < bullets.length; ++i)
	{
		bullets[i].update(deltaTime);
		bullets[i].draw();
	}
	
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
		
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 520, 100);
	
	context.fillStyle = "limegreen";
	context.font="bold 30px Fixedsys Regular"
	context.fillText("S C O R E  =  " + score, 5, 30, 100);
	
	context.fillStyle = "#ff1a1a";
	context.fillRect(1680, 400, health, 15);
	
	if(health > 0)
	{
		health-=deltaTime;
	}
	context.fillStyle = "black";
	context.rect(1680, 400, 200, 15);
	context.stroke();
	context.font="bold 14px Arial";
	context.fillText("HEALTH", 1681, 412, 60);
	
	context.fillStyle = "#1fe5e5"
	context.fillRect(1680, 420, shield, 15);
	
	context.fillStyle = "black";
	context.rect(1680, 420, 200, 15);
	context.stroke();
	context.font="bold 14px Arial";
	context.fillText("SHIELD", 1681, 432, 60);
}

initialize();

//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
