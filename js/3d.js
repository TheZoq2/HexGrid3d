var scene;
var camera;
var renderer;

var stats;

var cameraX = 1;
var cameraZ = 1;

var tileHeight = 2;
var tileWidth = Math.sqrt(3.0) / 2.0 * tileHeight;

var skylight;

function setup3d()
{
	container = document.getElementById("canvasContainer");

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	//Enabeling shadows
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = false;

	renderer.shadowCameraNear = 0.01;
	renderer.shadowCameraFar = camera.far;
	renderer.shadowCameraFov = 50;

	renderer.shadowMapBias = 0.0039;
	renderer.shadowMapDarkness = 1.0;
	renderer.shadowMapWidth = 4096;
	renderer.shadowMapHeight = 4096;

	//FPS counter
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '50px';
	container.appendChild( stats.domElement );

	//Starting the renderer. The render function will repeat 60 times per second (hopefully)
	render();

	camera.position.x = 5;
	camera.position.z = 10;
	camera.position.y = 3;
	camera.rotation.x = -Math.PI / 3;
	//camera.rotation.y = Math.PI;

	skylight = new THREE.DirectionalLight(0xffffff, 2);
	skylight.position.set(40, 20, 80);
	skylight.target.position.set(40, 0, 40);

	skylight.castShadow = true;
	skylight.shadowMapSoft = true;
	skylight.shadowDarkness = 0.8;
	skylight.shadowCameraNear = 1;
	skylight.shadowCameraFar = 100;
	skylight.shadowCameraLeft = -40;
	skylight.shadowCameraRight = 50;
	skylight.shadowCameraTop = 25;
	skylight.shadowCameraBottom = -25;
	skylight.shadowCameraVisible = true;

	skylight.shadowMapWidth = 2048;
	skylight.shadowMapHeight = 2048;
	scene.add(skylight);
}

var defaultTextureMaterial;
var groundObject;

function load3d()
{

//Loading objects
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};

	loadColada();

	loadBuildings();

	//loader.load("3d/Hexagon.ply");

	//Creating a default material that is big enough to allow tiles to use tectures
	var texture = THREE.ImageUtils.loadTexture("img/Ground.png");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1, 1);
	defaultTextureMaterial = new THREE.MeshPhongMaterial( {map: texture} );

	//Creating materials
	for(var i = 0; i < tileData.length; i++)
	{
		var texture = THREE.ImageUtils.loadTexture(tileData[i].image);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 1);
		tileData[i].material = new THREE.MeshPhongMaterial( {map: texture} );
	}

	loadHighlighter();

	render();
}
function createTileObjects()
{
	//defaultTextureMaterial = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
	//Creating objects for all tiles
	for(var x = 0; x < grid.length; x++)
	{
		for(var z = 0; z < grid[x].length; z++)
		{
			
			//Creating a plane for the grid
			//geometry = new THREE.PlaneGeometry(1, 1);
			var geometry = groundObject.geometry;

			//grid[x][z].object = new THREE.Mesh( geometry, defaultTextureMaterial);
			grid[x][z].object = new THREE.Mesh(geometry.clone(), defaultTextureMaterial);

			//Calculating the postion of the hexes

			var xOffset = 0;
			//Calculating the offset on the x axis
			if(z % 2 == 1)
			{
				xOffset = tileWidth / 2;
			}
			var xCoord = x * tileWidth + xOffset;
			var zCoord = z * tileHeight * 3/4;


			grid[x][z].object.position.x = xCoord;
			grid[x][z].object.position.z = zCoord;
			//grid[x][z].object.position.y = 1;
			grid[x][z].object.rotation.x = -Math.PI;
			grid[x][z].object.rotation.y = Math.PI / 2;

			scene.add(grid[x][z].object);
		}
	}
}

function setGroundMaterial(posX, posY)
{
	grid[posX][posY].object.material = tileData[grid[posX][posY].type].material;
	grid[posX][posY].object.receiveShadow = true;
}

function render()
{
	//Calculating the position of the camera //Defined in input.js
	cameraX = lookingAtX;
	cameraY = cameraHeight;
	cameraZ = lookingAtZ - Math.tan(camera.rotation.x) * cameraHeight;

	//Updating the camera position
	camera.position.x = cameraX;
	camera.position.y = cameraY;
	camera.position.z = cameraZ;

	requestAnimationFrame(render);
	renderer.render(scene, camera);

	if(groundObject)
	{
		//groundObject.rotation.x += 0.1;
		groundObject.rotation.x = -Math.PI / 2;
	}

	if(grid)
	{
		for(var x = 0; x < grid.length; x++)
		{
			for(var z = 0; z < grid[x].length; z++)
			{
				if(grid[x][z].object != 0)
				{
					//grid[x][z].object.rotation.x += 0.1;
				}
			}
		}
	}

	stats.update();
}

