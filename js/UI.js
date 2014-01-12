
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

		/*var index = i; //To keep the ID inside the onclick function
		button.onclick = function()
		{
			selTool = 1;
			selID = i;

			console.log(index);
		}*/
		button = addClickListener(button, i, 1);

		buildingGroup.appendChild(button);
	}

	for(var i = 0; i < unitBase.length; i++)
	{
		var button = document.createElement("div");
		button.setAttribute("class", "UI_buildingButton");

		button = addClickListener(button, i, 2);

		unitGroup.appendChild(button);
	}
	/**/
}

function addClickListener(element, newID, newTool) //Needed to get the ID into the onClick function
{
	element.onclick = function()
	{
		selTool = newTool;
		selID = newID;
	}

	return element;
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