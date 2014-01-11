var mouseX = 0;
var mouseY = 0;

var mouseX3d = 0;
var mouseZ3d = 0;
var moveX3d = 0;
var moveY3d = 0;

var mouseFrameX;
var mouseFrameY

var oldMouseX = 0;
var oldMouseY = 0;

var mouseHoldTime = 200;
var mouseDown = false;
var mouseHeld = false;
var mouseClick = false;
var mouseHeldFor;
var mouseHoldStart;
var mouseClick = false;
var frameScroll;
var releaseTime;
var clickX;
var clickY;

var lookingAtX = 5;
var lookingAtZ = 5;
var cameraHeight = 10;

function updateInput() //Call this to get all mouse hold features working
{
	oldMouseX = mouseFrameX;
	oldMouseY = mouseFrameY;
	mouseFrameX = mouseX;
	mouseFrameY = mouseY;

	oldMOuseX = 0; //Resetting the old coridnate
	oldMOuseY = 0;
	if(mouseHeld == true)
	{
		mouseHeldFor = totalTime - mouseHoldStart;
		//Checking how long it has been held
		if(mouseHeldFor > mouseHoldTime || (getMouseMoveX() != 0 && getMouseMoveY() != 0))
		{
			mouseDown = true;
		}
	}

	if(releaseTime < totalTime  - 100)
	{
		mouseClick = false;
	}

	//Calculating the mouse movement
    frameScroll = scrollAmount; //Saving the amount scrolled this frame
    scrollAmount = 0;//Restoring the scroll for next frame

    //Updating the camera position
    if(input.up)
    {
        lookingAtZ = lookingAtZ - 0.1 * speedMod;
    }
    if(input.down)
    {
        lookingAtZ = lookingAtZ + 0.1 * speedMod;
    }
    if(input.left)
    {
        lookingAtX = lookingAtX - 0.1 * speedMod;
    }
    if(input.right)
    {
        lookingAtX = lookingAtX + 0.1 * speedMod;
    }

    cameraHeight = cameraHeight - getScrollAmount() * 0.05;

    //Calculating how much the mouse has moved in 3d space (On Y = 0)
    moveX3d = 0;
    moveY3d = 0;
    var oldMouseX3d = mouseX3d;
    var oldmouseZ3d = mouseZ3d;

    mouse3d = screenTo3d(getMouseX(), getMouseY());
    mouseX3d = mouse3d.x;
    mouseZ3d = mouse3d.z;

    moveX3d = mouseX3d - oldMouseX3d;
    moveY3d = mouseZ3d - oldmouseZ3d;

    //calculating how much the cursor has moved in the 3d space ignoring the camera movement
    var oldX = getMouseX() - getMouseMoveX();
    var oldY = getMouseY() - getMouseMoveY();

    var old3d = screenTo3d(oldX, oldY);
    var new3d = screenTo3d(getMouseX(), getMouseY());

    var MoveX3dNoCam = new3d.x - old3d.x;
    var MoveZ3dNoCam = new3d.z - old3d.z;

    //Moving the camera if the mouse is held down
    if(mouseDown == true)
    {
    	lookingAtX -= MoveX3dNoCam;
    	lookingAtZ -= MoveZ3dNoCam;
    }
}

function doMouseDown(e)
{
    mouseHeld = true;

    //Saving the location of the click
    clickX = getMouseX();
    clickY = getMouseY();

    mouseHoldStart = totalTime;
}
function doMouseUp(e)
{

    mouseHeld = false;

    mouseDown = false;

    if(mouseHeldFor < mouseHoldTime && clickX == getMouseX() && clickY == getMouseY())
    {
    	mouseClick = true;

    	releaseTime = totalTime;
    }
}

function getMouseDown()
{
	return mouseDown;
}
function getMouseClick()
{
	return mouseClick;
}
function getMouseX()
{
    return mouseX;
}
function getMouseY()
{
    return mouseY;
}

function getMouseScreenX()
{
    return mouseX;
}
function getMouseScreenY()
{
    return mouseY;
}

function getMouseMoveX()
{
	var move = mouseX - oldMouseX;
	return move;
}
function getMouseMoveY()
{
	var move = mouseY - oldMouseY;
	return move;
}

function doMouseMove(e){
    //Updating the x and y cordinates of the mouse
    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

function keyPressed(e) {
    if (e.keyCode == 87) { //Forward
        input.up = true;
    }

    if (e.keyCode == 65) { //Left key
        input.left = true;
    }

    if (e.keyCode == 83) { //Back
        input.down = true;
    }

    if (e.keyCode == 68) { //Right
        input.right = true;
    }
    if(e.keyCode == 66)
    {
        input.build = true;
    }
}

function keyReleased(e) {
    if (e.keyCode == 87) { //Forward
        input.up = false;
    }

    if (e.keyCode == 65) { //Left key
        input.left = false;
    }

    if (e.keyCode == 83) { //Back
        input.down = false;
    }

    if (e.keyCode == 68) { //Right
        input.right = false;
    }

    if(e.keyCode == 66)
    {
        input.build = false;
    }
}

var scrollDelta = 0;
var scrollAmount = 0;
function onScroll(e)
{
    var delta = 0;

    if (!e) e = window.event;
    // normalize the delta
    if (e.wheelDelta) {
        // IE and Opera
        delta = e.wheelDelta / 60;
    } else if (e.detail) {
        // W3C
        delta = -e.detail / 2;
    }

    //console.log("Delta: " + delta);
    scrollAmount = scrollAmount + delta;
    scrollDelta = delta;
}
function getScrollAmount()
{
    return frameScroll;
}