function loadColada()
{
	var objects = Array();


	var IDBeingLoaded = 3; //I want to pass this to the function

	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( '3d/Hexagon.dae', function ( collada ) {

		var dae = collada.scene;
		skin = collada.skins[ 0 ];

		dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
		dae.updateMatrix();

		groundObject = new THREE.Mesh(dae.children[2].geometry.clone(), defaultTextureMaterial)
		//groundObject = dae.children[2];
		

		//The object has been loaded, create ground from it
		createTileObjects();

		//Then use that to store the object
		objects[IDBeingLoaded] = groundObject;
	} );
}

function loadBuildings()
{
	for(var i = 0; i < buildingData.length; i++)
	{
		loadBuilding(buildingData[i].objectPath, i);
	}
}

function loadBuilding(fileame, index) //Loads the model with the filename and inserts it into the buidlingData array
{
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( buildingData[index].objectPath, function ( collada ) {

		var dae = collada.scene;
		skin = collada.skins[ 0 ];

		dae.scale.x = dae.scale.y = dae.scale.z = 1;
		dae.updateMatrix();

		buildingData[index].object  = dae;
		buildingData[index].object.scale.x = buildingData[index].scaleX;
		buildingData[index].object.scale.y = buildingData[index].scaleY;
		buildingData[index].object.scale.z = buildingData[index].scaleZ;

		children = getObjectChildren(buildingData[index].object);
		for(var i = 0; i < children.length; i++)
		{
			children[i].castShadow = true;
			children[i].receiveShadow = true;
		}
	} );
}

function setGroupMaterial(object, material) //Set the material of a group (which is what is loaded with the collada loader)
{
	if(object)
	{
		var children = getObjectChildren(object);

		for(var i = 0; i < children.length; i++)
		{
			children[i].material = material;
		}
	}
}
function hideObject(object)
{
	if(object)
	{
		var children = getObjectChildren(object);

		for(var i = 0; i < children.length; i++)
		{
			children[i].visible = false;
		}
	}
}
function showObject(object)
{
	var children = getObjectChildren(object);

	for(var i = 0; i < children.length; i++)
	{
		children[i].visible = true;
	}
}

function getObjectChildren(object)
{
	var result = Array();

	var children = Array();
	children[0] = object;

	//Looking thru all current children
	while(children.length != 0)
	{
		//Adding this childs children
		for(var i = 0; i < children[0].children.length; i++)
		{
			children[children.length] = children[0].children[i];
		}

		result[result.length] = children[0];

		//Removing this one
		children.splice(0, 1);
	}

	return result;
}

var cursorObject = 0;
var cursorLight = 0;
function setCursorObject(object)
{
	scene.remove(cursorObject);
	cursorObject = object;
	scene.add(cursorObject);
	cursorObject.position.x = 0;
	cursorObject.position.y = 0;
	cursorObject.position.z = 0;

	material = new THREE.MeshPhongMaterial({color: 0x00ff00, ambient: 0x444444})
	setGroupMaterial(cursorObject, material);
}
function setCursorObjectPos(x, y, z)
{
	if(cursorObject != 0)
	{
		cursorObject.position.x = x;
		cursorObject.position.y = y;
		cursorObject.position.z = z;
	}
}
function removeCursorObject()
{
	scene.remove(cursorObject);
}

function screenTo3d(x, y, yPlane)
{
	projector = new THREE.Projector();
	var vector = new THREE.Vector3(
	    ( x / window.innerWidth ) * 2 - 1,
	    - ( y / window.innerHeight ) * 2 + 1,
	    0.5 );

	projector.unprojectVector( vector, camera );

	var dir = vector.sub( camera.position ).normalize();

	var distance = - camera.position.y / dir.y;

	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
	return pos;
}

function getPointAt2d(object, targetX, targetZ) //Returns the angle that the object should be rotated at on the y-axis to point at a target on the y plane
{
	var posX = object.position.x;
	var posZ = object.position.z;

	var diffX = targetX - posX;
	var diffZ = - targetZ + posZ; //Since 3d goes from top to bottom, the positions are inverted...

	var angle = Math.atan2(diffZ, diffX) //Z-X because aTan is inverted in JS

	return angle;
}