var grid;
var buildings = Array();
var buildingData = Array();
var borderSprite;

var turnBuildings = Array(); //Buildings to be constructed this turn

var tileSprites = Array();
var tileData = Array();

var tileSize = 126;
var tileHeight = tileSize * 2;
var tileWidth = Math.sqrt(3.0) / 2.0 * tileHeight;

var zoomAmount = 0.1;
var zoomTarget = 0.1;

var neighbours = [
	[ [+1,  0], [ 0, -1], [-1, -1], [-1,  0], [-1, +1], [ 0, +1] ],
	[ [+1,  0], [+1, -1], [ 0, -1], [-1,  0], [ 0, +1], [+1, +1] ]
	];

var input = {
	up: false,
	down: false,
	left: false,
	right: false,
	build: false
};

function setupHex()
{
	//loadSprites();

	setGridSize(25, 25);

	for(var y = 0; y < grid.length; y++)
	{
		for(var x = 0; x < grid[y].length; x++)
		{
			//grid[x][y].type = Math.floor(Math.random() * 2);
		}
	}

	window.onbeforeunload = exitGame;

}
function setupData()
{
	buildingData[0] = {
		reqTiles: [],
		reqNeighbours: [],

		oilCost: 500,
		foodCost: 1000,
		metalCost: 1000,
		crystalCost: 50,

		sightRange: 3
	};
	//Oil rig thing
	buildingData[1] = {
		reqTiles: [2],
		reqNeighbours: [],
		oilCost: 0,
		foodCost: 250,
		metalCost: 300,
		crystalCost: 100,

		sightRange: 2
	};
	buildingData[2] = {
		reqTiles: [],
		reqNeighbours: [0],
		oilCost: 200,
		foodCost: 200,
		metalCost: 550,
		crystalCost: 350,

		sightRange: 2
	};
	buildingData[3] = {
		reqTiles: [3],
		reqNeighbours: [0],
		oilCost:300,
		foodCost: 250,
		metalCost: 300,
		crystalCost: 0,

		sightRange: 2
	};

	tileData[0] = {
		image: "img/GrassTile.png",
		material: 0
	};
	tileData[1] = {
		image: "img/Ground.png",
		material: 0
	};
	tileData[2] = {
		image: "img/GroundOil.png",
		material: 0
	};
	tileData[3] = {
		image: "img/GroundCrystal.png",
		material: 0
	};
}

function loadSprites()
{
	var outline = true;
	
	borderSprite = createSprite("img/TileBorder.png");
	setSpriteScale(borderSprite, 256, 256);

	tileSprites[0] = createSprite("img/GrassTile.png");
	setSpriteScale(tileSprites[0], 256, 256);
	tileSprites[1] = createSprite("img/Ground.png");
	setSpriteScale(tileSprites[1], 256, 256);
	tileSprites[2] = createSprite("img/GroundOil.png");
	setSpriteScale(tileSprites[2], 256, 256);
	tileSprites[3] = createSprite("img/GroundCrystal.png");
	setSpriteScale(tileSprites[3], 256, 256);

	if(outline == true)
	{
		//tileSprites[0] = createSprite("img/low/TileTrans.png");
		//tileSprites[1] = createSprite("img/TileTransGrass.png");	
		//tileSprites[1] = createSprite("img/low/GrassTile.png");
	}

	for(var i = 0; i < tileSprites.length; i++)
	{
		setSpriteScale(tileSprites[i], 256, 256);
	}

	//Setting data for the buildings

	//Satelite
	var sprite = createSprite("img/Satelite.png");
	setSpriteScale(sprite, 256, 256);	buildingData[0] = {
		SID: sprite,
		reqTiles: [],
		reqNeighbours: [],

		oilCost: 500,
		foodCost: 1000,
		metalCost: 1000,
		crystalCost: 50,

		sightRange: 3
	};
	//Oil rig thing
	sprite = createSprite("img/olja.png");
	setSpriteScale(sprite, 200, 200);
	buildingData[1] = {
		SID: sprite,
		reqTiles: [2],
		reqNeighbours: [],
		oilCost: 0,
		foodCost: 250,
		metalCost: 300,
		crystalCost: 100,

		sightRange: 2
	};
	//Oil rig thing
	sprite = createSprite("img/Building3.png");
	setSpriteScale(sprite, 240, 240);
	buildingData[2] = {
		SID: sprite,
		reqTiles: [],
		reqNeighbours: [0],
		oilCost: 200,
		foodCost: 200,
		metalCost: 550,
		crystalCost: 350,

		sightRange: 2
	};
	sprite = createSprite("img/GroundCrystalMine.png");
	setSpriteScale(sprite, 256, 256);
	buildingData[3] = {
		SID: sprite,
		reqTiles: [3],
		reqNeighbours: [0],
		oilCost:300,
		foodCost: 250,
		metalCost: 300,
		crystalCost: 0,

		sightRange: 2
	};
}

