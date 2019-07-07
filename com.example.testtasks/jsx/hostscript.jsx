/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function compareobj() {	
		const url = document.querySelector('#URL');
		const interval = document.querySelector('#INTERVAL');
		let log = document.querySelector('#LOG');
		const button = document.querySelector('#BUTTON');

let intervals;
let button_click = 0;
let set = new Set();

		button.addEventListener('click', () => {
			if(button_click % 2 === 0) {

			const json = new XMLHttpRequest();
			json.open("GET", url.value, false);
			json.send();
			let jsontext = JSON.parse(json.responseText);

			button.innerHTML = "Stop";
			intervals = setInterval(() => {
			let i = 0;
			let newjson = new XMLHttpRequest();
			newjson.open('GET', url.value, false);
			newjson.send();
			let newjsontext = JSON.parse(newjson.responseText);

			for(let key in jsontext){
				if(key in newjsontext && jsontext[key] === newjsontext[key]) {
					delete newjsontext[key];
				} 
			}

			for(let key in newjsontext) {
				if(!set.has(`Новое значение ${newjsontext[key]} и его ключ ${key}\n`)) {
					set.add(`Новое значение ${newjsontext[key]} и его ключ ${key}\n`);
					log.value += `Новое значение ${newjsontext[key]} и его ключ ${key}\n`;
				}
			}
	}, interval.value) 
		} else {
			button.innerHTML = "Watch";
			clearInterval(intervals)
		}
		button_click++;
		});	
}
