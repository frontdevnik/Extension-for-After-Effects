/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    
    function init() {
                
        themeManager.init();
                
        $("#BUTTON").click(function () {
            const url = document.getElementById('URL');
			const interval = document.getElementById('INTERVAL');
			const log = document.getElementById('LOG');
			const button = document.getElementById('BUTTON');

var intervals;
var button_click = 0;
const set = new Set();

		button.addEventListener('click', function() {
			if(button_click % 2 === 0) {

			const json = new XMLHttpRequest();
			json.open("GET", url.value, false);
			json.send();
			var jsontext = JSON.parse(json.responseText);

			button.innerHTML = "Stop";
			intervals = setInterval(function() {
			var i = 0;
			var newjson = new XMLHttpRequest();
			newjson.open('GET', url.value, false);
			newjson.send();
			var newjsontext = JSON.parse(newjson.responseText);

			for(var keys in jsontext){
				if(keys in newjsontext && jsontext[keys] === newjsontext[keys]) {
					delete newjsontext[keys];
				} 
			}

			for(var key in newjsontext) {
				if(!set.has("Новое значение " + newjsontext[key] + " и его ключ " + key + "\n")) {
					set.add("Новое значение " + newjsontext[key] + " и его ключ " + key + "\n");
					log.value += "Новое значение " + newjsontext[key] + " и его ключ " + key + "\n";
				}
			}
	}, interval.value) 
		} else {
			button.innerHTML = "Watch";
			clearInterval(intervals)
		}
		button_click++;
		});	
        });
    }
        
    init();

}());
    