function drawHex()
{
	//drawSprite(tileSprites[0]);
	for(var y = 0; y < grid.length; y++)
	{
		var xOffset = 0;
		//Calculating the offset on the x axis
		if(y % 2 == 1)
		{
			xOffset = tileWidth / 2;
		}

		for(var x = 0; x < grid[y].length; x++)
		{
			var xCoord = x * tileWidth + xOffset;
			var yCoord = y * tileHeight * 3/4;
			if(xCoord > getScreenStartX() - tileWidth && xCoord < getScreenEndX() + tileWidth && yCoord > getScreenStartY() - tileHeight && yCoord < getScreenEndY() + tileHeight)
			{
				if(grid[x][y].visible != 0)
				{
					var tileType = grid[x][y].type;
					setSpritePosition(tileSprites[tileType], xCoord, yCoord);
					setSpritePosition(borderSprite, xCoord, yCoord);

					drawSprite(tileSprites[tileType]);
					drawSprite(borderSprite);
				}
			}
		}
	}
}

function drawBuildings()
{
	for(var i = 0; i < buildings.length; i++)
	{
		var buildingType = buildings[i].type;
		var xCoord = coordFromHexX(buildings[i].x, buildings[i].y)
		var yCoord = coordFromHexY(buildings[i].x, buildings[i].y);
		var sprite = buildingData[buildingType].SID;
		setSpritePosition(sprite, xCoord, yCoord);
		drawSprite(sprite)
	}

	//Drawing buildings added this turn
	for(var i = 0; i < turnBuildings.length; i++)
	{
		var buildingType = turnBuildings[i].type;
		var xCoord = coordFromHexX(turnBuildings[i].x, turnBuildings[i].y)
		var yCoord = coordFromHexY(turnBuildings[i].x, turnBuildings[i].y);
		var sprite = buildingData[buildingType].SID;
		setSpritePosition(sprite, xCoord, yCoord);
		drawSprite(sprite);
	}
}

function addTurnBuilding(type, x, y)
{
	var canBePlaced = true;
	//Checking if the building can be placed in the tile
	var building = buildingData[type];

	if(building.reqTiles.length == 0) //If the building has no special tile requirements
	{
		
	}
	else
	{
		var correctTile = false;
		//Checking the tiles that the building can be placed on
		for(var i = 0; i < building.reqTiles.length; i++)
		{
			//Getting the type of the tile
			if(grid[x][y].type == building.reqTiles[i])
			{
				correctTile = true;
			}

			console.log(building.reqTiles[i]);
		}

		if(correctTile == false)
		{
			canBePlaced = false;
		}
	}

	//Checking if the building requires any neighbours nearby
	if(buildingData[type].reqNeighbours.length == 0)
	{
		
	}
	else
	{
		var correctNeighbour = false;
		for(var i = 0; i < buildingData[type].reqNeighbours.length; i++)
		{
			for(var b = 0; b < buildings.length; b++)
			{
				if(buildings[b].type == buildingData[type].reqNeighbours[i])
				{
					//Checking if the building is a neighbour to the tile the building should be placed at
					var cNeighbours = getNeighbours(x, y);

					for(var n = 0; n < cNeighbours.length; n++)
					{
						if(buildings[b].x == cNeighbours[n].x && buildings[b].y == cNeighbours[n].y)
						{
							correctNeighbour = true;
						}
					}
				}
			}
		}
		if(correctNeighbour == false)
		{
			canBePlaced = false;
		}
	}

	if(canAffordBuilding(type) == false)
	{
		canBePlaced = false;
	}

	//If the tile can be placed
	if(canBePlaced)
	{
		//removing the cost of the building
		setOil(getOil() - buildingData[type].oilCost);
		setFood(getFood() - buildingData[type].foodCost);
		setMetal(getMetal() - buildingData[type].metalCost);
		setCrystal(getCrystal() - buildingData[type].crystalCost);

		turnBuildings[turnBuildings.length] = {
			type: type,
			x: x,
			y: y
		};
	}
}
function canAffordBuilding(buildingID)
{
	result = true

	if(buildingData[buildingID].oilCost > getOil()) result = false;
	if(buildingData[buildingID].foodCost > getFood()) result = false;
	if(buildingData[buildingID].crystalCost > getCrystal()) result = false;
	if(buildingData[buildingID].metalCost > getMetal()) result = false;

	return result;

}
function getTurnBuildingAmount()
{
	return turnBuildings.length;
}
function getTurnBuildingAt(index)
{
	return turnBuildings[index];
}

