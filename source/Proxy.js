
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
		'http':   require(__dirname + '/protocol/HTTP.js'),
		'https':  require(__dirname + '/protocol/HTTPS.js'),
		'socks5': require(__dirname + '/protocol/SOCKS5.js')
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


		this.host     = '127.0.0.1';
		this.port     = 8080;
		this.protocol = 'http';
		this.public   = false;


		this.setHost(settings.host);
		this.setPort(settings.port);
		this.setProtocol(settings.protocol);
		this.setPublic(settings.public);

		settings = null;

	};


	Proxy.prototype = {

		/*
		 * PROXY API
		 */

		create: function() {

			var host = this.public === true ? null : this.host;
			var port = this.port;


			var protocol = _PROTOCOLS[this.protocol] || null;
			if (protocol !== null) {

				protocol.create(host, port, _is_blocked, this);
				console.log(this.protocol.toUpperCase() + ' Proxy created on ' + host + ':' + port);

				return true;

			}


		},

		destroy: function() {

			// TODO: protocol.destroy();

		},



		/*
		 * CUSTOM API
		 */

		setHost: function(host) {

			host = typeof host === 'string' ? host : null;


			if (host !== null) {

				this.host = host;

				return true;

			}


			return false;

		},

		setPort: function(port) {

			port = typeof port === 'number' ? port : null;


			if (port !== null && port > 0 && port < 0xffff) {

				this.port = port;

				return true;

			}


			return false;

		},

		setProtocol: function(protocol) {

			protocol = typeof protocol === 'string' ? protocol : null;


			if (protocol !== null && Object.keys(_PROTOCOLS).indexOf(protocol) !== -1) {

				this.protocol = protocol;

				return true;

			}


			return false;

		},

		setPublic: function(flag) {

			if (flag === true || flag === false) {

				this.public = flag;

				return true;

			}


			return false;

		}

	};


	module.exports = Proxy;

})(this);
