if(localStorage.getItem("coinAPI")==null){
	window.onload = function() {
	alert('Extension is initializing\nDo not press any button');
	}
	var temp1 = [];
	{var x;
	var m = {}
	let loaded = false 
    
	fetch('https://min-api.cryptocompare.com/data/all/coinlist')
	.then(res => res.json())
	.then(json => {
		x = json.Data
		console.log(x);
	})
	.then(data => {
		console.log(data)
	})

	
	setTimeout(function(){ 
		Object.values(x).forEach(element => {
			console.log(element.CoinName);
			temp1.push(element.FullName);
		}); 
		localStorage.setItem("coinAPI", temp1);
		alert('d');
	}, 10000);
	}
}