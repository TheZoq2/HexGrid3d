var fImage;

var fScaleX;
var fScaleY;

var fMod = 1;
var fParticle = new Array();
function loadF()
{
    //Loading the F
    fImage = createSprite("img/NewF.png");
    setSpriteScale(fImage, yMax, yMax);
    setSpritePosition(fImage, xMax / 2, yMax / 2);
    
    fScaleX = xMax * 1.5;
    fScaleY = xMax * 1.5;
    
    newParticle(fParticle[0], 100, 200, 200, 0, 0, 0, 0, 100);
}

function drawF()
{
    if(fScaleX > xMax / 2 - xMax / 4){
        fMod = fMod + 0.7;

        fScaleX = fScaleX - fMod;
        fScaleY = fScaleY - fMod;
        setSpriteScale(fImage, fScaleX, fScaleY);
    }else{
        displayParticle(fParticle[0]);
    }
    drawSprite(fImage);
    
    drawColor = "#ffffff";
    drawText("MouseX " + mouseX + " MouseY " + mouseY, 20, 20);
}