
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<?php
			require_once("connect.php");

			$dbo = getDBO("map");

			for($x = 0; $x < 25; $x++)
			{
				for($y = 0; $y < 25; $y++)
				{
					$sqlRequest = "INSERT INTO `tile`(`id`, `posX`, `posY`, `type`) VALUES (''," . $x . "," . $y . "," . 0 . ")";

					$stmt = $dbo->prepare($sqlRequest);
					$stmt->execute();
				}
			}

			echo "done";
		?>
	</body>
</html>