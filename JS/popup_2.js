function isAlphaNumeric(str) {
  var code, i, len;

  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

chrome.browserAction.setPopup({popup: 'popup_2.html'});
{//integrating API
	var cl = localStorage.getItem("coinAPI");
	var arrr = cl.split(',');
	var coinList = localStorage.getItem("temp");
	var vis = coinList.split(',');
	var t = vis[0];
	vis.shift();
	vis.shift();
	vis.shift();
	vis.shift();
	vis.push(t);
	vis= vis.sort();
	var inj1 = document.getElementById('coin').innerHTML;
	var j = 0;
	for(i=0; i<(vis.length); i++){
		var test = vis[i];
		var num ='';
		while(1){
			var temp = test.slice(-1);
			if(isNaN(temp)){
				break;
			}
			else{
				test = test.replace(temp,'');
				num +=temp;
			}
		
		}
		String.prototype.reverse = function() {
		var s = "";
		var i = this.length;
		while (i>0) {
			s += this.substring(i-1,i);
			i--;
		}
		return s;
		}
		var ch = 0;
		var sym = '';
		while(1){
			if(test[test.length-ch-1]=='('){
				sym += '(';
				break;
			}
			else{
				sym += test[test.length-ch-1];
				ch += 1;
			}
		}
		sym = sym.reverse();
		test = test.replace(sym, '');//' + arrr[4*Number(num.reverse())+3] + '
		test = test + ' ' + sym;
		var imgSrc = 
		inj1 = inj1 + '<option value="' + num.reverse() + '">' + test + '</option>';
	}
	document.getElementById('coin').innerHTML = inj1;
	
	var exchList = localStorage.getItem("exchAPI");
	var arr3 = exchList.split(',');
	arr3 = arr3.sort();
	var inj2 = document.getElementById('exchange').innerHTML;
	for(var i=0; i<arr3.length; i++){
		inj2 = inj2 + '<option value="' + arr3[i] + '">' + arr3[i] + '</option>';
	}
	document.getElementById('exchange').innerHTML = inj2;
	if(localStorage.getItem("Ret")!=null){
		var ret = localStorage.getItem("Ret").split(',');
		document.getElementById('address').value = ret[0];
		if(typeof(ret[1])!="undefined")
			document.getElementById('alias').value = ret[1];
	}
}
document.getElementById('address1').onkeydown = function(e) {
	var getd = document.getElementById('address').value;
	var check = event.keyCode || event.charCode;
	if( check != 8 && check != 46 ){
		var query = getd + e.key;
		if(query.length!=0){
			if(query.length!=36)
				document.getElementById('ctrv').innerHTML = query.length;
			else
				document.getElementById('ctrv').innerHTML = '35';
		}else
			document.getElementById('ctrv').innerHTML = '';
	}
	else{
		if(getd.length>1)
			document.getElementById('ctrv').innerHTML = getd.length-1;
		else
			document.getElementById('ctrv').innerHTML = '';
	}
}
document.getElementById("address").onkeydown = function(e) {
	var count = document.getElementById('address').value.length -1;
    var remaining = 34 - count;
    if(remaining <= 0) {
        document.getElementById('address').value = document.getElementById('address').value.substring(0, 35);
    }
}
document.getElementById("address").onkeyup = function(e) {
	var count = document.getElementById('address').value.length;
    var remaining = 34 - count;
    if(remaining <= 0) {
        document.getElementById('address').value = document.getElementById('address').value.substring(0, 35);
    }
}
document.getElementById('b1').onclick = function() {
	localStorage.removeItem("Ret");
	window.location = 'popup.html';
}

document.getElementById('b2').onclick = function() {
	localStorage.removeItem("Ret");
	var test = 1;
	var exch = document.getElementById('exchange').value;
	var coin = document.getElementById('coin').value;
	var addr = document.getElementById('address').value;
	var alias = document.getElementById('alias').value;
	
	if(addr==''){
		var temp = '<div class="ui red message" id="err1"> <p>Enter an address</p></div>';
		document.getElementById('err').innerHTML = temp;
		test = 0;
	}
	if(coin==''||coin=='coin'){
		var temp = '<div class="ui red message" id="err1"> <p>Select coin</p></div>';
		document.getElementById('err').innerHTML = temp;
		test = 0;
	}
	if(exch==''||exch=='exchange'){
		var temp = '<div class="ui red message" id="err1"> <p>Select an exchange</p></div>';
		document.getElementById('err').innerHTML = temp;
		test = 0;
	}
	if(addr.length>35){
		var temp = '<div class="ui red message" id="err1"> <p>Address is too long, can not be more than 35 characters long</p></div>';
		document.getElementById('err').innerHTML = temp;
		test = 0;
	}
	if(alias.length>20){
		var temp = '<div class="ui red message" id="err1"> <p>Alias is too long, can not be more than 20 characters long</p></div>';
		document.getElementById('err').innerHTML = temp;
		test = 0;
	}
	if(isAlphaNumeric(addr)==false){
		var temp = '<div class="ui red message" id="err1"> <p>Address can contain only alphabets and numbers</p></div>';
		document.getElementById('err').innerHTML = temp;
		test = 0;
	}
	if(isAlphaNumeric(alias)==false){
		var temp = '<div class="ui red message" id="err1"> <p>Alias can contain only alphabets and numbers</p></div>';
		document.getElementById('err').innerHTML = temp;
		test = 0;
	}
	if(test==1 && coin!='-1'){
		var temp = [];
		if(localStorage.getItem("ECA")==null){
			localStorage.setItem("ECA", 0);
		}
		temp.push(localStorage.getItem("ECA"));
		if(temp[0]==0){
			temp.pop();
		}
		var coinListt = localStorage.getItem("coinAPI");
		var arr2 = coinListt.split(',');
		localStorage.setItem("coinRet", arr2[4*Number(coin)]);
		console.log(arr2);
		var ind1 = 4*Number(coin) + 3;
		var ind2 = ind1-1;
		console.log(ind1 + '  ' + ind2);
		var url = arr2[ind1];
		var NAME = '';
		if(alias==''){
			NAME = arr2[4*Number(coin)];
		}
		else{
			NAME = alias;
		}
		temp.push(exch);
		temp.push(NAME);
		temp.push(addr);
		temp.push(arr2[ind2]);
		temp.push(arr2[ind1]);
		localStorage.setItem("ECA", temp);
		localStorage.setItem("Check", 0);
		console.log(localStorage.getItem('ECA'));
		window.location = "confirm.html";
	}
	if(test==1 && coin==-1){
		var temp = [];
		var symb = '';
		if(localStorage.getItem("ECA")==null){
			localStorage.setItem("ECA", 0);
		}
		temp.push(localStorage.getItem("ECA"));
		if(temp[0]==0){
			temp.pop();
		}
		var coinListt = localStorage.getItem("coinAPI");
		var arr2 = coinListt.split(',');
		localStorage.setItem("coinRet", "Other");
		var NAME = '';
		if(alias==''){
			NAME = 'Other';
			symb = 'OTHER';
		}
		else{
			NAME = alias;
			symb = NAME.substring(0,3).toUpperCase();
		}
		temp.push(exch);
		temp.push(NAME);
		temp.push(addr);
		temp.push(symb);
		temp.push('/images/notfound.png');
		localStorage.setItem("ECA", temp);
		localStorage.setItem("Check", 0);
		window.location = "confirm.html";
	}
}

function limitText() {
      var count = document.getElementById('address').value.length;
      var remaining = 35 - count;
      if(remaining <= 0) {
        document.getElementById('address').value = document.getElementById('address').value.substring(0, 35);
      }
    }


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	