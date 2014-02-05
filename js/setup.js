function setup()
{
	setup3d(); //3d.js

	setupData(); //Game.js

	setupHex(); //Game.js

    container = document.getElementById("canvasContainer");

    container.onkeydown = function(e){keyPressed(e); console.log("Key pressed");};
    container.onkeyup = keyReleased;
    container.addEventListener('DOMMouseScroll', onScroll, false)
    container.onmousewheel = onScroll; //Yeay for browsers!!!
    container.addEventListener("mousemove", doMouseMove, false); //Assumes that the canvas is fullscreen, change if the requirements change
    container.addEventListener("mousedown", doMouseDown, false);
    container.addEventListener("mouseup", doMouseUp, false);

    container.addEventListener('contextmenu', function(e) { //Disable right click
        if (e.button === 2) {
            e.preventDefault();
            return false;
        }
    }, false);

	load3d(); //3d.js

    //Getting the playername
    var namefield = document.getElementById("name");
    player = namefield.value;
    //Removing the value for security
    namefield.value = "";

    //Starting the main game loop
    setInterval(function(){mainLoop()}, 1000/60);
}

//Timing functions
var timer = new Date();
newTime = 0;
frameTime = 0;
var speedMod; // This variable will be used to fix lag and for timer based movment
var totalTime = 0; //This variable will be increased every time the frame is updated to keep track of the time the game has been running
var FPS;

function timing() {
    //////////////////////////////////////////////////////////////
    //Updating the frametime
    timer = (new Date);

    oldTime = newTime;
    newTime = timer.getMilliseconds();

    if (oldTime > newTime) {
        newTime = newTime + 1000;
    }

    frameTime = newTime - oldTime;

    totalTime = totalTime + frameTime;

    //Reseting the new time
    if (newTime > 1000) {
        newTime = newTime - 1000
    }

    speedMod = frameTime / 16.6;
}