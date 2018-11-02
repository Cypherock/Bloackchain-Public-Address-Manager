chrome.browserAction.setPopup({popup: 'popup.html'});
//Fetching data from API and local file
if(localStorage.getItem("coinAPI")==null||localStorage.getItem("exchAPI")==null){
	window.onload = function() {
		$("button").remove(".positive.ui.button");
		document.getElementById('keyList').innerHTML = '';
		document.getElementById('load').innerHTML = '<img src="images/load.png" class="loadi" id="loadr"><p class="loadt">Getting Your Extension Ready...</p>';
		document.getElementById('wait').innerHTML = '<button class="positive ui button" id="disab" >ADD</button>';
	}
	
	{//ExchangeAPI
		var y;
		var temp3 = [];
		fetch('https://api.coingecko.com/api/v3/exchanges')
        .then(response => response.json())
		.then(data => y = data)

		setTimeout(() => {
			for (let i = 0; i < y.length; i+=1) {
				temp3.push(y[i].name);
			}
			localStorage.setItem("exchAPI", temp3);
			window.location.reload();
		}, 10000);
	}	
	
	{//Coin local file data retrival
		var outp;
		fetch('coin.txt')
		.then(response => response.text())
		.then(text => outp = text)
		// outputs the content of the text file
		setTimeout(() => {
			var count = 0;
			var vis = []
			var temp = outp.split(',');
			console.log(temp);
			for(var i=0; i<temp.length/4; i++){
				vis.push(temp[4*i+1].toUpperCase() + ' ' + count);
				count +=1;
			}
			localStorage.setItem("temp", vis);
			localStorage.setItem("coinAPI", temp);
		}, 100);
	}
}


