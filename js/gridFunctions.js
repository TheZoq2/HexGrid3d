var highlighted = Array(); //contains all tiles that are highlighted

var highlightObject;
function loadHighlighter()
{
	//Creating a default material that is big enough to allow tiles to use tectures
	var texture = THREE.ImageUtils.loadTexture("img/TileBorder.png");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(1, 1);

	var highlightMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map:texture, opacity: 1.0, transparent: true})

	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( '3d/Hexagon.dae', function ( collada ) {

		var dae = collada.scene;
		skin = collada.skins[ 0 ];

		dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
		dae.updateMatrix();

		highlightObject = new THREE.Mesh(dae.children[2].geometry.clone(), highlightMaterial)
		highlightObject.position.y = 0.01;
		highlightObject.rotation.x = -Math.PI;
		highlightObject.rotation.y = Math.PI / 2;
	} );
}

function highlightProt(x, z, object)
{
	this.x = x;
	this.z = z;
	this.object = object;

	this.remove = function()
	{
		scene.remove(object);
	}
}

function highlight(x, z, color)
{
	object = highlightObject.clone();

	object.material.color.setHex(color);

	//Checking where the object should be placed
	xPos = coordFromHexX(x, z);
	zPos = coordFromHexY(x, z);

	object.position.x = xPos;
	object.position.z = zPos;

	//Adding the object to the scene
	scene.add(object);

	highlighted[highlighted.length] = new highlightProt(x, z, object)
}

function resetHighlights()
{
	for(var i = 0; i < highlighted.length; i++)
	{
		highlighted[i].remove();
	}

	highlighted = Array();
}