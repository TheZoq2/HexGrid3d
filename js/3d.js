var scene;
var camera;
var renderer;

var stats;

var cameraX = 0;
var cameraZ = 0;

var tileHeight = 2;
var tileWidth = Math.sqrt(3.0) / 2.0 * tileHeight;

function setup3d()
{
	container = document.getElementById("canvasContainer");

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

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
}

var defaultTextureMaterial;
var groundObject;

function load3d()
{
	/*var whiteMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff});
	var whiteGemoetry = new THREE.PlaneGeometry( 100, 100 );
	var whitePlane = new THREE.Mesh( whiteGemoetry, whiteMaterial);
	whitePlane.position.y = -5;
	whitePlane.rotation.x = -Math.PI / 2;
	scene.add(whitePlane);*/

//Loading objects
	var manager = new THREE.LoadingManager();
	manager.onProgress = function ( item, loaded, total ) {

		console.log( item, loaded, total );

	};

/*
	var groundObject;
	var loader = new THREE.OBJLoader( manager );
	loader.load( '3d/Hexagon.obj', function ( object ) {

		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.map = texture;

			}

		} );

		groundObject = object;
	} );
*/
	//defaultTextureMaterial = new THREE.MeshBasicMaterial( {color: 0x00ffff} );

	loadColada();

	loadBuildings();
	/*var loader = new THREE.PLYLoader();
	loader.addEventListener( 'load', function ( event ) {

		var geometry = event.content;
		var mesh = new THREE.Mesh( geometry, defaultTextureMaterial );

		//mesh.position.set( 0, - 0.25, 0 );
		//mesh.rotation.set( 0, - Math.PI / 2, 0 );
		mesh.scale.set( 0.001, 0.001, 0.001 );

		mesh.castShadow = true;
		mesh.receiveShadow = true;

		groundObject = mesh;

		groundObject.position.x = 5;
		groundObject.position.y = 2;
		//scene.add(groundObject);
		//Running the function to set the objects for the tiles
		createTileObjects();
	} );

	loader.load("3d/Hexagon.ply");*/

	//Creating a default material that is big enough to allow tiles to use tectures
	var texture = THREE.ImageUtils.loadTexture("img/Ground.png");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1, 1);
	defaultTextureMaterial = new THREE.MeshBasicMaterial( {map: texture} );

	//Creating materials
	for(var i = 0; i < tileData.length; i++)
	{
		var texture = THREE.ImageUtils.loadTexture(tileData[i].image);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 1);
		tileData[i].material = new THREE.MeshBasicMaterial( {map: texture} );
	}

	render();
}
function createTileObjects()
{
	//defaultTextureMaterial = new THREE.MeshBasicMaterial( {color: 0x00ffff} );

	console.log("Starting to set objects");
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

	console.log("Set objects");
}

function setGroundMaterial(posX, posY)
{
	grid[posX][posY].object.material = tileData[grid[posX][posY].type].material;
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
	} );
}

function setGroupMaterial(object, material) //Set the material of a group (which is what is loaded with the collada loader)
{
	object.material = material;
	for(var i = 0; i < object.children.length; i++)
	{
		object.children[i].material = material.clone();
		for(var n = 0; n < object.children[i].children.length; n++)
		{
			object.children[i].children[n].material = material.clone();
		}
	}
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

	cursorLight = new THREE.PointLight( 0xFFFFFF, 2, 50 );
	cursorLight.position.x = 1;
	cursorLight.position.y = 1;
	cursorLight.position.z = 1;
	scene.add(cursorLight);

	material = new THREE.MeshBasicMaterial({color: 0x00ff00, ambient: 0x444444})
	setGroupMaterial(cursorObject, material);
}
function setCursorObjectPos(x, y, z)
{
	if(cursorObject != 0)
	{
		cursorObject.position.x = x;
		cursorObject.position.y = y;
		cursorObject.position.z = z;

		cursorLight.position.x = x;
		cursorLight.position.y = y;
		cursorLight.position.z = z;	
	}
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