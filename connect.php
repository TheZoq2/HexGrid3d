<?php
	//Password: yws275KhtD86YAar

	function getDBO($database)
	{
		if(true)
		{
			$database = "160765-te11e-frans";
			$host = "te11e-frans-160765.mysql.binero.se";
			$usr = "160765_fm21146";
			$password = "Petbarpetunia1";
		}
		else
		{
			//$password = "Petbarpetunia1";
			$host = "localhost";
			$usr = "root";
			$password = "";
		}

		$dbh = new PDO("mysql:host=" . $host . ";dbname=" . $database . ';charset=utf8', $usr, $password);

		return $dbh;
	}
?>