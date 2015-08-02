#!/usr/bin/env iojs


(function() {

	var _Proxy    = require('../source/Proxy.js');
	var _settings = {

		'public': true

	};


	(function(settings, args) {

		args.forEach(function(arg, index) {

			if (arg.substr(0, 2) === '--') {

				var param = arg.substr(2).split('=');
				var value = null;

				if (param[0] === 'public') {

					value = param[1] === 'true' ? true : false;
					settings['public'] = typeof value === 'boolean' ? value : settings['public'];

				}

			}

		});

	})(_settings, [].slice.call(process.argv));


	var proxy = new _Proxy(_settings);

	proxy.create();
	// proxy.destroy();

})();

