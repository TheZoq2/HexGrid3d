<?php
	echo(phpversion());

	require_once("functions.php");

	//Starting the sessions
	session_start();

	$content = ""; //Contnet that will be put on the page when loaded

	if(isset($_POST["action"])) //If the user wants to do something
	{
		if($_POST["action"] == "Log out")
		{
			//Removing the name from the database
			require_once("connect.php");
			$dbo = getDBO("map");

			echo $_SESSION["Player"];

			$sqlRequest = "DELETE FROM `players` WHERE `Name`=:name";//:name";
			$stmt = $dbo->prepare($sqlRequest);
			$stmt->bindParam(":name", $_SESSION["Player"]);
			$stmt->execute();

			//Removing all the units and buildings owned by the player
			$sqlRequest = "DELETE FROM `buildings` WHERE `owner`=:name; DELETE FROM `units` WHERE `owner`=:name";
			$stmt = $dbo->prepare($sqlRequest);
			$stmt->bindParam(":name", $_SESSION["Player"]);
			$stmt->execute();

			unset($_SESSION["Player"]);
			unset($_SESSION["explored"]);
			$content .= "You have logged out sucessfully";
		}
		elseif($_POST["action"] == "create") //The user wants to create a new player
		{
			//Checking if the player has sent a name (Shouldnt be nessesairy since the name field is required)
			if($_POST["name"] == "")
			{
				$content = "<p>The name must be atleast one character long</p>";
			}
			else
			{
				//Filter the bad stuff from the name
				$playerName = htmlspecialchars($_POST["name"]);
				//Connecting to the database
				require_once("connect.php");

				$dbo = getDBO("map");

				//Making sure a player with the same name does not exist already
				$sqlRequest = "SELECT * FROM `players` WHERE `Name`=:name";
				$stmt = $dbo->prepare($sqlRequest);
				$stmt->bindParam(":name", $playerName);
				$stmt->execute();

				$result = $stmt->fetchAll();
				if(count($result) != 0)
				{
					//That player already existed, tell the user
					$content .= "A player with the name: " . $playerName . " already exists, try a diffirent one";
				}
				else
				{
					//checking if the player is in the 'oldPlayers' table
					$sqlRequest = "SELECT * FROM `oldplayers` WHERE `Name`=:name";
					$stmt = $dbo->prepare($sqlRequest);
					$stmt->bindParam(":name", $playerName);
					$stmt->execute();

					$result = $stmt->fetch();

					if($result != false)
					{
						$time = time();
						$startOil = $result["oil"];
						$startCrystal = $result["crystal"];
						$startMetal = $result["metal"];
						$startFood = $result["food"];
						
						$sqlRequest = "INSERT INTO `players`(`ID`, `Name`, `oil`, `crystal`, `metal`, `food`, `lastActive`) VALUES ('',:name,:oil,:crystal,:metal,:food,:lastActive)";
						$stmt = $dbo->prepare($sqlRequest);
						$stmt->bindParam(":name", $playerName);
						$stmt->bindParam(":oil", $startOil);
						$stmt->bindParam(":crystal", $startCrystal);
						$stmt->bindParam(":metal", $startMetal);
						$stmt->bindParam(":food", $startFood);
						$stmt->bindParam(":lastActive", $time);
						$stmt->execute();

						//Removing the player from the oldPlayers database
						$sqlRequest = "DELETE FROM `oldplayers` WHERE `Name`=:name";
						$stmt = $dbo->prepare($sqlRequest);
						$stmt->bindParam(":name", $playerName);
						$stmt->execute();
					}
 					else
					{
						$time = time();
						$startOil = 2000;
						$startCrystal = 200;
						$startMetal = 2000;
						$startFood = 1500;
						//The player does not exist already, we can create it
						$sqlRequest = "INSERT INTO `players`(`ID`, `Name`, `oil`, `crystal`, `metal`, `food`, `lastActive`) VALUES ('',:name,:oil,:crystal,:metal,:food,:lastActive)";
						$stmt = $dbo->prepare($sqlRequest);
						$stmt->bindParam(":name", $playerName);
						$stmt->bindParam(":oil", $startOil);
						$stmt->bindParam(":crystal", $startCrystal);
						$stmt->bindParam(":metal", $startMetal);
						$stmt->bindParam(":food", $startFood);
						$stmt->bindParam(":lastActive", $time);
						$stmt->execute();

						//Giving the player a starter building and unit
						//Getting the size of the map
						$dbo = getDBO("map");
						$sql = "SELECT * FROM `base` WHERE 1";

						$stmt = $dbo->prepare($sql);
						$stmt->execute();
						$result = $stmt->fetch();

						$sizeX = $result["sizeX"];
						$sizeZ = $result["sizeY"];

						$_SESSION["Player"] = $playerName;
						//Giving the building and unit
						$positionX = rand(1, $sizeX - 1);
						$positionZ = rand(1, $sizeZ - 1); //1 because we want to place a unit next to the building
						createBuilding($positionX, $positionZ, 0);
						//Exploring the surrounding area
						exploreAround($positionX, $positionZ, 3);

						createUnit($positionX + 1, $positionZ, 1, 100);
					}

					$_SESSION["Player"] = $playerName; //Saving the name of the client in the session variable
				}
			}
		}
	}

	//If the client already has a player in the game
	if(isset($_SESSION["Player"]) == false)
	{
		$content .= "<p>You do not seem to have a player, please create one</p>";
		//Create a form to create a player
		$content .= "<form method='POST'>";
			$content .= "<label>Name</label>";
			$content .= "<input type='text' autofocus required placeholder='name' name='name'>";
			$content .= "<input type='submit' name='action' value='create'>";
		$content .= "</form>";
	}
	else
	{
		$content .= "<p>Welcome " . $_SESSION["Player"] . "</p>";
		$content .= "<a href='index.php'>Continue to the game</a>";
		$content .= "<br>";
		$content .= "<p>Is this not you?</p>";
		$content .= "<form method='post'>";
			$content .="<input type='submit' name='action' value='Log out'>";
		$content .= "</form>";
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">

	</head>
	<body>
		<?php
			//Echoing the content for the page
			echo $content;
		?>
	</body>
</html>