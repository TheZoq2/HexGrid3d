var plrOil = 0;
var plrCrystal = 0;
var plrFood = 0;
var plrMetal = 0;

function setOil(val)
{
	plrOil = val;

	updateResourceDisplay()
}
function setCrystal(val)
{
	plrCrystal = val;

	updateResourceDisplay()
}
function setFood(val)
{
	plrFood = val;

	updateResourceDisplay()
}
function setMetal(val)
{
	plrMetal = val;

	updateResourceDisplay()
}

function getOil()
{
	return plrOil;
}
function getCrystal()
{
	return plrCrystal;
}
function getFood()
{
	return plrFood;
}
function getMetal()
{
	return plrMetal;
}

function updateResourceDisplay()
{
	//Getting the p tags that display the food amount
	foodDisp = document.getElementById("UI_food")
	metalDisp = document.getElementById("UI_metal")
	crystalDisp = document.getElementById("UI_crystal")
	oilDisp = document.getElementById("UI_oil")

	foodDisp.innerHTML = " " + getFood(); 
	metalDisp.innerHTML = " " + getMetal();
	crystalDisp.innerHTML = " " + getCrystal();
	oilDisp.innerHTML = " " + getOil();
}