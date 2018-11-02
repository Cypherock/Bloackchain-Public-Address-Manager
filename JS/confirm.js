var coinName = localStorage.getItem("coinRet");
var data = localStorage.getItem("ECA");
var arr1 = data.split(',');
var coin = arr1[arr1.length-4];
if(coinName==coin){
	coinName = 'No Alias';
}
var inj1 = '<img class="dustb" id= "errl" src="' + arr1[arr1.length-1] + '"><div id="symd"><label class="sym">' + arr1[arr1.length-2] + '</label></div><div id="exchd"><label class="exch">' + arr1[arr1.length-5] + '</label></div><div id="coind"><label class="coin">' + arr1[arr1.length-4] + '</label></div><div id="coindisp"><label class="coindispl" id="setgrey">' + coinName + '</label></div>';
document.getElementById('disp').innerHTML = inj1;
document.getElementById('dispaddr').innerHTML = '<div id="addrd"><label class="addr">'+ arr1[arr1.length-3] + '</label></div>';
if(coinName=='No Alias'){
	var elem = document.getElementById('setgrey');
	elem.style.color = "#d9d9d9";
}console.log(localStorage.getItem("ECA"));
document.getElementById("b1").onclick = function() {
	var ret1 = '';
	var ret2 = '';
	var data1 = localStorage.getItem("ECA");
	var arr11 = data1.split(',');
		arr11.pop();
		arr11.pop();
		ret1 = arr11.pop();
		ret2 = arr11.pop();
		arr11.pop();
		localStorage.setItem("ECA", arr11);
		if(arr11.length==0){
			localStorage.removeItem("ECA");
		}
	var ret = [];
	ret.push(ret1);
	ret.push(ret2);
	localStorage.setItem("Ret", ret);
	console.log("data not stored");
	window.location.href = "popup_2.html";
}
document.getElementById("b2").onclick = function() {
	localStorage.setItem("Check", 1);
	window.location.href = "popup.html";
}

document.getElementById("errl").onerror = function() {
	$('img.dustb').attr('src', 'images/unload.png');
}
$("#bb3").on('keydown', function(e) {
	if(e.keyCode==13){
		window.location.href = 'popup.html';
	}
})