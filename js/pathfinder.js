function nodeProt(xPos, zPos, parentX, parentZ)
{
	this.parentX = parentX
	this.parentZ = parentZ;
	this.xPos = xPos;
	this.zPos = zPos;
}

function findPath(startX, startZ, targetX, targetZ) //Will find the shortest path to a target using a flood fill method
{
	var openTiles = Array();
	var closedTiles = Array();
	openTiles[0] = new nodeProt(startX, startZ, -1, -1);

	var currentX;
	var currentZ;

	var foundGoal = false;
	//While there are still open tiles
	while(openTiles.length != 0)
	{
		//Selecting the next tile to explore
		currentX = openTiles[0].xPos;
		currentZ = openTiles[0].zPos;

		var neighbours = getNeighbours(currentX, currentZ);
	
		for(var i = 0; i < neighbours.length; i++) //Going thru all the neighbours
		{
			//Making sure the tile is within the edges of the map
			if(neighbours[i].x >= 0 && neighbours[i].y >= 0 && neighbours[i].x < grid.length && neighbours[i].y < grid[neighbours[i].x].length)
			{
				//Checking if the neighbour is walkable and visible
				if(grid[neighbours[i].x][neighbours[i].y].walkable == true && grid[neighbours[i].x][neighbours[i].y].visible != 0)
				{
					var onList = false;
					//Checking if the tile is already on the closed list
					for(var n = 0; n < closedTiles.length; n++)
					{
						if(closedTiles[n].xPos == neighbours[i].x && closedTiles[n].zPos == neighbours[i].y)
						{
							onList = true;
						}
					}
					//Checking if its on the closed list aswell
					for(var n = 0; n < openTiles.length; n++)
					{
						if(openTiles[n].xPos == neighbours[i].x && openTiles[n].zPos == neighbours[i].y)
						{
							onList = true;
						}
					}

					if(onList == false)
					{
						//It wasn't on the list, add it to the open list
						openTiles[openTiles.length] = new nodeProt(neighbours[i].x, neighbours[i].y, currentX, currentZ);
					}
				}
			}
		}

		//The neighbours have been added to the list and we are done with the current node, close it
		closedTiles[closedTiles.length] = openTiles[0];

		openTiles.splice(0, 1); //Removing the current node from the open list

		//If the current tile was the goal
		if(currentX == targetX && currentZ == targetZ)
		{
			foundGoal = true;

			break; //Exit the loop since the goal has been found
		}
	}

	//Recreating the path
	var path = Array();

	var foundStart = false;

	var currentX = targetX;
	var currentZ = targetZ;
	while(foundStart == false)
	{
		if(currentX == -1) //Found the last node, done
		{
			foundStart = true;

			break;
		}
		//Finding the current node
		var foundNode = false;
		var parentIndex = 0;
		for(var i = 0; i < closedTiles.length; i++)
		{
			if(closedTiles[i].xPos == currentX && closedTiles[i].zPos == currentZ)
			{
				foundNode = true;
				parentIndex = i;
				//We found the node, abort the search
				break;
			}
		}

		if(foundNode == false)
		{
			//Clearing the path
			path = Array();
			break; //Something went wrong, abort
		}

		//Add that node to the path
		path[path.length] = {
			xPos: currentX,
			zPos: currentZ
		}

		currentX = closedTiles[parentIndex].parentX;
		currentZ = closedTiles[parentIndex].parentZ;
	}

	return path;
}

function tileProt(x, z, steps)
{
	this.xPos = x;
	this.zPos = z;
	this.steps = steps;
}

function floodFill(startX, startZ, steps) //Uses a flood fill to check which tiles can be reached from the startX,startY tiles. Returns an array with all the tiles that can be reached
{
	var openList = Array();
	var closedList = Array();

	//Adding the start node
	openList[0] = new tileProt(startX, startZ, 0);

	while(openList.length > 0)
	{
		var currentX = openList[0].xPos;
		var currentZ = openList[0].zPos;
		var currentStep = openList[0].steps;

		//If the maximum number of steps has not been reached
		if(currentStep < steps)
		{
			//Getting the neighbours of the current tile
			var neighbours = getNeighbours(currentX, currentZ);

			for(var n = 0; n < neighbours.length; n++)
			{
				nX = neighbours[n].x;
				nZ = neighbours[n].y;

				//Making sure the tiles are within bounts
				if(nX >= 0 && nZ >= 0 && nX < grid.length)
				{
					//Checking if the neighbour is walkable and visible
					if(grid[nX][nZ].walkable == true && grid[nX][nZ].visible != 0)
					{
						if(nZ < grid[nX].length)
						{
							//Making sure the tile is not on a list already
							var onList = false;
							for(var i = 0; i < openList.length; i++)
							{
								if(openList[i].xPos == nX && openList[i].zPos == nZ)
								{
									onList = true;
								}
							}
							for(var i = 0; i < closedList.length; i++)
							{
								if(closedList[i].xPos == nX && closedList[i].zPos == nZ)
								{
									onList = true;
								}
							}

							if(onList == false) //Add it to the open list
							{
								//Add the neighbour to the open list
								openList[openList.length] = new tileProt(nX, nZ, currentStep + 1);
							}
						}
					}
				}
			}
		}

		//This node has been checked, put it on the closed list
		closedList[closedList.length] = openList[0];
		openList.splice(0, 1);
	}

	return closedList;
}