function separateVariables(data)
{
	var result = data.split(",");

	return result;
}
function getVarType(variable)
{
	var equalPos = variable.search("=");
	var result = variable.substr(0, equalPos);

	return result;
}
function getVarValue(variable)
{
	var equalPos = variable.search("=");
	var result = variable.substr(equalPos + 1);

	return result;
}