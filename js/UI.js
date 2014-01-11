
var b_endTurn;

function setupUI()
{
	//Getting HTML UI elements
	bar_right = document.getElementById("UI_rightBar");
	buildingGroup = document.getElementById("UI_buildingButtons");
	unitGroup = document.getElementById("UI_unitButtons");

	b_endTurn = document.getElementById("UI_b_endTurn");

	//Giving those elements function
	b_endTurn.onclick = endTurn;

	var buildingAmount = 4;

	for(var i = 0; i < buildingData.length; i++)
	{
		var button = document.createElement("div");
		button.setAttribute("class", "UI_buildingButton");

		var index = i; //To keep the ID inside the onclick function
		button.onclick = function()
		{
			selTool = 1;
			selID = index;
		}

		buildingGroup.appendChild(button);
	}

	for(var i = 0; i < unitBase.length; i++)
	{
		var button = document.createElement("div");
		button.setAttribute("class", "UI_buildingButton");

		var index = i;
		button.onclick = function()
		{
			selTool = 2;
			selID = index;
		}

		unitGroup.appendChild(button);
	}
	/**/
}

function hideUI()
{
	bar_right = document.getElementById("UI_rightBar");
	//Getting HTML UI elements
	bar_control = document.getElementById("UI_controlBar");

	bar_right.style.visibility = "hidden";
	bar_control.style.visibility = "hidden";
}

function showUI()
{
	bar_right = document.getElementById("UI_rightBar");
	//Getting HTML UI elements
	bar_control = document.getElementById("UI_controlBar");

	bar_right.style.visibility = "visible";
	bar_control.style.visibility = "visible";
}