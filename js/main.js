var gameState = 0; //The current state of the game

var readyToSend = 1;

var lastUpdateRequest = 0;
var requestInterval = 1000; //The amount of time in miliseconds to wait before making a new uptade request

var lastMapRequest = 0;
var mapUpdateInterval = 5000;

var selTool = 0;
var selID = 0;
var lastID = 0;
var lastTool;

function mainLoop()
{
	//updateInput();
    //gameInput();

    timing();

    //Input 
    updateInput();

	if(gameState == 0)
	{
		requestMap();

		setupUI();

		gameState = 2; //Waiting for a turn
	}
	if(gameState == 1) //The users turn
	{
		showUI();

		//if a building is selected
		if(selTool == 1)
		{
			var tileX = hexFromCordX(mouseX3d, mouseZ3d);
			var tileZ = hexFromCordY(mouseX3d, mouseZ3d);
			var posX = coordFromHexX(tileX, tileZ);
			var posZ = coordFromHexY(tileX, tileZ);

			if(cursorObject == 0 || lastID != selID || selTool != lastTool)
			{
				setCursorObject(buildingData[selID].object);
			}

			setCursorObjectPos(posX, 0, posZ);

			if(mouseClick == true)
			{
				addTurnBuilding(selID, tileX, tileZ)
			}

			lastID = selID;
			lastTool = selTool;
		}

		//If a unit is selected
		if(selTool == 2)
		{
			var tileX = hexFromCordX(mouseX3d, mouseZ3d);
			var tileZ = hexFromCordY(mouseX3d, mouseZ3d);
			var posX = coordFromHexX(tileX, tileZ);
			var posZ = coordFromHexY(tileX, tileZ);

			if(cursorObject == 0 || lastID != selID || selTool != lastTool)
			{
				setCursorObject(unitBase[selID].object.clone());
			}
			setCursorObjectPos(posX, 0, posZ);

			if(mouseClick == true)
			{
				addTurnUnit(selID, tileX, tileZ);
			}

			lastID = selID;
			lastTool = selTool;
		}

		if(totalTime > lastUpdateRequest + requestInterval)
		{
			createRequest("requests.php", "type=r_ping", function(){}); //Sending a request to let the server know that the player is still online

			lastUpdateRequest = totalTime;
		}
	}
	if(gameState == 2) //waiting for turn
	{
		if(totalTime > lastUpdateRequest + requestInterval) //Checking if an update request has been sent recently
		{
			//Sending a request to the server requesting turn data
			createRequest("requests.php", "type=r_turnData", onTurnUpdate);

			lastUpdateRequest = totalTime;
		}

		if(totalTime > lastMapRequest + mapUpdateInterval)
		{
			requestMap();

			lastMapRequest = totalTime;
		}

		//Hiding the UI so the user can't use the end turn button when its not their turn
		hideUI();
	}
}

function requestMap()
{
	createRequest("requests.php", "type=r_mapData", function(result){
		console.log(result);
		handleMapData(result);
	});

	//Requesting building data
	createRequest("requests.php", "type=r_buildingData", function(result){
		handleBuildingData(result);
	});

	//Requesting resources
	createRequest("requests.php", "type=r_resourceData", function(result){
		handleResourceData(result);
	});

	//Requesting units
	createRequest("requests.php", "type=r_unitData", function(result){
		handleUnitData(result);
	});
}

function handleMapData(data) //Takes care of map data that is returned from the server
{
	//Separating the data in the result
	var strings = data.split("|");

	//Reading the first data which hopefully contains sizes
	var varArray = separateVariables(strings[0]);
	for(var i = 0; i < varArray.length; i++)
	{
		var varType = getVarType(varArray[i]);
		var varValue = getVarValue(varArray[i]);
	}

	for(var i = 1; i < strings.length; i++) //Reading the actual map data from the result
	{
		var posX = -1;
		var posY = -1;
		var type = 0;
		var visible = 0;

		var varArray = separateVariables(strings[i]);
		for(var n = 0; n < varArray.length; n++)
		{
			var varType = getVarType(varArray[n]);
			var varValue = getVarValue(varArray[n]);

			if(varType == "posX")
			{
				posX = parseInt(varValue);
			}

			if(varType == "posY")
			{
				posY = parseInt(varValue);
			}

			if(varType == "type")
			{
				type = parseInt(varValue);
			}
			if(varType == "explored")
			{
				visible = parseInt(varValue);
			}
		}

		if(posX != -1 && posY != - 1 && posX < grid.length) //Making sure no data is misisng
		{
			if(posY < grid[posX].length)
			{
				grid[posX][posY].type = type;
				grid[posX][posY].visible = visible;

				setGroundMaterial(posX, posY);
			}
		}
	}

	updateTileObjects();
}

