function moveSpriteForward(id, amount) {
    //Getting the angle of the sprite
    angle = sprite[id].angle;

    xAmount = Math.cos(angle - Math.PI * 0.5) * amount * speedMod;
    yAmount = Math.sin(angle - Math.PI * 0.5) * amount * speedMod;

    setSpritePosition(id, sprite[id].xPos + xAmount, sprite[id].yPos + yAmount);
}

function offsetSprite(id, xAmount, yAmount, xCenter, yCenter){
    angle = sprite[id].angle;

    xOffset = Math.cos(angle - Math.PI * 0.5) * yAmount;
    yOffset = Math.sin(angle - Math.PI * 0.5) * yAmount;

    xOffset = xOffset + (Math.cos(angle) * xAmount);
    yOffset = yOffset + (Math.sin(angle) * xAmount);

    setSpritePosition(id, xCenter + xOffset, yCenter + yOffset);
}

function pointSpriteAt(id, x, y) {
    //Getting the cordinates of the first sprite
    sX = sprite[id].xPos;
    sY = sprite[id].yPos;

    //Getting the diffirence between the cords
    diffX = x - sX;
    diffY = -y - -sY;

    angle = Math.atan2(diffX, diffY);

    setSpriteAngle(id, angle);
}

function pointAtReturn(sX, sY, x, y) {

    //Getting the diffirence between the cords
    diffX = x - sX;
    diffY = -y - -sY;

    angle = Math.atan2(diffX, diffY);

    return angle;
    //setSpriteAngle(id, angle);
}

function moveReturnX(angle, amount){
    //Getting the angle of the sprite
    xAmount = Math.cos(angle - Math.PI * 0.5) * amount * speedMod;

    //alert(xAmount + "   " +  amount + "   " + speedMod);

    return xAmount;
}

function moveReturnY(angle, amount) {
    //Getting the angle of the sprite
    yAmount = Math.sin(angle - Math.PI * 0.5) * amount * speedMod;

    return yAmount;
}