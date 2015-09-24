
AdBlock Proxy v0.1.0
====================

AdBlock Proxy for blocking adverts on the interwebz (with support for Adblock Plus filter lists and /etc/hosts files).
This project aims to make the interwebz even moar awesome!


# Why using a io.js based AdBlock Proxy?

- It's blazing fast. Seriously, forget other Proxy implementations.
- It's written in JavaScript !!!!111eleven.
- A few hours on Facebook, reddit, stackoverflow uses around 15MB amount of memory (whilst having over 20k blocked hosts and urls with n rulesets):
- If you still don't believe it, get over it and use something else. I don't care.


# License

This project is released under the WTFPL.
See the LICENSE.md for details.


# Bundle Installation

The [releases section](https://github.com/LazerUnicorns/adblock-proxy/releases) contains ready-to-use builds that don't require any further configuration.
They're easier to use for first-time users and probably what you want.

Please take a look at [How to Use](#how-to-use) if you don't know how to configure your Browser to use a Proxy.


# Manual Installation (Developer Setup)

*Note*: You can change the suggested installation folder to whereever you want to install it.
Just make sure you change the paths in the bash commands accordingly.

- Download and install the newest available stable release of iojs from [iojs.org](http://iojs.org).

- Download this project via [zip-file](https://github.com/LazerUnicorns/adblock-proxy/archive/master.zip) and extract its contents.

- Navigate to the folder in your Shell and execute:

```bash
cd /path/to/adblock-proxy; # change if you used a different folder
./bin/proxy; # will start a proxy on defaulted settings (null:8080)
```


# Bundle Generation

If you want to create your own bundle with black jack and hookers, you need to have
a Debian/Ubuntu host system (sorry, but it's impossible otherwise) to generate them.

```bash
sudo apt-get install bash binutils binutils-multiarch coreutils hfsprogs sed zip unzip tar curl wget;

cd /path/to/adblock-proxy;
sudo ./bin/bundle.sh; # Make me a bundle nao!
```


# Settings

If you want to use customized settings, these are the supported parameters and their functionality:

- --public=true will allow using the proxy from other hosts (defaulted). Use --public=false to only allow connections using the local known IPs.

```bash
# Example usage of customized settings
cd /path/to/adblock-proxy;
./bin/proxy --public=true; # default behaviour is public
```


# How To Use

Read the [USAGE.md](USAGE.md) file on How to Use the running Proxy instance.
It has fancy screenshots and stuff, you'll like it :)


# Features

- HTTP Proxy
- ~~HTTPS Proxy~~ (not ready due to blocking issues with cert validation)
- Host config files support (aka **/etc/hosts**)
- Adblock Plus filter list support ("without element hiding")
- Use the *./update.sh* (requires wget) to update all filter lists from predefined sources.


# Work-in-progress (aka still not working)

- HTTPS Proxy still needs proper testing, it is partly ignored by web browsers and I have no clue what's going on as it's undebuggable
without letsencrypt being available in the wild.
- Support for ABP rules with $variable identifiers (requires HTML code parsing, which would slow down proxy)

