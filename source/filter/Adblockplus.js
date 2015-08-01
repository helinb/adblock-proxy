
(function(global) {

	var _cache  = {
		complex: [],
		host:    [],
		path:    []
	};

	var _fs     = require('fs');
	var _path   = require('path');

	var _FOLDER = _path.resolve(__dirname, '../../adblockplus.d');


	var _unique_push = function(data) {

		if (typeof data === 'object') {

			return _unique_push_object.call(this, data);

		} else if (typeof data === 'string') {

			return _unique_push_string.call(this, data);

		}


		return false;

	};

	var _unique_push_string = function(str) {

		if (this.indexOf(str) === -1) {

			this.push(str);

			return true;

		}


		return false;

	};

	var _unique_push_object = function(obj) {

		var keys = Object.keys(obj);
		var test = this.filter(function(object) {

			for (var key in object) {

				if (object.hasOwnProperty(key)) {

					if (keys.indexOf(key) !== -1) {

						if (object[key] === obj[key]) {
							return true;
						}

					}

				}

			}


			return false;

		});


		if (test.length === 0) {

			this.push(obj);

			return true;

		}


		return false;

	};



	/*
	 * HELPERS
	 */

	var _parse = function(buffer) {

		var update = false;
		var lines  = buffer.toString().split('\n').filter(function(value) {
			return value.charAt(0) !== '!';
		});


		if (lines.length > 0) {

			lines.forEach(function(line) {

				var rule = null;
				var tmp1, tmp2;


				if (line.substr(0, 4) === '@@||') {

					if (line.indexOf('$') !== -1) {

						// TODO: Support $popup, $script, $stylesheet and $domain

					} else if (line.indexOf('*') !== -1) {

						tmp1 = line.substr(4).split('/').shift();
						tmp2 = line.substr(4).split('/').slice(1).join('/');

						if (tmp1.indexOf('^*') !== -1) {
							tmp1 = tmp1.substr(0, tmp1.indexOf('^*'));
						}


						if (tmp2.indexOf('*') === 0) {

							update = _unique_push.call(_cache.host, tmp1) || update;

						} else if (tmp2.indexOf('*') !== -1) {

							tmp2 = tmp2.substr(0, tmp2.indexOf('*'));

							update = _unique_push.call(_cache.complex, {
								host: tmp1,
								path: '/' + tmp2
							}) || update;

						} else {

							update = _unique_push.call(_cache.complex, {
								host: tmp1,
								path: '/' + tmp2
							}) || update;

						}

					} else {

						tmp1 = line.substr(4).split('/').shift();
						tmp2 = line.substr(4).split('/').slice(1).join('/');

						if (tmp1.indexOf('^') !== -1) {
							tmp1 = tmp1.substr(0, tmp1.indexOf('^'));
						}


						update = _unique_push.call(_cache.complex, {
							host: tmp1,
							path: '/' + tmp2
						}) || update;

					}


				} else if (line.substr(0, 2) === '||') {

					if (line.indexOf('$') !== -1) {

						// TODO: Support $popup, $script, $stylesheet and $domain

					} else if (line.indexOf('*') !== -1) {

						tmp1 = line.substr(2).split('/').shift();
						tmp2 = line.substr(2).split('/').slice(1).join('/');

						if (tmp1.indexOf('^*') !== -1) {
							tmp1 = tmp1.substr(0, tmp1.indexOf('^*'));
						}


						if (tmp2.indexOf('*') === 0) {

							update = _unique_push.call(_cache.host, tmp1) || update;

						} else if (tmp2.indexOf('*') !== -1) {

							tmp2   = tmp2.substr(0, tmp2.indexOf('*'));
							update = _unique_push.call(_cache.complex, {
								host: tmp1,
								path: '/' + tmp2
							}) || update;

						} else {

							update = _unique_push.call(_cache.complex, {
								host: tmp1,
								path: '/' + tmp2
							}) || update;

						}

					} else {

						tmp1 = line.substr(2).split('/').shift();
						tmp2 = line.substr(2).split('/').slice(1).join('/');

						if (tmp1.indexOf('^') !== -1) {
							tmp1 = tmp1.substr(0, tmp1.indexOf('^'));
						}


						update = _unique_push.call(_cache.complex, {
							host: tmp1,
							path: '/' + tmp2
						}) || update;

					}


				} else if (line.substr(0, 1) === '/' || line.substr(0, 1) === '&') {

					if (line.indexOf('*') !== -1) {

						if (line.indexOf('*') === (line.length - 1)) {
							update = _unique_push.call(_cache.path, line.substr(0, line.length - 1)) || update;
						}

					} else if (line.indexOf('$') !== -1) {

						// TODO: Support $popup, $script, $stylesheet and $domain

					} else {

						update = _unique_push.call(_cache.path, line.trim()) || update;

					}

				}

			});

		}


		if (update === true) {
			console.log('filter/Adblockplus: ' + _cache.host.length + ' host rules');
			console.log('filter/Adblockplus: ' + _cache.path.length + ' path rules');
			console.log('filter/Adblockplus: ' + _cache.complex.length + ' complex rules');
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
			var path = data.path;


			var i, l, rule, chunk;

			for (i = 0, l = _cache.host.length; i < l; i++) {

				rule = _cache.host[i];

				if (host === rule) {
					return true;
				}

			}

			for (i = 0, l = _cache.path.length; i < l; i++) {

				rule  = _cache.path[i];
				chunk = path.substr(0, rule.length);

				if (chunk === rule) {
					return true;
				}

			}

			for (i = 0, l = _cache.complex.length; i < l; i++) {

				rule  = _cache.complex[i];
				chunk = path.substr(0, rule.path.length);

				if (host === rule.host && chunk === rule.path) {
					return true;
				}

			}


			return false;

		}

	};


	_refresh_interval();

})(typeof global !== 'undefined' ? global : this);

