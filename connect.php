<?php
	//Password: yws275KhtD86YAar

	function getDBO($database)
	{
		$dbh = new PDO('mysql:host=127.0.0.1;dbname=' . $database . ';charset=utf8', "root", "");

		return $dbh;
	}
?>