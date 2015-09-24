
NodeJS AdBlock Proxy
====================

NodeJS Proxy for blocking adverts on the interwebz (with support for Adblock Plus filter lists and /etc/hosts files).
This project aims to make the interwebz even moar awesome!


# Why using a NodeJS based AdBlock Proxy?

- It's blazing fast. Seriously, forget other Proxy implementations.
- It's written in JavaScript !!!!111eleven.
- A few hours on Facebook, reddit, stackoverflow uses around 15MB amount of memory (whilst having over 20k blocked hosts and urls with n rulesets):
- If you still don't believe it, get over it and use something else. I don't care.


# License

This project is released under the WTFPL.
See the LICENSE.md for details.


# Installation

*Note*: You can change the suggested installation folder to whereever you want to install it.
Just make sure you change the paths in the bash commands accordingly.

- Download and install the newest available stable release of NodeJS from [nodejs.org](http://nodejs.org).

- Download this project via [zip-file](https://github.com/LazerUnicorns/nodejs-adblock-proxy/archive/master.zip) and extract its contents to **/opt/adproxy**.

- Navigate to the folder in your Shell (or PowerShell) and execute:

```bash
cd /opt/adproxy; # change if you used a different folder
nodejs ./bin/proxy; # will start a proxy on defaulted settings (localhost:8080)
```

# Settings

If you want to use customized parameters, these are the supported parameters and their functionality:

- --public=true will allow using the proxy from other hosts (defaulted). Use --public=false to only allow connections using the local IP.

```bash
# Example usage of customized parameters
cd /path/to/adblock-proxy;
./bin/proxy --public=true; # default behaviour is public
```


# How To Use

Read the [USAGE.md](USAGE.md) file on How to Use.
It has fancy screenshots and stuff, you'll like it :)


# Features

- HTTP Proxy
- Host config files support (aka **/etc/hosts**)
- Adblock Plus filter list support ("without element hiding")
- Use the *./update.sh* (requires wget) to update all filter lists from predefined sources.


# Work-in-progress (aka still not working)

- HTTPS Proxy still needs proper testing, it is partly ignored by web browsers and I have no clue what's going on as it's undebuggable.
- Support for ABP rules with $variable identifiers (requires HTML code parsing, which would slow down proxy)

