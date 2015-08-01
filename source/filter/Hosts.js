
(function(global) {

	var _cache  = [];
	var _fs     = require('fs');
	var _path   = require('path');

	var _FOLDER = _path.resolve(__dirname, '../../hosts.d');



	/*
	 * HELPERS
	 */

	var _parse = function(buffer) {

		var update = false;
		var lines  = buffer.toString().split('\n').filter(function(value) {
			return value.charAt(0) !== '#';
		}).map(function(value) {

			var index = value.indexOf('#');
			if (index !== -1) {
				return value.substr(0, index).trim();
			} else {
				return value;
			}

		});


		if (lines.length > 0) {

			var hosts = lines.map(function(value) {

				var tmp = value.split(/\s/g);
				if (tmp[0] === '127.0.0.1' || tmp[0] === '0.0.0.0') {
					return tmp[1];
				} else {
					return null;
				}

			}).filter(function(value) {
				return value !== null && value !== 'localhost';
			});


			if (hosts.length > 0) {

				hosts.forEach(function(value) {

					if (_cache.indexOf(value) === -1) {
						update = true;
						_cache.push(value);
					}

				});

			}

		}


		if (update === true) {
			console.log('filter/Hosts: ' + _cache.length + ' host rules');
		}

	};


	var _refresh_interval = function() {

		_fs.readdir(_FOLDER, function(err, files) {

			if (err) return;

			files.forEach(function(file) {

				if (file === 'dontdelete.txt') return;

				_fs.readFile(_FOLDER + '/' + file, function(err, buffer) {

					if (!err) {
						_parse(buffer);
					}

				});

			});

		});

	};



	// Update files automatically every 15 minutes

	setInterval(function() {
		_refresh_interval();
	}, 15 * 60000);


	module.exports = {

		check: function(data) {

			var host = data.host;

			if (_cache.indexOf(host) !== -1) {
				return true;
			}


			return false;

		}

	};


	_refresh_interval();

})(typeof global !== 'undefined' ? global : this);

