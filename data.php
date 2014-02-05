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
		private $food;
		private $oil;
		private $metal;
		private $crystal;

		private $foodGain;
		private $oilGain;
		private $metalGain;
		private $crystalGain;

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

		public function getFoodGain()
		{
			return $this->foodGain;
		}
		public function getOilGain()
		{
			return $this->oilGain;
		}
		public function getMetalGain()
		{
			return $this->metalGain;
		}
		public function getCrystalGain()
		{
			return $this->crystalGain;
		}
		public function getSightRangeGain()
		{
			return $this->sightRangeGain;
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

		public function setGain($foodGain, $oilGain, $metalGain, $crystalGain)
		{
			$this->foodGain = $foodGain;
			$this->oilGain = $oilGain;
			$this->metalGain = $metalGain;
			$this->crystalGain = $crystalGain;
		}
	}
	class UnitBase
	{
		private $sightRange;

		function __construct($sight, $health, $oil, $food, $metal, $crystal)
		{
			$this->sightRange = $sight;
		}

		function getSightRange()
		{
			return $this->sightRange;
		}
		function getHealth()
		{
			return 0;
		}
	}

	$buildings = array();

	$buildingData = array();

	$buildingData[0] = new BuildingBase(500, 1000, 1000, 50);
	$buildingData[0]->setSightRange(3);
	$buildingData[0]->setGain(0, 0, 100, 0);

	$buildingData[1] = new BuildingBase(0, 250, 30, 100);
	$buildingData[1]->setSightRange(2);
	$buildingData[1]->setGain(0, 100, 0, 0);

	$buildingData[2] = new BuildingBase(200, 200, 550, 350);
	$buildingData[2]->setSightRange(2);
	$buildingData[2]->setGain(100, 0, 0, 0);

	$buildingData[3] = new BuildingBase(300, 250, 300, 0);
	$buildingData[3]->setSightRange(2);
	$buildingData[3]->setGain(0, 0, 0, 100);
	
	$unitData = array();

	$unitData[0] = new UnitBase(2, 100, 0, 0, 0, 0);
	$unitData[1] = new UnitBase(3, 100, 0, 0, 0, 0);
?>