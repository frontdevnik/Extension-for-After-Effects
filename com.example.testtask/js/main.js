	(function () {
		'use strict';

		var csInterface = new CSInterface();

		document.querySelector('#BUTTON').addEventListener('click', function () {
		csInterface.evalScript('compareobj()');
		});

	}());