function handleBuildingData(data)
{
	//Separating datagroups
	var buildingStr = data.split("|");

	for(var i = 0; i < buildingStr.length; i++)
	{
		varArray = separateVariables(buildingStr[i]);

		var posX = -1;
		var posY = -1;
		var type = 0;

		for(var n = 0; n < varArray.length; n++) //Going thru all the variables in the data section
		{
			var varType = getVarType(varArray[n]);
			var varValue = getVarValue(varArray[n]);

			if(varType == "posX")
			{
				posX = parseInt(varValue);
			}
			if(varType == "posY")
			{
				posY = parseInt(varValue);
			}

			if(varType == "type")
			{
				type = parseInt(varValue);
			}
		}

		if(posX != -1 && posY != -1) //Making sure type and positions are relevant
		{
			object = buildingData[type].object.clone();
			object.position.x = coordFromHexX(posX, posY);
			object.position.z = coordFromHexY(posX, posY);

			material = new THREE.MeshPhongMaterial({color:0x777777, ambient: 0x111111}); //Phong material for the lights

			setGroupMaterial(object, material);

			//Adding the building to the building array
			buildings[i] = {
				x: posX,
				y: posY,
				type: type,
				object: object
			};

			scene.add(buildings[i].object); 
		}
	}

	updateBuildingObjects();
}

function handleResourceData(data)
{
	//Works the same way as handleBuildingData

	var resourceStr = data.split("|");

	for(var i = 0; i < resourceStr.length; i++)
	{
		varArray = separateVariables(resourceStr[i]);

		for(var n = 0; n < varArray.length; n++) //Going thru all the variables in the data section
		{
			var varType = getVarType(varArray[n]);
			var varValue = getVarValue(varArray[n]);

			if(varType == "oil")
			{
				setOil(parseInt(varValue));
			}
			if(varType == "food")
			{
				setFood(parseInt(varValue));
			}
			if(varType == "crystal")
			{
				setCrystal(parseInt(varValue));
			}
			if(varType == "metal")
			{
				setMetal(parseInt(varValue));
			}
		}
	}
}
function handleUnitData(data)
{

}

function onTurnUpdate(data) //Function to run when a response from an update request has been sent
{
	if(data == "waitingForOthers") //If it is not the clients turn
	{

	}
	else if(data == "makeTurn") //If its the clients turn
	{
		gameState = 1;
		requestMap(); //Sending a request for the updated map
	}
}

var endRequest;

function endTurn() //This function is run when the user ends the tiurn
{
	//Sending data about new buildings created this turn
	var endTurnRequest = "type=r_endTurn&buildings=";
	for(var i = 0; i < getTurnBuildingAmount(); i++)
	{
		var turnBuilding = getTurnBuildingAt(i);
		endTurnRequest += "type=" + turnBuilding.type + ",";
		endTurnRequest += "xPos=" + turnBuilding.x + ",";
		endTurnRequest += "yPos=" + turnBuilding.y;

		endTurnRequest += "|";
	}

	endTurnRequest += "&createUnits=";
	for(var i = 0; i < turnUnits.length; i++)
	{
		endTurnRequest += "type=" + turnUnits[i].type + ",";
		endTurnRequest += "xPos=" + turnUnits[i].tileX + ",";
		endTurnRequest += "zPos=" + turnUnits[i].tileZ + ",";

		endTurnRequest += "|";
	}
	console.log(endTurnRequest);

	//Sending that data
	endRequest = createRequest("requests.php", endTurnRequest, function(response){
		console.log(response);

		//Sending a request for the updated map
		requestMap();
	});

	//Clearing buildings constructed this turn
	for(var i = 0; i < turnBuildings.length; i++)
	{
		scene.remove(turnBuildings[i].object);
	}

	turnBuildings = Array();

	clearTurnUnits();

	gameState = 2;
}

function exitGame()
{
	closeRequest = createRequest("requests.php", "type=r_exit", function(data){});

	request = new XMLHttpRequest();

	request.open("POST", "requests.php", false);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send("type=r_exit");

	request.onreadystatechange = function()
	{
		if(this.readyState == 4) //If the response is ready
		{
			respond(this.responseText);
		}
	}

	//Saving the request
	requests[requests.length] = 
	{
		request: request,

		onFinished: onFinished
	};

	return NULL;
}