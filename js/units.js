var unitBase = Array();
var units = Array();
var turnUnits = Array();

function unitBaseProt(objName, speed, moverange)
{
	this.objName = objName,
	this.object = 0;
	this.material = 0;

	this.speed = speed;
	this.moverange = moverange;

	this.scaleX = 0.3;
	this.scaleY = 0.3;
	this.scaleZ = 0.3;

	this.name = "";

	//functions
	this.loadObject = function(storeID) //ID is the ID of this object and is used for storing the object when it has been loaded
	{
		var objName = this.objName;

		var scaleX = this.scaleX;
		var scaleY = this.scaleY;
		var scaleZ = this.scaleZ;

		var ID = storeID;
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load( objName, function ( collada ) {

			var dae = collada.scene;
			skin = collada.skins[ 0 ];

			dae.scale.x = scaleX;
			dae.scale.y = scaleY;
			dae.scale.z = scaleZ;
			dae.updateMatrix();

			var material = new THREE.MeshPhongMaterial({color: 0x777777});

			var children = getObjectChildren(dae)
			for(var i = 0; i < children.length; i++)
			{
				children[i].castShadow = true;
				children[i].recieveShadow = true;

				children[i].material = material;
			}

			//Storing the object
			unitBase[ID].setObject(dae);
		} );
	}
	this.setObject = function(object)
	{
		this.object = object;
	}
}
function unitProt(type, tileX, tileZ)
{
	this.id = 0;
	this.type = type;
	this.owner = "";
	this.health = 0;
	this.path = Array();

	this.movesLeft = unitBase[type].moverange;
	this.movedThisTurn = false;

	this.object = unitBase[type].object.clone();
	this.tileX = tileX;
	this.tileY = 0;
	this.tileZ = tileZ;
	this.targetX = tileX;
	this.targetZ = tileZ;

	this.x = coordFromHexX(tileX, tileZ);
	this.y = 0;
	this.z = coordFromHexY(tileX, tileZ);

	this.angleY = 0;

	this.object.position.x = this.x;
	this.object.position.y = this.y;
	this.object.position.z = this.z;

	this.object.rotation.y = this.angleY;

	this.setPosition = function(tileX, tileZ)
	{
		this.tileX = tileX;
		this.tileY = 0;
		this.tileZ = tileZ;

		this.x = coordFromHexX(tileX, tileZ);
		this.y = 0;
		this.z = coordFromHexY(tileX, tileZ);

		this.object.position.x = this.x;
		this.object.position.y = this.y;
		this.object.position.z = this.z;
	}
	this.setRealPos2d = function (x, z)
	{
		this.x = x;
		this.z = z;

		this.tileX = hexFromCordX(x, z);
		this.tileZ = hexFromCordY(x, z);

		this.object.position.x = x;
		this.object.position.z = z;
	}
	this.setAngleY = function(angleY)
	{
		this.angleY = angleY;
		this.object.rotation.y = angleY;
	}
	this.setPath = function(path)
	{
		this.path = path;
	}

	this.setMaterial = function(material)
	{
		var children = getObjectChildren(this.object)
		for(var i = 0; i < children.length; i++)
		{
			children[i].castShadow = true;

			children[i].material = material;
		}
	}

	var material = new THREE.MeshPhongMaterial({color: 0x777777});
	this.setMaterial(material);
	//Adding the object
	scene.add(this.object);
}

var selUnit = -1; //The unit that is currently selected
function unitInput()
{
	//Checking what tile the user is hovering over
	var tileX = hexFromCordX(mouseX3d, mouseZ3d);
	var tileZ = hexFromCordY(mouseX3d, mouseZ3d);

	//Checking if a user is in that tile
	if(mouseClick == true)
	{
		var unitSelected = false;
		for(var i = 0; i < units.length; i++)
		{
			if(units[i].tileX == tileX && units[i].tileZ == tileZ && units[i].owner == player)
			{
				unitSelected = true;

				selUnit = i;
			}
		}
		if(unitSelected == false)
		{
			selUnit = -1;
		}
	}

	if(selUnit != -1)
	{
		//Highlighting all the tiles that the unit can walk to
		walkRange = units[selUnit].movesLeft;

		var walkables = floodFill(units[selUnit].tileX, units[selUnit].tileZ, walkRange);

		for(var i = 0; i < walkables.length; i++)
		{
			highlight(walkables[i].xPos, walkables[i].zPos, 0x00ffff);
		}
	}
	if(rightClick == true && selUnit != -1) //Moving the selected unit when the user right clicks
	{
		//Checking if the unit is already going there
		if(tileX != units[selUnit].targetX || tileZ != units[selUnit].targetZ)
		{
			path = findPath(units[selUnit].tileX, units[selUnit].tileZ, tileX, tileZ);
			//Making sure the path isn't to long
			if(path.length <= units[selUnit].movesLeft + 1) //+1 because the start tile is in the path
			{
				units[selUnit].setPath(path);

				units[selUnit].targetX = tileX;
				units[selUnit].targetZ = tileZ;

				if(path.length > 0)
				{
					units[selUnit].movesLeft -= path.length - 1;

					units[selUnit].movedThisTurn = true;
				}
			}
		}
	}
}
function updateUnits()
{
	for(var i = 0; i < units.length; i++)
	{
		if(units[i].path.length > 0) //If the unit has a path
		{
			var pathIndex = path.length - 1;
			targetWorldX = coordFromHexX(units[i].path[pathIndex].xPos, units[i].path[pathIndex].zPos);
			targetWorldZ = coordFromHexY(units[i].path[pathIndex].xPos, units[i].path[pathIndex].zPos);
			//Pointing the unit at the target
			var angle = getPointAt2d(units[i].object, targetWorldX, targetWorldZ)

			units[i].setAngleY(angle + Math.PI / 2);

			//Moving the unit forward
			var speed = unitBase[units[i].type].speed;

			var xAmount = Math.cos(angle) * speed * speedMod;
			var zAmount = - Math.sin(angle) * speed * speedMod;

			var newX = units[i].x + xAmount;
			var newZ = units[i].z + zAmount;

			//Checking if the target has been reached
			if(Math.abs(newX - targetWorldX) < speed * speedMod * 0.5 && Math.abs(newZ - targetWorldZ) < speed * speedMod * 0.5)
			{
				units[i].path.splice(pathIndex, 1);
			}

			units[i].setRealPos2d(newX, newZ);
		}
	}
}