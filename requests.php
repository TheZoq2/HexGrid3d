<?php
	class Building
	{
		public function __construct($type, $x, $y)
		{
			$this->type = $type;
			$this->x = $x;
			$this->y = $y;
		}

		public function printData()
		{
			echo ("Type: " . $this->type . " xPos" . $this->x . " yPos ". $this->y);
		}

		public function getType()
		{
			return $this->type;
		}
		public function getX()
		{
			return $this->x;
		}
		public function getY()
		{
			return $this->y;
		}

		private $type;
		private $x;
		private $y;
	}

	class Unit
	{
		public function __construct($type, $x, $z)
		{
			$this->type = $type;
			$this->x = $x;
			$this->z = $z;
		}

		public function getType()
		{
			return $this->type;
		}
		public function getX()
		{
			return $this->x;
		}
		public function getZ()
		{
			return $this->z;
		}
		public function getHealth()
		{
			return $this->health;
		}

		private $type;
		private $x;
		private $z;
		private $health;
	}

	session_start();

	updateLastAcitivity();
	
	if(isset($_POST["type"]))
	{
		if($_POST["type"] == "r_turnData")
		{
			//Checking which player should make the turn
			if(getLastPlayerExists() == false)
			{
				selectNextPlayer();
			}


			require_once("connect.php");
			$dbo = getDBO("map");
			$sqlRequest = "SELECT * FROM `base` WHERE 1";
			$stmt = $dbo->prepare($sqlRequest);
			$stmt->execute();

			$result = $stmt->fetch();
			if($result["currentTurn"] == $_SESSION["Player"])
			{
				echo "makeTurn"; //Tell the client that its its turn
			}
			checkPlayersActive();

			exit();
		}
		if($_POST["type"] == "r_mapData")
		{
			returnMapData();
			exit();
		}
		if($_POST["type"] == "r_buildingData")
		{
			returnBuildingData();

			exit();
		}
		if($_POST["type"] == "r_resourceData")
		{
			returnResourceData();
			exit();
		}
		if($_POST["type"] == "r_endTurn")
		{
			handleEndTurnRequest();

			exit(); //Exiting the PHP code since the request has been taken care of
		}
		if($_POST["type"] == "r_exit")
		{
			//Removing the player from the database
			removePlayer($_SESSION["Player"]);

			unset($_SESSION["Player"]);

			exit();
		}
		if($_POST["type"] == "r_unitData")
		{
			returnUnitData();
			exit();
		}
	}

	echo "error_noType";

	function updateLastAcitivity()
	{
		$time = time();

		require_once("connect.php");

		$sqlRequest = "UPDATE `players` SET `lastActive`=:time WHERE `Name`=:name";
		$dbo = getDBO("map");
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":name", $_SESSION["Player"]);
		$stmt->bindParam(":time", $time);
		$stmt->execute();
	}

	function createBuilding($posX, $posY, $type)
	{
		//Connecting to the database
		require_once("connect.php");

		$dbo = getDBO("map");

		//Creating an SQL request
		$sqlRequest = "INSERT INTO `buildings`(`id`, `posX`, `posY`, `type`) VALUES ('',:posX,:posY,:type)";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":posX", $posX);
		$stmt->bindParam(":posY", $posY);
		$stmt->bindParam(":type", $type);
		$stmt->execute();
	}
	function createUnit($posX, $posY, $type, $health)
	{
		require_once("connect.php");

		$dbo = getDBO("map");
		$sqlRequest = "INSERT INTO `units`(`type`, `x`, `z`, `health`) VALUES (:type;:posX,:posY,:health)";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":type", $type);
		$stmt->bindParam(":posX", $posX);
		$stmt->bindParam(":posY", $posY);
		$stmt->bindParam(":health", $health);
		$stmt->execute();
	}

	function returnMapData()
	{
		require_once("map.php");

		//Connecting to the map database
		require_once("connect.php");
		$dbo = getDBO("map");

		//Getting the basic info about the map
		$sqlRequest = "SELECT * FROM `base` WHERE 1";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->execute();

		$data = $stmt->fetch();
		//Saving the data about the map
		$sizeX = $data["sizeX"];
		$sizeY = $data["sizeY"];

		//Requesting the actual map data
		$sqlRequest = "SELECT * FROM `tile` WHERE 1";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->execute();

		$mapData = $stmt->fetchAll();

		$map = array();
		for($x = 0; $x < $sizeX; $x++)
		{
			$map[$x] = array();
		}

		//Going though the data
		foreach ($mapData as $tile) 
		{
			$map[$tile["posX"]][$tile["posY"]] = new Tile();
			$map[$tile["posX"]][$tile["posY"]]->setType($tile["type"]);
		}

		//Creating a string with the data to return
		$responseString = "";

		//Adding the base data
		$responseString .= "sizeX=" . $sizeX;
		$responseString .= ",sizeY=" . $sizeY;

		for($x = 0; $x < $sizeX; $x++)
		{
			for($y = 0; $y < $sizeY; $y++)
			{
				$responseString .= "|";
				$responseString .= "posX=" . $x;
				$responseString .= ",posY=". $y;
				$responseString .= ",type=". $map[$x][$y]->getType();

				//Checking if the map is revealed
				if(isset($_SESSION["explored"][$x][$y]))
				{
					$revealed = $_SESSION["explored"][$x][$y];

					$responseString .=",explored=" . $revealed;
				}
			}
		}

		echo $responseString; //Returning the string
	}

	function returnBuildingData()
	{
		//Connecting to the database
		require_once "connect.php";
		$dbo = getDBO("map");

		//Getting the content of the building table
		$sqlRequest = "SELECT * FROM `buildings` WHERE 1";

		$stmt = $dbo->prepare($sqlRequest);
		$stmt->execute();

		$buildings = $stmt->fetchAll();

		$responseString = "";

		foreach ($buildings as $building) {
			$posX = $building["posX"];
			$posY = $building["posY"];
			$type = $building["type"];

			//Adding the building to the response string
			$responseString .="posX=" . $posX;
			$responseString .=",posY=" . $posY;
			$responseString .=",type=" . $type;
			$responseString .="|";
		}

		echo $responseString;

		exit(); //The request has been awnsered, return
	}

	function returnResourceData()
	{
		$result = "";

		//Fetching the data from the server
		require_once("connect.php");
		$dbo = getDBO("map");

		$sqlRequest = "SELECT * FROM `players` WHERE `Name`=:name";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":name", $_SESSION["Player"]);
		$stmt->execute();
		$sqlResult = $stmt->fetch();



		$result .= "food=" . $sqlResult["food"]. ",";
		$result .= "metal=" . $sqlResult["metal"]. ",";
		$result .= "oil=" . $sqlResult["oil"] . ",";
		$result .= "crystal=" . $sqlResult["crystal"];

		echo $result;
	}
	function returnUnitData()
	{
		//Connecting to the database to fetch the unit data
		require_once("connect.php");

		$dbo = getDBO("map");

		$sqlRequest = "SELECT * FROM `units` WHERE 1";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->execute();
		$units = $stmt->fetchAll();

		//Create a datastring to send back
		$response = "";

		foreach($units as $unit)
		{
			//Adding the unit data
			$response .= "ID=" . $unit["ID"] . ",";
			$response .= "type=" . $unit["type"] . ",";
			$response .= "x=" . $unit["x"] . ",";
			$response .= "z=" . $unit["z"] . ",";
			$response .= "health" . $unit["health"] . ",";
			$response .= "owner" . $unit["owner"];

			$response .= "|";
		}

		//Returning the string
		echo $response;
	}

	function handleEndTurnRequest()
	{
		//Data about buildings is sent as a string where each building is separated by |. Each building part contains sevral data fields separated by ",".
		//The data has a datatype and a value separated by "="

		//Getting the buildings
		$buildingStr = $_POST["buildings"];

		//Spliting the building string into individual buildings
		$buildingStrings = explode("|", $buildingStr);

		//Variables to store the new building
		$newBuildings = array();

		$cBuilding = 0;
		foreach($buildingStrings as $thisStr) //Going thru each of the buildings
		{
			$dataStrings = explode(",", $thisStr);

			//Variables to store building data
			$bType = -1;
			$bX = 0;
			$bY = 0;

			foreach($dataStrings as $data)
			{
				//Spliting the string into datatype and value
				$dataArray = explode("=", $data);
				//Checking what kind of data this is
				$dataType = $dataArray[0];
				switch ($dataType) {
					case 'type':
						$bType = intval( $dataArray[1] );

						break;
					case 'xPos':
						$bX = intval($dataArray[1]);
						break;
					case 'yPos':
						$bY = intval($dataArray[1]);
						break;
					default:
						# code...
						break;
				}
			}

			if($bType != -1) //Making sure the type actually exists
			{
				$newBuildings[$cBuilding] = new Building($bType, $bX, $bY);

				//Revealing the surrounded area
				require_once("functions.php");

				require_once("data.php");

				exploreAround($bX, $bY, $buildingData[$bType]->getSightRange());
			}
			$cBuilding++;
		}

		//Preparing to send a request to the server
		require_once("connect.php");
		$dbo = getDBO("map");

		$sqlRequest = "INSERT INTO `buildings`(`id`, `posX`, `posY`, `type`, `owner`) VALUES ('',:xPos,:yPos,:type,:owner)";
		$stmt = $dbo->prepare($sqlRequest);

		require_once("data.php");
		$costSql = "UPDATE `players` SET `oil`=:oil,`crystal`=:crystal,`metal`=:metal,`food`=:food WHERE `Name`=:name";
		$costStmt = $dbo->prepare($costSql);
		$costStmt->bindParam(":name", $_SESSION["Player"]);
		//Looping through all the buildings
		foreach($newBuildings as $building)
		{
			$owner = $_SESSION["Player"];
			$type = $building->getType();
			$x = $building->getX();
			$y = $building->getY();
			$stmt->bindParam(":type", $type);
			$stmt->bindParam(":xPos", $x);
			$stmt->bindParam(":yPos", $y);
			$stmt->bindParam(":owner", $owner);

			//Removing the cost of the buildings
			$plrResources = getPlayerData($_SESSION["Player"]);

			$bData = $buildingData[$type];
			$oilCost = $plrResources["oil"] - $bData->getOil();
			$crystalCost = $plrResources["crystal"] - $bData->getCrystal();
			$metalCost = $plrResources["metal"] - $bData->getMetal();
			$foodCost = $plrResources["food"] - $bData->getFood();

			$costStmt->bindParam(":oil", $oilCost);
			$costStmt->bindParam(":crystal", $crystalCost);
			$costStmt->bindParam(":metal", $metalCost);
			$costStmt->bindParam(":food", $foodCost);
			$costStmt->execute();

			$stmt->execute();
		}


		//handeling units
		$unitStr = $_POST["createUnits"];
		$unitStrings = explode("|", $unitStr);
		$newUnits = array();

		foreach($unitStrings as $thisStr)
		{
			//splitting the string into the data
			$dataStrings = explode(",", $thisStr);

			//Variables to store the data in
			$uType = -1;
			$uX = 5;
			$uZ = 5;

			foreach($dataStrings as $data)
			{
				//Spliting the string into datatype and value
				$dataArray = explode("=", $data);
				//Checking what kind of data this is
				$dataType = $dataArray[0];
				switch ($dataType) {
					case 'type':
						$uType = intval( $dataArray[1] );

						break;
					case 'xPos':
						$uX = intval($dataArray[1]);
						break;
					case 'zPos':
						$uZ = intval($dataArray[1]);
						break;
					default:
						# code...
						break;
				}
			}

			if($uType != -1)
			{
				echo ("uType " . $uType);
				$newUnits[count($newUnits)] = new Unit($uType, $uX, $uZ);
			}
		}
		//Adding the new units to the database
		foreach($newUnits as $unit)
		{
			require_once("data.php"); //For the data
			require_once("functions.php"); //For exploring

			require_once("connect.php"); //To connect to the databse

			$dbo = getDBO("map");

			exploreAround($unit->getX(), $unit->getZ(), $unitData[$unit->getType()]->getSightRange());

			$type = $unit->getType();
			$x = $unit->getX();
			$z = $unit->getZ();
			$health = $unit->getHealth();

			//addind the unit to the database
			$sqlRequest = "INSERT INTO `units`(`type`, `x`, `z`, `health`, `owner`) VALUES (:type, :x, :z, :health, :owner)";
			$sqlRequest = "INSERT INTO `units`(`type`, `x`, `z`, `health`, `owner`) VALUES (:type, :x, :z, 0, :owner)";
			$stmt = $dbo->prepare($sqlRequest);
			$stmt->bindParam(":type", $type);
			$stmt->bindParam(":x", $x);
			$stmt->bindParam(":z", $z);
			//$stmt->bindParam(":health", $health);
			$stmt->bindParam(":owner", $_SESSION["Player"]);
			$stmt->execute();
		}

		//This would be a function, but today PHP decided to be special
		require_once("data.php");

		$dbo = getDBO("map");
		//Giving the player some money
		$sqlRequest = "SELECT * FROM `buildings` WHERE `owner`=:name";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":name", $_SESSION["Player"]);
		$stmt->execute();

		$result = $stmt->fetchAll();

		//getting the player
		$sqlRequest = "SELECT * FROM `players` WHERE `Name`=:name";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":name", $_SESSION["Player"]);
		$stmt->execute();

		$player = $stmt->fetch();

		$newOil = $player["oil"];
		$newMetal = $player["metal"];
		$newCrystal = $player["crystal"];
		$newFood = $player["food"];

		foreach ($result as $building) {
			//Checking the yeild of the building
			$type = $building["type"];

			if(isset($buildingData[$type]))
			{
				$newFood += $buildingData[$type]->getFoodGain();
				$newOil += $buildingData[$type]->getOilGain();
				$newMetal += $buildingData[$type]->getMetalGain();
				$newCrystal += $buildingData[$type]->getCrystalGain();
			}
		}

		//All buildings have been checked, update the player resources
		$sqlRequest = "UPDATE `players` SET `oil`=:oil,`crystal`=:crystal,`metal`=:metal,`food`=:food WHERE `Name`=:name";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":oil", $newOil);
		$stmt->bindParam(":crystal", $newCrystal);
		$stmt->bindParam(":metal", $newMetal);
		$stmt->bindParam(":food", $newFood);
		$stmt->bindParam(":name", $_SESSION["Player"]);

		$stmt->execute();

		selectNextPlayer();
	}

	function getPlayerData($name)
	{
		require_once("connect.php");
		$dbo = getDBO("map");

		$sqlRequest = "SELECT * FROM `players` WHERE `Name`=:name";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":name", $name);
		$stmt->execute();

		return $stmt->fetch();
	}

	function selectNextPlayer() //Selects the next player to make a turn
	{
		//Checking which player was making the last turn
		require_once("connect.php");
		$dbo = getDBO("map");
		$sqlRequest = "SELECT * FROM `base` WHERE 1";
		$stmt = $dbo->prepare($sqlRequest);

		$stmt->execute();
		$result = $stmt->fetch();

		$lastPlayer = $result["currentTurn"];

		//Getting the list of players
		$dbo = getDBO("map");
		$sqlRequest = "SELECT * FROM `players` WHERE 1 ORDER BY `ID`";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->execute();

		$players = $stmt->fetchAll();

		//Checking if the last player is part of the player list

		$lastExists = false;
		foreach($players as $player)
		{
			if($player["Name"] == $lastPlayer)
			{
				$lastExists = true;
			}
		}

		if($lastExists == false) //The last player does not exist anymore, give the turn to the first player
		{
			if(count($players))
			{
				setNextPlayer($players[0]["Name"]);
			}
		}
		else
		{
			//The player is still in the game, select the next player

			//Finding the index of the player
			$playerIndex = 0;
			for($i = 0; $i < count($players); $i++)
			{
				if($players[$i]["Name"] == $lastPlayer)
				{
					$playerIndex = $i;
				}
			}

			$nextIndex = $playerIndex + 1;
			if($nextIndex >= count($players)) //If there are more players after the current one
			{
				$nextIndex = 0; //Selelcting the first player in the list	
			}

			setNextPlayer($players[$nextIndex]["Name"]);
		}

	}

	function setNextPlayer($name)
	{
		require_once("connect.php");

		$dbo = getDBO("map");
		$sqlRequest = "UPDATE `base` SET `currentTurn`=:player WHERE 1";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":player", $name);
		$stmt->execute();
	}

	function removePlayer($name)
	{
		require_once("connect.php");

		//Getting the information about the player
		$dbo = getDBO("map");
		$infoSQL = "SELECT * FROM `players` WHERE `Name`=:name";
		$infoStmt = $dbo->prepare($infoSQL);
		$infoStmt->bindParam(":name", $name);
		$infoStmt->execute();
		$info = $infoStmt->fetch();

		//Saving that information in the 'oldPlayers' table
		$saveSQL = "INSERT INTO `oldplayers`(`Name`, `oil`, `crystal`, `metal`, `food`) VALUES (:name, :oil, :crystal, :metal, :food)";
		$saveStmt = $dbo->prepare($saveSQL);
		$saveStmt->bindParam(":name", $name);
		$saveStmt->bindParam(":oil", $info["oil"]);
		$saveStmt->bindParam(":crystal", $info["crystal"]);
		$saveStmt->bindParam(":metal", $info["metal"]);
		$saveStmt->bindParam(":food", $info["food"]);
		$saveStmt->execute();

		$sqlRequest = "DELETE FROM `players` WHERE `Name`=:name";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->bindParam(":name", $name);
		$stmt->execute();
	}

	function getLastPlayerExists()
	{
		//Connecting to the database
		//Checking which player was making the last turn
		require_once("connect.php");
		$dbo = getDBO("map");
		$sqlRequest = "SELECT * FROM `base` WHERE 1";
		$stmt = $dbo->prepare($sqlRequest);

		$stmt->execute();
		$result = $stmt->fetch();

		$lastPlayer = $result["currentTurn"];

		//Getting the list of players
		$dbo = getDBO("map");
		$sqlRequest = "SELECT * FROM `players` WHERE 1 ORDER BY `ID`";
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->execute();

		$players = $stmt->fetchAll();

		//Checking if the last player is part of the player list

		$lastExists = false;
		foreach($players as $player)
		{
			if($player["Name"] == $lastPlayer)
			{
				$lastExists = true;
			}
		}

		return $lastExists;
	}

	function checkPlayersActive()
	{
		$plrTimeout = 15; //If there has been no activity from a player for this amount of time, they will be removed from the game
		
		require_once("connect.php");
		//Fetching all the players
		$sqlRequest = "SELECT * FROM `players` WHERE 1";
		$dbo = getDBO("map");
		$stmt = $dbo->prepare($sqlRequest);
		$stmt->execute();
		$result = $stmt->fetchAll();

		$time = time();

		foreach($result as $player)
		{
			if($player["lastActive"] + $plrTimeout < $time)
			{
				//The player is inactive, remove them
				$sqlRequest = "DELETE FROM `players` WHERE `Name`=:name";
				$stmt = $dbo->prepare($sqlRequest);
				$stmt->bindParam(":name", $player["Name"]);
				$stmt->execute();

				//Checking if the player was making a turn
				$sqlRequest = "SELECT * FROM `base` WHERE 1";
				$stmt = $dbo->prepare($sqlRequest);
				$stmt->execute();
				$baseResult = $stmt->fetch();

				if($baseResult["currentTurn"] == $player["Name"])
				{
					selectNextPlayer();
				}
			}
		}
	}
	function playerExists()
	{
		$playerName = $_SESSION["Player"];

		require_once("connect.php");
		$dbo = getDBO("map");

		$sqlRequest = "SELECT * FROM `players` WHERE `Name`=:name";
	}
?>