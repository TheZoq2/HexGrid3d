var sprite = new Array();

var nextSprite = 0;

function createSprite(filename){
    var ID = nextSprite;
    
    sprite[ID] = {
        image: new Image(),
        
        loaded: false,
        
        xPos: 10.0,
        yPos: 10.0,
        
        scaleX: 200,
        scaleY: 200,
        
        offsetX: 0,
        offsetY: 0,
        
        angle: 0,
        
        spritesheet: false,
        sizeX: 0,
        sizeY: 0,
        frameX: 0,
        frameY: 0,
        frame: 0,
        
        //Animation data
        animating: false,
        sFrame: 0,
        eFrame: 0,
        FPS: 25,
        lastFrame: 0,
        loop: false
    };
    
    sprite[ID].image.onLoad = function(){
        sprite[ID].loaded = true;
        
        //Fixing all the anoying bugs
        if(sprite[ID].spritesheet == true){
            
        }
    }
    //Loading the image
    sprite[ID].image.src = filename; 
    
    sprite[ID].image.onload = function(){
        sprite[ID].loaded = true;
    }
    
    //Increasing the amount of existing sprites
    nextSprite = nextSprite + 1;
    
    return ID;
}

/*function setSpriteOnloadFunction(ID, functionName){
    sprite[ID].onload = functionName;
}*/


function drawSprite(ID){
    //Rotation
    if(sprite[ID].spritesheet == false){
        translateDrawing(sprite[ID].xPos - getOffsetX(), sprite[ID].yPos - getOffsetY());
        ctx.rotate(sprite[ID].angle);
        //Checking if the image has been loaded
        //ctx.drawImage(sprite[ID].image, sprite[ID].xPos, sprite[ID].yPos, sprite[ID].scaleX, sprite[ID].scaleY);
        ctx.drawImage(sprite[ID].image, 0 - calcXOffset(ID), 0 - calcYOffset(ID) , sprite[ID].scaleX, sprite[ID].scaleY);
        translateDrawingRestore(sprite[ID].xPos - getOffsetX(), sprite[ID].yPos - getOffsetY());
        //ctx.scale(1/1.1, 1/1.1);
    }else{
        
        //checking if the sprite is animated
        if(sprite[ID].animating == true){
            //Checking if the frame should change
            if(sprite[ID].lastFrame + (1000/sprite[ID].FPS) <  totalTime){
                //Increacing the frame
                var cFrame = sprite[ID].frame;
                cFrame = cFrame + 1;
                //Making sure the frame isn't out of range
                if(cFrame > sprite[ID].eFrame){
                    //Checking if the sprite should loop
                    if(sprite[ID].loop == true){
                        cFrame = sprite[ID].sFrame;
                    }else{
                        //Stopping the animation
                        sprite[ID].animating = false

                        cFrame = cFrame - 1;
                    }
                }

                sprite[ID].frame = cFrame;
                setSpriteFrame(ID, sprite[ID].frame);
                
                sprite[ID].lastFrame = totalTime;
            }
        }
        
        startX = sprite[ID].frameX * sprite[ID].sizeX;
        startY = sprite[ID].frameY * sprite[ID].sizeY;
        /*
        ctx.drawImage(sprite[ID].image, startX, startY, sprite[ID].sizeX, sprite[ID].sizeY, sprite[ID].xPos, sprite[ID].yPos, sprite[ID].scaleX, sprite[ID].scaleY);
        */
        //console.log(startX + "    " + startY + "   SizeX " + sprite[ID].sizeX + "   SizeY " + sprite[ID].sizeY + "  FrameX " + sprite[ID].frameX + "  FrameY " + sprite[ID].frameY);

        translateDrawing(sprite[ID].xPos - getOffsetX(), sprite[ID].yPos - getOffsetY());
        ctx.rotate(sprite[ID].angle);
        ctx.drawImage(sprite[ID].image, startX, startY , sprite[ID].sizeX, sprite[ID].sizeY, 0-calcXOffset(ID), 0-calcYOffset(ID), sprite[ID].scaleX, sprite[ID].scaleY);
        translateDrawingRestore(sprite[ID].xPos - getOffsetX(), sprite[ID].yPos - getOffsetY());
    }
}