{//displaying the data
	var data = localStorage.getItem("ECA");
	if(data!=null){
		document.getElementById('searchB').focus();
	var arr1 = data.split(',');
	if(arr1.length!=0){
		var inj = '';
		for(var i=0; i<arr1.length/5; i++){
			inj = inj + '<div class="item" id="delq"><label class="sno">' + (Number(i)+1) + '</label><img class="dispi" src="' + arr1[5*i+4] + '"><img class="dustb" src="images/dustbin.png" id="deli"><div class="disp1"><label>' + arr1[5*i+3] + '</label></div><div class="disp2"><label>' + arr1[5*i+1] + '</label></div><div class="disp3"><label>' + arr1[5*i + 0] + '</label></div><div class="disp4"  id="cpp"><label>' + arr1[5*i + 2] + '</label></div><div class="oncc" id="oncd" data-popup-open="popup-1"></div><img class="moveUp" src="images/moveUp.png"><img class="moveDown" src="images/moveDown.png"></div>';
		}	document.getElementById('keyList').innerHTML = inj;
	
	}
}
jQuery('.dispi').on('error', function() {
	$('img.dispi').attr('src', 'images/unload.png');
});
}
//search bar
{
class PrefixTreeNode {
	constructor(value) {
	  this.children = {};
	  this.endWord = null;
	  this.value = value;
	}
  }

  class PrefixTree extends PrefixTreeNode {
	constructor() {
	  super(null);
	}
  
	addWord(string) {
	  const addWordHelper = (node, str) => {
		if (!node.children[str[0]]) {
		  node.children[str[0]] = new PrefixTreeNode(str[0]);
		  if (str.length === 1) {
  
			node.children[str[0]].endWord = 1;
		  }
		} else {
  
		}
		if (str.length > 1) {
		  addWordHelper(node.children[str[0]], str.slice(1));
		}
	  };
	  addWordHelper(this, string);
	}

	predictWord(string) {
		var getRemainingTree = function(string, tree) {
		  var node = tree;
		  while (string) {
			node = node.children[string[0]];
			string = string.substr(1);
		  }
		  return node;
		};
	
		var allWords = [];
		
		var allWordsHelper = function(stringSoFar, tree) {
		  for (let k in tree.children) {
			const child = tree.children[k]
			var newString = stringSoFar + child.value;
			if (child.endWord) {
			  allWords.push(newString);
			}
			allWordsHelper(newString, child);
		  }
		};
	
		var remainingTree = getRemainingTree(string, this);
		if (remainingTree) {
		  allWordsHelper(string, remainingTree);
		}
	
		return allWords;
	  }
	
	  logAllWords() {
		console.log('------ ALL WORDS IN PREFIX TREE -----------')
		console.log(this.predictWord(''));
	  }
	  // end PrefixTree
  }
  var tree = new PrefixTree();
  
  //setting up the trie
  var data = localStorage.getItem("ECA");
  if(data!=null){
  var arr1 = data.split(',');
  var addn = [];
  for(var i=0; i<arr1.length/5; i++){
	  addn.push(arr1[5*i+0].toLowerCase() + ' ' + arr1[5*i+1].toLowerCase() + ' ' + arr1[5*i+3].toLowerCase() + ' ' + i);
	  addn.push(arr1[5*i+0].toLowerCase() + ' ' + arr1[5*i+3].toLowerCase() + ' ' + arr1[5*i+1].toLowerCase() + ' ' + i);
	  addn.push(arr1[5*i+1].toLowerCase() + ' ' + arr1[5*i+0].toLowerCase() + ' ' + arr1[5*i+3].toLowerCase() + ' ' + i);
	  addn.push(arr1[5*i+1].toLowerCase() + ' ' + arr1[5*i+3].toLowerCase() + ' ' + arr1[5*i+0].toLowerCase() + ' ' + i);
	  addn.push(arr1[5*i+3].toLowerCase() + ' ' + arr1[5*i+0].toLowerCase() + ' ' + arr1[5*i+1].toLowerCase() + ' ' + i);
	  addn.push(arr1[5*i+3].toLowerCase() + ' ' + arr1[5*i+1].toLowerCase() + ' ' + arr1[5*i+0].toLowerCase() + ' ' + i);
  }
  var trieArr = [];
  for(var i=0;i<addn.length;i++){
	  trieArr.push(addn[i]);
  }
  for(var i=0; i<trieArr.length;i++){
	  tree.addWord(trieArr[i]);
  }}
  //trie setup complete
  //querying
  document.getElementById('searchB').onkeydown = function(e) {
	  var query = document.getElementById('searchB').value;
	  var check = event.keyCode || event.charCode;
	  if( check != 8 && check != 46 ){
		  query += e.key;
		  console.log('normal key pressed: ' + e.key);
		  console.log('query: ' + query);
	  }
	  else{
		  console.log('backspace pressed');
		  query = query.slice(0, query.length-1);
		  console.log('query: ' + query);
	  }
	  query = query.toLowerCase();
	  if(query!=''){
		  var results = tree.predictWord(query);
		  var r=0;
		  
		  if(results==''){
			//put no value found
			if( check != 8 && check != 46 )
				document.getElementById('searchB').value = e.key;
			else
				document.getElementById('searchB').value = '';
			if(r==1){
				return;
			}
			console.log('hi');
			var targeted_popup_class = 'popup-2';
			$('[data-popup="' + targeted_popup_class + '"]').fadeIn(100);
			$('[data-popup="' + targeted_popup_class + '"]').fadeOut(1500);
			e.preventDefault();
			r=1;
			console.log('NO match');
		  }
		  else{
			  var indArr= [];
			  for(var j=0;j<results.length;j++){
				  if(indArr.includes(Number(results[j].slice(-1)))==false){
					  indArr.push(Number(results[j].slice(-1)));
				  }
			  }
			  var inje = '';
			  for(var i=0;i<indArr.length;i++){
			  inje = inje + '<div class="item" id="delq"><label class="sno" id="delq">' + (indArr[i]+1) + '</label><img class="dispi" src="' + arr1[5*indArr[i]+4] + '"><img class="dustb" src="images/dustbin.png" id="deli"><div class="disp1"><label>' + arr1[5*indArr[i]+3] + '</label></div><div class="disp2" id="namec"><label>' + arr1[5*indArr[i]+1] + '</label></div><div class="disp3"><label>' + arr1[5*indArr[i] + 0] + '</label></div><div class="disp4"  id="cpp"><label>' + arr1[5*indArr[i] + 2] + '</label></div><div class="oncc" id="oncd" data-popup-open="popup-1"></div></div>';
			  }document.getElementById('keyList').innerHTML = inje;
			  var injj = '';
			  for(var i=0; i<arr1.length/5 ; i++){
				  if(indArr.includes(Number(i))==false){
				  injj += '<div class="item" id="delq"><label class="sno" id="delq">' + (Number(i)+1) + '</label><img class="dispi" src="' + arr1[5*i+4] + '"><img class="dustb" src="images/dustbin.png" id="deli"><div class="disp1"><label>' + arr1[5*i+3] + '</label></div><div class="disp2" id="namec"><label>' + arr1[5*i+1] + '</label></div><div class="disp3"><label>' + arr1[5*i + 0] + '</label></div><div class="disp4"  id="cpp"><label>' + arr1[5*i + 2] + '</label></div><div class="oncc" id="oncd" data-popup-open="popup-1"></div></div>';
				  }
			  } document.getElementById('keyList').innerHTML += injj;
			  
		  }
		  return;
	    }
		else{
			window.location.reload();
		}
  }
  document.getElementById("searchB").onkeypress = function() {
		console.log('hi');

		jQuery('.oncc').on('click', function() {
	
	if(q==0){
		
	$("#keyList").on("click", "#delq", function(){
		var r=0;
	var el = document.createElement('textarea');
   el.value = $(this)[0].getElementsByTagName("label")[4].innerText;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
	$(function() {
	//----- OPEN
	console.log('in 1');
	
	$('[data-popup-open]').on('click', function(e) {
		if(r==1){
			return;
		}
		console.log('in 2');
		var targeted_popup_class = jQuery(this).attr('data-popup-open');
		$('[data-popup="' + targeted_popup_class + '"]').fadeIn(100);
		$('[data-popup="' + targeted_popup_class + '"]').fadeOut(2000);
		e.preventDefault();
		r=1;
	});
	});
	
	
});	
q=1;
	}
});

if ($('#cpp').length > 0) {
jQuery('.dustb').on('click', function() {
	$("#keyList").on("click", "#delq", function(){
    var ind = $(this)[0].getElementsByTagName("label")[0].innerText;
	var data = localStorage.getItem("ECA");
	var arr1 = data.split(',');
	var rem = arr1.splice(5*(Number(ind)-1),5);
	if(arr1.length==0){
		localStorage.removeItem("ECA");
	}
	else{
		localStorage.setItem("ECA", arr1);
	}
	window.location.reload();
});	
});
}

  }
    document.getElementById('searchI').onclick = function() {
		document.getElementById("searchB").value = '';
		window.location.reload();
	}
	
  
} 
 
