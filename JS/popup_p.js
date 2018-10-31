document.getElementById("submi").onclick = function() {
	chrome.browserAction.setPopup({
				popup:"popup.html"
            });
			window.location.href="popup.html";
}