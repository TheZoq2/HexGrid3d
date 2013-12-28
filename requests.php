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

	session_start();

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
		/*if($_POST["type"] == "r_buildBuilding"); //Creating a new building
		{
			$posX = intval($_POST["posX"]);
			$posY = intval($_POST["posY"]);
			$type = intval($_POST["type"]);

			createBuilding($posX, $posY, $type);

			//Exit the PHP file
			exit();
		}*/
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
	}

	echo "error_noType";

	function createBuilding($posX, $posY, $type)
	{
		//Connecting to the database
		require_once("connect.php");

		$dbo = getDBO("map");

		//Creating an SQL request
		$sqlRequest = "INSERT INTO `buildings`(`id`, `posX`, `posY`, `type`) VALUES ('','" . $posX . "','" . $posY . "','" . $type . "')";

		$stmt = $dbo->prepare($sqlRequest);
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

				require_once("map.php");

				exploreAround($bX, $bY, $buildingData[$bType]->getSightRange());
			}
			$cBuilding++;
		}

		//Preparing to send a request to the server
		require_once("connect.php");
		$dbo = getDBO("map");

		$sqlRequest = "INSERT INTO `buildings`(`id`, `posX`, `posY`, `type`, `owner`) VALUES ('',:xPos,:yPos,:type,:owner)";
		$stmt = $dbo->prepare($sqlRequest);

		require_once("map.php");
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
			setNextPlayer($players[0]["Name"]);
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

		$dbo = getDBO("map");
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
?>