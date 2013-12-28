<?php
	class Tile
	{
		public $type;

		public function __construct()
		{
		}
		public function setType($type)
		{
			$this->type = $type;
		}
		public function getType()
		{
			return $this->type;
		}
	}
	class BuildingBase
	{
		public $food;
		public $oil;
		public $metal;
		public $crystal;

		public $sightRange;

		function __construct($oil, $food, $metal, $crystal)
		{
			$this->food = $food;
			$this->oil = $oil;
			$this->metal = $metal;
			$this->crystal = $crystal;
		}

		public function getFood()
		{
			return $this->food;
		}
		public function getOil()
		{
			return $this->oil;
		}
		public function getMetal()
		{
			return $this->metal;
		}
		public function getCrystal()
		{
			return $this->crystal;
		}
		public function getSightRange()
		{
			return $this->sightRange;
		}

		public function setFood($food)
		{
			$this->food = $food;
		}
		public function setOil($oil)
		{
			$this->oil = $oil;
		}
		public function setMetal($metal)
		{
			$this->metal = $metal;
		}
		public function setCrystal($crystal)
		{
			$this->crystal = $crystal;
		}
		public function setSightRange($sightRange)
		{
			$this->sightRange = $sightRange;
		}
	}

	$buildings = array();

	$buildingData[0] = new BuildingBase(500, 1000, 1000, 50);
	$buildingData[0]->setSightRange(3);

	$buildingData[1] = new BuildingBase(0, 250, 30, 100);
	$buildingData[1]->setSightRange(2);

	$buildingData[2] = new BuildingBase(200, 200, 550, 350);
	$buildingData[2]->setSightRange(2);

	$buildingData[3] = new BuildingBase(300, 250, 300, 0);
	$buildingData[3]->setSightRange(2);

	if(isset($_SESSION["explored"]) == false)
	{
		//Checking the size of the map
		$_SESSION["explored"] = array();

		require_once("connect.php");
		$dbo = getDBO("map");
		
		$sqlRequest = "SELECT * FROM `base` WHERE 1";

		$stmt = $dbo->prepare($sqlRequest);
		$stmt->execute();
		$baseResult = $stmt->fetch();

		$sizeX = $baseResult["sizeX"];
		$sizeY = $baseResult["sizeY"];

		//creating a 2d array with those slots in them
		for($x = 0; $x < $sizeX; $x++)
		{
			$_SESSION["explored"][$x] = array();
			for($y = 0; $y < $sizeY; $y++)
			{
				$_SESSION["explored"][$x][$y] = 0; //Will be 0 for unseen, 1 for revelaed and 2 for visible
			}
		}
	}

	function generateMap($sizeX, $sizeY)
	{
		$map = Array();
		
		for($y = 0; $y < $sizeY; $y++)
		{
			$map[$y] = Array();
			for($x = 0; $x < $sizeX; $x++)
			{
				$map[$y][$x] = new Tile;

				if(rand(0,20) == 1)
				{
					$map[$y][$x]->setType(2);
				}
				elseif(rand(0, 20) == 1)
				{
					$map[$y][$x]->setType(3);
				}
				else
				{
					$map[$y][$x]->setType(1);
				}
			}
		}
		//Database
		require_once "connect.php";

		$dbh = getDBO("map");

		//Saving base map data
		$sqlRequest = "UPDATE `base` SET `index`=1,`sizeX`=" . $sizeX . ",`sizeY`=" . $sizeY . " WHERE `index`=1";

		$stmt = $dbh->prepare($sqlRequest);
		$stmt->execute();

		$cID = 1;

		//$sqlRequest = "UPDATE `tile` SET `posX`=:posX,`posY`=:posY,`type`=:type WHERE `id`=:ID;";
		//$stmt = $dbh->prepare($sqlRequest);

		//Deleting the tile table
		$sqlRequest = "DELETE FROM `tile` WHERE 1";
		$stmt = $dbh->prepare($sqlRequest);

		$sqlRequest = "INSERT INTO `tile`(`posX`, `posY`, `type`) VALUES (:x,:y,:type)";

		for($y = 0; $y < $sizeY; $y++)
		{
			for($x = 0; $x < $sizeX; $x++)
			{
				$type = $map[$x][$y]->getType();
				$ID = $cID;
				
				/*
				//Setting the parameters for the SQL request
				$stmt->bindParam(":type", $ID);
				$stmt->bindParam(":ID", $ID);
				$stmt->bindParam(":posX", $x);
				$stmt->bindParam(":posY", $y);

				$stmt->execute();
				*/

				//$sqlRequest = "UPDATE `tile` SET `posX`=:x,`posY`=:y,`type`=:type WHERE `id`=:cID;";
				$stmt = $dbh->prepare($sqlRequest);
				$stmt->bindParam(":x", $x);
				$stmt->bindParam(":y", $y);
				$stmt->bindParam(":type", $type);
				//$stmt->bindParam(":cID", $cID);
				$stmt->execute();

				$cID++;
			}
		}
	}

	function printMap()
	{
		require_once "connect.php";
		

		$dbh = getDBO("map");
		$sqlRequest = "SELECT * FROM `base` WHERE 1";


		$stmt = $dbh->prepare($sqlRequest);
		$stmt->execute();

		$base = $stmt->fetch();
		
		$sizeX = $base["sizeX"];
		$sizeY = $base["sizeY"];

		$map = array();
		for($y = 0; $y < $sizeY; $y++)
		{
			$map[$y] = array();
			for($x = 0; $x < $sizeX; $x++)
			{
				$map[$y][$x] = new Tile;

				//$map[$x][$y] = 5;
			}
		}

		$sqlRequest = "SELECT * FROM `tile` WHERE 1";

		$stmt = $dbh->prepare($sqlRequest);
		$stmt->execute();

		$tiles = $stmt->fetchAll();
		//print_r($map[2][0]);

		foreach($tiles as $tile)
		{
			$posX = $tile["posX"];
			$posY = $tile["posY"];

			if($posX >= 0 && $posX < $sizeX && $posY >= 0 && $posY < $sizeY)
			{
				$map[ $posX ][ $posY ]->setType($tile["type"]);
			}
		}
	}
?>