//Delete an entry
var e = 0
if ($('#cpp').length > 0) {
jQuery('.dustb').on('click', function() {
	if(e==0){
	$("#keyList").on("click", "#delq", function(){
		var r = confirm("Do you want to delete this address?");
	if(r==true){
    var ind = $(this)[0].getElementsByTagName("label")[0].innerText;
	var data = localStorage.getItem("ECA");
	var arr1 = data.split(',');
	var rem = arr1.splice(5*(Number(ind)-1),5);
	if(arr1.length==0){
		localStorage.removeItem("ECA");
	}
	else{
		localStorage.setItem("ECA", arr1);
	}
	window.location.reload();
	}
	});	e=1;}
});
}

//move up
if ($('#cpp').length > 0) {
jQuery('.moveUp').on('click', function() {
	$("#keyList").on("click", "#delq", function(){
    var ind = $(this)[0].getElementsByTagName("label")[0].innerText - 1;
	var data = localStorage.getItem("ECA");
	var arr1 = data.split(',');
	console.log(arr1);
	var temp1 = [];
	if(ind!=0){
		for(var j=0; j<5; j++){
			temp1.push(arr1[5*(Number(ind)-1)+j]);
		}
		for(var j=0; j<5; j++){
			arr1[5*(Number(ind)-1)+j] = arr1[5*(Number(ind))+j];
		}
		for(var j=0; j<5; j++){
			arr1[5*Number(ind)+j] = temp1[j];
		}
		localStorage.setItem("ECA", arr1);
		window.location.reload();
	}
});	
});
}

//move down
if ($('#cpp').length > 0) {
jQuery('.moveDown').on('click', function() {
	$("#keyList").on("click", "#delq", function(){
    var ind = $(this)[0].getElementsByTagName("label")[0].innerText - 1;
	var data = localStorage.getItem("ECA");
	var arr1 = data.split(',');
	console.log(arr1);
	var temp1 = [];
	if(ind!=(arr1.length/5)-1){
		for(var j=0; j<5; j++){
			temp1.push(arr1[5*(Number(ind)+1)+j]);
		}
		for(var j=0; j<5; j++){
			arr1[5*(Number(ind)+1)+j] = arr1[5*(Number(ind))+j];
		}
		for(var j=0; j<5; j++){
			arr1[5*Number(ind)+j] = temp1[j];
		}
		localStorage.setItem("ECA", arr1);
		window.location.reload();
	}
});	
});
}
		
//copy to clipboard
	var q=0;
jQuery('.oncc').on('click', function() {
	
	if(q==0){
		
	$("#keyList").on("click", "#delq", function(){
		var r=0;
	var el = document.createElement('textarea');
   el.value = $(this)[0].getElementsByTagName("label")[4].innerText;
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
	   console.log('hi');
	$(function() {
	//----- OPEN
	console.log('ff');
	
	$('[data-popup-open]').on('click', function(e) {
		if(r==1){
			return;
		}
		console.log('hi');
		var targeted_popup_class = jQuery(this).attr('data-popup-open');
		$('[data-popup="' + targeted_popup_class + '"]').fadeIn(100);
		$('[data-popup="' + targeted_popup_class + '"]').fadeOut(1500);
		e.preventDefault();
		r=1;
	});
	});
	
	
});	
q=1;
	}
});

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < 1; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});
















