function drawSpriteToScreen(ID)
{
    if(sprite[ID].spritesheet == false){
        translateDrawing(sprite[ID].xPos, sprite[ID].yPos);
        ctx.rotate(sprite[ID].angle);
        //Checking if the image has been loaded
        //ctx.drawImage(sprite[ID].image, sprite[ID].xPos, sprite[ID].yPos, sprite[ID].scaleX, sprite[ID].scaleY);
        ctx.drawImage(sprite[ID].image, 0 - calcXOffset(ID), 0 - calcYOffset(ID) , sprite[ID].scaleX, sprite[ID].scaleY);
        translateDrawingRestore(sprite[ID].xPos, sprite[ID].yPos);
        //ctx.scale(1/1.1, 1/1.1);
    }else{
        
        //checking if the sprite is animated
        if(sprite[ID].animating == true){
            //Checking if the frame should change
            if(sprite[ID].lastFrame + (1000/sprite[ID].FPS) <  totalTime){
                //Increacing the frame
                var cFrame = sprite[ID].frame;
                cFrame = cFrame + 1;
                //Making sure the frame isn't out of range
                if(cFrame > sprite[ID].eFrame){
                    //Checking if the sprite should loop
                    if(sprite[ID].loop == true){
                        cFrame = sprite[ID].sFrame;
                    }else{
                        //Stopping the animation
                        sprite[ID].animating = false

                        cFrame = cFrame - 1;
                    }
                }

                sprite[ID].frame = cFrame;
                setSpriteFrame(ID, sprite[ID].frame);
                
                sprite[ID].lastFrame = totalTime;
            }
        }
        
        startX = sprite[ID].frameX * sprite[ID].sizeX;
        startY = sprite[ID].frameY * sprite[ID].sizeY;
        /*
        ctx.drawImage(sprite[ID].image, startX, startY, sprite[ID].sizeX, sprite[ID].sizeY, sprite[ID].xPos, sprite[ID].yPos, sprite[ID].scaleX, sprite[ID].scaleY);
        */
        //console.log(startX + "    " + startY + "   SizeX " + sprite[ID].sizeX + "   SizeY " + sprite[ID].sizeY + "  FrameX " + sprite[ID].frameX + "  FrameY " + sprite[ID].frameY);

        translateDrawing(sprite[ID].xPos, sprite[ID].yPos);
        ctx.rotate(sprite[ID].angle);
        ctx.drawImage(sprite[ID].image, startX, startY , sprite[ID].sizeX, sprite[ID].sizeY, 0-calcXOffset(ID), 0-calcYOffset(ID), sprite[ID].scaleX, sprite[ID].scaleY);
        translateDrawingRestore(sprite[ID].xPos, sprite[ID].yPos);
    }
}



function calcXOffset(ID){
    return (sprite[ID].scaleX / 2)
}

function calcYOffset(ID){
    return (sprite[ID].scaleY / 2);
}

function setSpritePosition(ID, x, y){
    sprite[ID].xPos = x;
    sprite[ID].yPos = y;
}

function setSpriteScale(ID, scaleX, scaleY){
    sprite[ID].scaleX = scaleX;
    sprite[ID].scaleY = scaleY;
}

function setSpriteAngle(ID, angle){
    sprite[ID].angle = angle;
}


//////////////////////////////////////////////////////////////////////////////////////////
//                                  Frames and animation
//////////////////////////////////////////////////////////////////////////////////////////

function setSpritesheet(ID, imageWidth, imageHeight){
    sprite[ID].spritesheet = true;
    sprite[ID].sizeX = imageWidth;
    sprite[ID].sizeY = imageHeight;
}

function setSpriteFrameXY(ID, frameX, frameY){
    sprite[ID].frameX = frameX;
    sprite[ID].frameY = frameY;
}

function setSpriteFrame(ID, frame){
    //getting the amount of frames
    var xAmount = Math.round(sprite[ID].image.width / sprite[ID].sizeX);
    var yAmount = Math.round(sprite[ID].image.height / sprite[ID].sizeY);
    
    
    if(sprite[ID].image.width == 0){
        console.log("The width of the image is 0. This could be because you are trying to set the frame of the image before it is loaded")
    }
    
    var totalFrameAmount = xAmount * yAmount;
    
    if(frame > totalFrameAmount - 1){
        console.log("The image does not contain frame " + frame + " for image: " + sprite[ID].image.src + " with ID: " + ID);
    }
    
    var frameFound = false;
    var xChk = 0;
    var yChk = 0;
    var frames = 0;
    
    while(frameFound == false){
        if(frames == frame){
            setSpriteFrameXY(ID, xChk, yChk);
            sprite[ID].frame = frames;
            
            frameFound = true;
        }
        
        xChk = xChk + 1;
        if (xChk >= xAmount){
            yChk = yChk + 1
            xChk = 0;
        }
        
        frames = frames + 1;
    }
}

function getSpriteFrame(ID){
    return sprite[ID].frame;
}

function animateSprite(ID, from, to, loop, FPS){
    //getting the amount of frames
    var xAmount = Math.round(sprite[ID].image.width / sprite[ID].sizeX);
    var yAmount = Math.round(sprite[ID].image.height / sprite[ID].sizeY);
    
    var totalFrameAmount = xAmount * yAmount;
    
    //Making sure that the sprite contanis enough frames
    if(from < to && from >= 0 && to <= totalFrameAmount){
        sprite[ID].animating = true;
        sprite[ID].sFrame = from;
        sprite[ID].eFrame = to;
        sprite[ID].FPS = FPS;
        sprite[ID].loop = loop;
        
        //Setting the frame
        setSpriteFrame(ID, from);
    }else{
        //Logging an error
        if(from >= to ){console.log("You can't animate backwards. SpriteID " + ID);}
        if(from < 0){console.log("There are no negative frames. SpriteID " + ID);}
        if(to > totalFrameAmount){console.log("The sprite does not have " + to + " frames. SpriteID " + ID);}
    }
}