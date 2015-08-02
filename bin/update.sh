#!/bin/bash

CONFIG_ROOT=$(cd "$(dirname "$0")/config"; pwd);

# Update Host Lists

wget http://winhelp2002.mvps.org/hosts.txt     -O $CONFIG_ROOT/hosts.d/winhelp2002-mvps.txt
wget http://someonewhocares.org/hosts/hosts    -O $CONFIG_ROOT/hosts.d/someonewhocares.txt
wget http://cdn.trjlive.com/hosts/hosts-v8.txt -O $CONFIG_ROOT/hosts.d/trjlive.txt


# Update AdBlock Plus Filters

wget --no-check-certificate https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt    -O $CONFIG_ROOT/adblockplus.d/fanboy-annoyance.txt
wget --no-check-certificate https://easylist-downloads.adblockplus.org/fanboy-social.txt       -O $CONFIG_ROOT/adblockplus.d/fanboy-social.txt
wget --no-check-certificate https://easylist-downloads.adblockplus.org/easylist_noelemhide.txt -O $CONFIG_ROOT/adblockplus.d/easylist_noelemhide.txt
wget --no-check-certificate https://easylist-downloads.adblockplus.org/easyprivacy.txt         -O $CONFIG_ROOT/adblockplus.d/easyprivacy.txt

