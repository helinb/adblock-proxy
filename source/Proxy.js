
/*
 * POLYFILLS
 */

if (typeof String.prototype.trim !== 'function') {

	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};

}



(function(global) {

	var _FILTERS   = {
		'adblockplus': require(__dirname + '/filter/Adblockplus.js'),
		'hosts':       require(__dirname + '/filter/Hosts.js')
	};

	var _PROTOCOLS = {
		'http':  require(__dirname + '/protocol/HTTP.js'),
		'https': require(__dirname + '/protocol/HTTPS.js')
	};


	/*
	 * BLACKLIST
	 */

	var _is_blocked = function(data) {

		for (var id in _FILTERS) {

			var filter = _FILTERS[id];
			if (filter.check(data) === true) {
				return true;
			}

		}


		return false;

	};



	/*
	 * IMPLEMENTATION
	 */

	var Proxy = function(data) {

		var settings = data instanceof Object ? data : {};


		settings = null;

	};


	Proxy.prototype = {

		/*
		 * PROXY API
		 */

		create: function() {

			_PROTOCOLS['http'].create(null,   8008, _is_blocked, this);
			// _PROTOCOLS['https'].create(null,  8118, _is_blocked, this);

		},

		destroy: function() {

			// TODO: protocol.destroy();

		}

	};


	module.exports = Proxy;

})(this);
