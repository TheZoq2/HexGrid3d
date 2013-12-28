var canvas;
var ctx;
var canLoaded = false;

var lastFrame;
var frameRate;

var clearColor;
var drawColor;

var testNum = 0;

var offsetX = 0;
var offsetY = 0;

var canvasZoom = 1;

function createCanvas(){
    canvas = document.getElementById("c_1");
    
    ctx = canvas.getContext("2d");
    
    //Adding a mouse listener
    canvas.addEventListener("mousemove", doMouseMove, false);
}

function drawLine(sX, sY, eX, eY){ //Draw line will draw a line between (sX, sY) and (eX, eY)
    //ctx.strokeStyle = drawColor;
    ctx.strokeStyle = drawColor;
    
    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
    ctx.stroke();
}

function drawRect(sX, sY, eX, eY){ //Draw rect will draw a rectangle starting at (sX, sY) and ending at (eX, eY)
    ctx.fillStyle = drawColor;
    
    var startX;
    var startY;
    var sizeX;
    var sizeY;
    
    //Calculating the positions of the circle
    if(sX < eX){
       startX = sX;
       
       sizeX = eX - sX;
    }else{
       startX = eX;
       
       sizeX = sX - eX;
    }
    
    if(sY < eY){
        startY = sY;
        sizeY = eY - sY;
    }else{
        startY = eY;
        sizeY = sY - eY;
    }
    
    ctx.fillRect(startX, startY, sizeX, sizeY);
}

function drawTextToScreen(string, xPos, yPos)
{
    ctx.fillStyle = drawColor;
    
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '18px Calibri';
    ctx.fillText(string, xPos, yPos);
}
function drawText(string, xPos, yPos){ //Draw text will draw some text to the screen at xPos and yPos
    translateOffset(- getOffsetX(), - getOffsetY());
    ctx.fillStyle = drawColor;
    
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '18px Calibri';
    ctx.fillText(string, xPos, yPos);

    translateOffsetRestore(- getOffsetX(), - getOffsetY());
}

function drawEclipse(x, y, diameter){
    translateOffset(- getOffsetX(), - getOffsetY());
    ctx.strokeStyle = drawColor;
    
    for (var i=0;i < diameter;i++)
    {
        ctx.beginPath();
        ctx.arc(x,y,i,0,2*Math.PI);
        ctx.stroke();
    }
    
    for (var i=0;i < diameter-1;i++)
    { 
        ctx.beginPath();
        ctx.arc(x+1,y,i,0,2*Math.PI);
        ctx.stroke();
    }
    translateOffset(getOffsetX(), getOffsetY());
}

function cls(){ //Cls will clear all the content in the canvas
    //Clearing the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //Setting a background color
    ctx.fillStyle = clearColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //Resetting the fll style
    ctx.fillStyle = drawColor;
}

function setOffset(x, y)
{
    offsetX = x;
    offsetY = y;
}
var trueOffsetX = 0;
var trueOffsetY = 0; //The offset with zoom taken into consideration
function getOffsetX()
{
    return trueOffsetX;
}
function getOffsetY()
{
    return trueOffsetY;
}

function getScreenStartX()
{
    return getOffsetX();
}
function getScreenStartY()
{
	return getOffsetY();
}
function getScreenEndX()
{
    var endX = xMax / getCanvasZoom() + getOffsetX();
    return endX;
}
function getScreenEndY()
{
    var endY = yMax  / getCanvasZoom() + getOffsetY();
    return endY;
}

function translateDrawing(xPos, yPos)
{
    translateOffset(xPos, yPos);
}
function translateDrawingRestore(xPos, yPos)
{
    translateOffsetRestore(xPos, yPos)
}
function translateOffset(xAmount, yAmount)
{
    ctx.translate(xAmount * getCanvasZoom(), yAmount * getCanvasZoom());
    ctx.scale(getCanvasZoom(), getCanvasZoom());
}
function translateOffsetRestore(xAmount, yAmount)
{
	ctx.scale(1/getCanvasZoom(), 1/getCanvasZoom());
	ctx.translate(- xAmount * getCanvasZoom(), - yAmount * getCanvasZoom());
}

function setCanvasZoom(zoom)
{
	trueOffsetX = offsetX - (xMax / 2) * 1/getCanvasZoom();
	trueOffsetY = offsetY - (yMax / 2) * 1/getCanvasZoom();

    canvasZoom = zoom;
}

function getCanvasZoom()
{
	return canvasZoom;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadImage(filename, x, y){
    var img = new Image();
    img.onload = function(){
      ctx.drawImage(img,0,0);
      ctx.beginPath();
      ctx.moveTo(30,96);
      ctx.lineTo(70,66);
      ctx.lineTo(103,76);
      ctx.lineTo(170,15);
      ctx.stroke();
    };
    img.src = '/../img/Test2.png';
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function doMouseDown(){
}

function getMouseX(){
    var x = 0;
    
    return x;
}

function getMouseY(){
    var y = 0;
    
    return y;
}