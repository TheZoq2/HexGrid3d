var requests = Array();

function createRequest(phpFile, postVars, onFinished)
{
	request = new XMLHttpRequest();

	request.open("POST", phpFile, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(postVars);

	request.onreadystatechange = function()
	{
		if(this.readyState == 4) //If the response is ready
		{
			onFinished(this.responseText);
		}
	}

	//Saving the request
	requests[requests.length] = 
	{
		request: request,

		onFinished: onFinished
	};
}

function checkRequests()
{
}