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

var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;

var gameState = STATE_SPLASH;


var enemies = [];

var LAYER_COUNT = 6;
var LAYER_BACKGOUND = 0;
var LAYER_TORCHES = 1;
var LAYER_LAVA = 2;
var LAYER_PLATFORMS = 3;
var LAYER_EXIT = 4;
var LAYER_ENEMY = 5;

var MAP = {tw:54, th:17};
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

var ENEMY_MAXDX = METER * 5;
var ENEMY_ACCEL = ENEMY_MAXDX * 2;

var musicBackground;
var sfxFire;

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
	// add enemies
	idx = 0;
	for(var y = 0; y < level1.layers[LAYER_ENEMY].height; y++) {
		for(var x = 0; x < level1.layers[LAYER_ENEMY].width; x++) {
			if(level1.layers[LAYER_ENEMY].data[idx] != 0) {
				var px = tileToPixel(x);
				var py = tileToPixel(y);
				var e = new Enemy(px, py);
				enemies.push(e);
			}
			idx++;
		}
	} 
	musicBackground = new Howl(
	{
		urls: ["02 Sidekick.mp3"],
		loop: true,
		buffer: true,
		volume: 0.75
	} );
	musicBackground.play();
	
	sfxFire = new Howl(
	{
		urls: ["cg1.wav"],
		buffer: true,
		volume: 1,
		onend: function() {
			isSfxPlaying = false;
		}
	} );
}

// load an image to draw
var chuckNorris = document.createElement("img");
chuckNorris.src = "hero.png";

var player = new Player();
var keyboard = new Keyboard();
var grenadeIcon = new GrenadeIcon();

var bullets = [];
bullets.push(new Bullet());

var background = {
	image: document.createElement("img")
}
background.image.src = "Background.png";

var splashThing = {
	image:document.createElement("img")
}
splashThing.image.src = "splash screen.png";

var overThing = {
	image:document.createElement("img")
}
overThing.image.src = "gameover.png";

var score = 0;
var splashTimer = 4;

function runSplash(deltaTime)
{
	splashTimer -= deltaTime;
	if(splashTimer <= 0)
	{
		gameState = STATE_GAME;
		return;
	}
	
	DrawImage(context, splashThing.image, 945, 262.5, 0);
}

function runGame(deltaTime)
{

	DrawImage(context, background.image, 945, 262.5, 0);
	
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
	
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].update(deltaTime);
	}
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].draw();
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
	
	var hit=false;
	for(var i=0; i<bullets.length; i++)
	{
		bullets[i].update(deltaTime);
		if( bullets[i].position.x < 0 ||
			bullets[i].position.x > SCREEN_WIDTH)
		{
			hit = true;
		}
		for(var j=0; j<enemies.length; j++)
		{
			if(intersects( bullets[i].position.x, bullets[i].position.y, TILE, TILE,
			enemies[j].position.x, enemies[j].position.y, TILE, TILE) == true)
			{
				// kill both the bullet and the enemy
				enemies.splice(j, 1);
				hit = true;
				// increment the player score
				score += 1;
				break;
			}
		}
		if(hit == true)
		{
			bullets.splice(i, 1);
			break;
		}
	}
	for(var i=0; i<enemies.length; i++)
		{
			if(intersects(
			enemies[i].position.x - 160/2 + 55, enemies[i].position.y - 160/2 + 30, 85, 85,
			player.position.x - player.width/2 + 65, player.position.y - player.height/2 + 30, player.width/3, player.height/2) == true)
			{
				enemies[i].hit = true;
				if(hitTimer <= 0){
					hitTimer = hitTimer + 3;
					health = health - 200/3;
				}
			}
			else{
				enemies[i].hit = false;
			}
		}
	
	if(hitTimer > 0)
	{
		hitTimer -= deltaTime;
	}
	
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 520, 100);
	
	context.fillStyle = "#e67300";
	context.font="bold 30px FangSong"
	context.fillText("SCORE  =  " + score, 5, 30, 300);
	
	context.fillStyle = "#ff1a1a";
	context.fillRect(1680, 400, health, 15);	
	
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
	
	if(health <= 0)
	{
		gameState = STATE_GAMEOVER;
		return;
	}
}

function runGameOver(deltaTime)
{
	DrawImage(context, overThing.image, 945, 262.5, 0);
}

function run()
{
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);
	var deltaTime = getDeltaTime();
	switch(gameState)
	{
		case STATE_SPLASH:
			runSplash(deltaTime);
			break;
		case STATE_GAME:
			runGame(deltaTime);
			break;
		case STATE_GAMEOVER:
			runGameOver(deltaTime);
			break;
	}
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
