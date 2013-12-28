function setup()
{
	setup3d(); //3d.js

	setupData(); //Game.js

	setupHex(); //Game.js

    document.onkeydown = keyPressed;
    document.onkeyup = keyReleased;
    document.addEventListener('DOMMouseScroll', onScroll, false)
    document.onmousewheel = onScroll; //Yeay for browsers!!!
    document.addEventListener("mousemove", doMouseMove, false); //Assumes that the canvas is fullscreen, change if the requirements change

	load3d(); //3d.js

    //Starting input handeling
    //document.onkeydown = keyPressed;
    //document.onkeyup = keyReleased;

    //canvas.addEventListener("mousedown", doMouseDown, false);
    //canvas.addEventListener("mouseup", doMouseUp, false);
    //Supporting scroll wheel
    //document.addEventListener('DOMMouseScroll', onScroll, false)
    //document.onmousewheel = onScroll; //Yeay for browsers!!!

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