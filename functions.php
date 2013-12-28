<?php
	class Position
	{
		public function __construct($x, $y)
		{
			$this->x = $x;
			$this->y = $y;
		}

		public $x;
		public $y;
	}

	function getNeighbours($x, $y)
	{
		$neighbourPos = [
			[ [+1,  0], [ 0, -1], [-1, -1], [-1,  0], [-1, +1], [ 0, +1] ],
			[ [+1,  0], [+1, -1], [ 0, -1], [-1,  0], [ 0, +1], [+1, +1] ]
		];
		$result = array();

		$mod = $y % 2;
		for($i = 0; $i < count($neighbourPos[$mod]); $i++)
		{
			$result[$i] = array();
			$result[$i][0] = $x + $neighbourPos[$mod][$i][0];
			$result[$i][1] = $y + $neighbourPos[$mod][$i][1];
		}
		return $result;
	}

	function exploreAround($cX, $cY, $radius)
	{
		//Revealing the surrounded area
		require_once("functions.php");

		//Array for storing the positions that have already been looked at
		$explored = array();
		//Array for storing positions to look at
		$toExplore = array();
		$toExplore[0] = new Position($cX, $cY);

		$exploreStage = 1; //Exploring the first "ring"

		while( $exploreStage <= $radius )
		{
			$exploring = $toExplore;
			//Clearing the old toExplore array
			$toExplore = array();
			for($i = 0; $i < count($exploring); $i++)
			{
				$xPos = $exploring[$i]->x;
				$yPos = $exploring[$i]->y;

				//Showing the current tile
				$_SESSION["explored"][$xPos][$yPos] = 2;

				//Adding the tile to the explored array
				$explored[count($explored)] = new Position($xPos, $yPos);

				//Getting all the neighbours for the tile
				$neighbours = getNeighbours($exploring[$i]->x, $exploring[$i]->y);

				for ($n=0; $n < count($neighbours); $n++) 
				{ 
					$x = $neighbours[$n][0];
					$y = $neighbours[$n][1];

					//Checking if the tile has already been explored
					for($m = 0; $m < count($explored); $m++)
					{
						if($explored[$m]->x != $x || $explored[$m]->y != $y)
						{
							$toExplore[count($toExplore)] = new Position($x, $y);
						}
					}
				}
			}
			$exploreStage++; //Exploring one more layer
		}

		/*for($i = 0; $i < count($neighbours); $i++)
		{
			$_SESSION["explored"][$neighbours[$i][0]][$neighbours[$i][1]] = 2;
		}*/
	}
?>