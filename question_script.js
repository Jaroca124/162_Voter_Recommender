function get_recs() {
    var request = new XMLHttpRequest();
    var url = "https://ussouthcentral.services.azureml.net/workspaces/1413292447424aadaed1683e6f327fb3/services/9dc5ffe46c0941f7a35d670a1a090cd9/execute?api-version=2.0&details=true";
    api_key = '2GSv/mG1+Q+B46I2PJIMiEw/OW/Wz6QVrYnloMW/AS6o/mMGVX1HiH4j0mZ0aTejaxKT8lYFJuL36zuyHqmaLA==';
    headers = {'Content-Type':'application/json', 'Authorization':('Bearer '+ api_key)}
    
    request.open("POST", url, true);
    
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var scores = [];

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
        	scores = JSON.parse(request.responseText);
        	
	     }
    }

    request.send();
}