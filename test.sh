#!/bin/bash

# Test HTTP proxy
iojs ./bin/proxy --host=localhost --port=8008 --protocol=http;

# Test HTTPS proxy
# openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem;
# nodejs ./bin/proxy --host=localhost --port=8181 --protocol=https;