function gameInput()
{
	var offsetScrollSpeed = 10 * speedMod;
	if(input.up == true)
	{
		offsetY = offsetY - offsetScrollSpeed;
	}
	if(input.down == true)
	{
		offsetY = offsetY + offsetScrollSpeed;
	}

	if(input.left == true)
	{
		offsetX = offsetX - offsetScrollSpeed;
	}
	if(input.right == true)
	{
		offsetX = offsetX + offsetScrollSpeed;
	}

	if(getMouseDown())
	{
		offsetX = offsetX - getMouseMoveX();
		offsetY = offsetY - getMouseMoveY();
	}

	zoomTarget = zoomTarget + getScrollAmount() / 20 * getCanvasZoom();

	var zoomPerFrame = 0.01 * speedMod;
	if(zoomTarget>zoomAmount + zoomPerFrame)
	{
		zoomAmount = zoomAmount + zoomPerFrame;
	}
	else if(zoomTarget < zoomAmount - zoomPerFrame)
	{
		zoomAmount = zoomAmount - zoomPerFrame;
	}
	setCanvasZoom(getZoom());
}
function getZoom()
{
	return zoomAmount;
}

function getNeighbours(xTile, yTile)
{
	var result = Array();
	//Checking if this is an odd or even row
	var mod = yTile % 2;
	for(var i = 0; i < neighbours[mod].length; i++)
	{
		result[i] = 
		{
			x: xTile + neighbours[mod][i][0],
			y: yTile + neighbours[mod][i][1]
		}
	}

	return result;
}

function setGridSize(xSize, ySize)
{
	grid = Array();

	for(var y = 0; y < ySize; y++) //Going through the y
	{
		grid[y] = Array(); //Creating an array in the slot
		for(var x = 0; x < xSize; x++) //Going through the x axis
		{
			grid[y][x] = {
				object: 0,
				material: 0,
				type: 0,

				visible: 0
			};
		}
	}
}

function hexFromCordX(xCoord, yCoord)
{
	var lowDist = 1000000;
	var lowX = -1;
	var lowY = -1;
	for(var y = 0; y < grid.length; y++)
	{
		var xOffset = 0;
		//Calculating the offset on the x axis
		if(y % 2 == 1)
		{
			xOffset = tileWidth / 2;
		}

		for(var x = 0; x < grid[y].length; x++)
		{
			var xPos = x * tileWidth + xOffset;
			var yPos = y * tileHeight * 3/4;
			
			var distX = xCoord - xPos;
			var distY = yCoord - yPos;

			var totDist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

			//Checking if the tile is closer
			if(totDist < lowDist)
			{
				lowDist = totDist;
				lowX = x;
				lowY = y;
			}
		}
	}

	return lowX;
}

function hexFromCordY(xCoord, yCoord)
{
	var lowDist = 1000000;
	var lowX = -1;
	var lowY = -1;
	for(var y = 0; y < grid.length; y++)
	{
		var xOffset = 0;
		//Calculating the offset on the x axis
		if(y % 2 == 1)
		{
			xOffset = tileWidth / 2;
		}

		for(var x = 0; x < grid[y].length; x++)
		{
			var xPos = x * tileWidth + xOffset;
			var yPos = y * tileHeight * 3/4;
			
			var distX = xCoord - xPos;
			var distY = yCoord - yPos;

			var totDist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

			//Checking if the tile is closer
			if(totDist < lowDist)
			{
				lowDist = totDist;
				lowX = x;
				lowY = y;
			}
		}
	}

	return lowY;
}

function coordFromHexX(x, y)
{
	var xOffset = 0;
	//Calculating the offset on the x axis
	if(y % 2 == 1)
	{
		xOffset = tileWidth / 2;
	}

	var xCoord = x * tileWidth + xOffset;
	var yCoord = y * tileHeight * 3/4;

	return xCoord;
}
function coordFromHexY(x, y)
{
	var xOffset = 0;
	//Calculating the offset on the x axis
	if(y % 2 == 1)
	{
		xOffset = tileWidth / 2;
	}

	var xCoord = x * tileWidth + xOffset;
	var yCoord = y * tileHeight * 3/4;

	return yCoord;
}

