#!/usr/bin/env iojs


(function() {

	var _Proxy    = require('../source/Proxy.js');
	var _settings = {

		// required
		'host':     '127.0.0.1',
		'port':     8080,

		// optional
		'protocol': 'http',
		'public':   true

	};


	(function(settings, args) {

		args.forEach(function(arg, index) {

			if (arg.substr(0, 2) === '--') {

				var param = arg.substr(2).split('=');
				var value = null;

				if (param[0] === 'host') {

					value = param[1];
					settings['host'] = typeof value === 'string' ? value : settings['host'];

				} else if (param[0] === 'port') {

					value = parseInt(param[1], 10);
					settings['port'] = !isNaN(value) ? value : settings['port'];

				} else if (param[0] === 'protocol') {

					value = param[1];
					settings['protocol'] = typeof value === 'string' ? value : settings['protocol'];

				} else if (param[0] === 'public') {

					value = param[1] === 'true' ? true : false;
					settings['public'] = typeof value === 'boolean' ? value : settings['public'];

				}

			}

		});

	})(_settings, [].slice.call(process.argv));


console.log(_settings);

	var proxy = new _Proxy(_settings);

	proxy.create();
	// proxy.destroy();

})();

