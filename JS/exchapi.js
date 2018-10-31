if(localStorage.getItem("ecxhAPI")==null){
		{
		var temp3 = [];
	var x;
	var options = {
		"method": "GET",
		"hostname": "rest.coinapi.io",
		"path": "/v1/exchanges",
		"headers": {'X-CoinAPI-Key': '53743B8A-C067-4322-B3B1-EC40013E7890'}
	};
        
    try {
        fetch('https://rest.coinapi.io/v1/exchanges', options)
        .then(response => response.json())
		.then(data => x = data)
		} 
	catch (error) {
        try {
			fetch('https://rest.coinapi.io/v1/exchanges', options)
            .then(response => response.json())
			.then(data => x = data)
            // .then(response=>console.log(response.json().then(data=>console.log(data))));
        } 
		catch (error) {
            
        }
       
    }
  
    
    setTimeout(function(){
        Object.values(x).forEach(element => {
            temp3.push(element.name);
        });
		localStorage.setItem("exchAPI", temp3);
		alert('Initialization complete');
    }, 10000);
	}
}