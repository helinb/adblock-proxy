#!/bin/bash


# Update Host Lists

wget http://winhelp2002.mvps.org/hosts.txt -O ./hosts.d/winhelp2002-mvps.txt
wget http://someonewhocares.org/hosts/hosts -O ./hosts.d/someonewhocares.txt
wget http://cdn.trjlive.com/hosts/hosts-v8.txt -O ./hosts.d/trjlive.txt


# Update AdBlock Plus Filters

#wget --no-check-certificate https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt -O ./adblockplus.d/fanboy-annoyance.txt
#wget --no-check-certificate https://easylist-downloads.adblockplus.org/fanboy-social.txt -O ./adblockplus.d/fanboy-social.txt
#wget --no-check-certificate https://easylist-downloads.adblockplus.org/easylist_noelemhide.txt -O ./adblockplus.d/easylist_noelemhide.txt
#wget --no-check-certificate https://easylist-downloads.adblockplus.org/easyprivacy.txt -O ./adblockplus.d/easyprivacy.txt


wget --no-check-certificate  https://easylist-downloads.adblockplus.org/easylist.txt -O ./adblockplus.d/easylist.txt 
wget --no-check-certificate	https://easylist-downloads.adblockplus.org/antiadblockfilters.txt -O ./adblockplus.d/antiadblockfilters.txt
wget --no-check-certificate	https://raw.github.com/reek/anti-adblock-killer/master/anti-adblock-killer-filters.txt -O ./adblockplus.d/anti-adblock-killer-filters.txt 
wget --no-check-certificate	https://spam404bl.com/spam404scamlist.txt -O ./adblockplus.d/spam404scamlist.txt
wget --no-check-certificate	https://raw.githubusercontent.com/nfer/easylistchina_it/master/easylistchina_it.txt -O ./adblockplus.d/easylistchina_it.txt
wget --no-check-certificate	https://github.com/gythialy/chinalist/raw/master/my_custom_list.txt -O ./adblockplus.d/my_custom_list.txt
wget --no-check-certificate https://github.com/JinsongVan/chinalist/raw/master/china_mobile_list.txt -O ./adblockplus.d/china_mobile_list.txt
wget --no-check-certificate https://easylist-downloads.adblockplus.org/easylistchina+easylist.txt -O ./adblockplus.d/easylistchina+easylist.txt 
