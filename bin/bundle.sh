#!/usr/bin/env bash

# set -u;
set -e;



#
# HELPERS
#

RELEASE=$(date --utc +%FT)"00:00:00Z";
VERSION="0.0.1";
PROXY_ROOT=$(cd "$(dirname "$0")/../"; pwd);
DIST_ROOT="$PROXY_ROOT/dist";


rm -rf $DIST_ROOT/*;

if [ ! -d "$DIST_ROOT" ]; then
	mkdir "$DIST_ROOT";
fi;



# Ubuntu Packages (.deb file for amd64 and armhf)

_package_ubuntu() {

	ARCH="$1";
	TARGET_ROOT="$DIST_ROOT/ubuntu-$ARCH";

	if [ ! -f "$DIST_ROOT/adblock-proxy-${VERSION}_${ARCH}.deb" ]; then

		cd $PROXY_ROOT;

		if [ -d "$TARGET_ROOT" ]; then
			rm -rf "$TARGET_ROOT";
		fi;



		rsync -a ./bundle/ubuntu/ "$TARGET_ROOT/";
		mv "$TARGET_ROOT/root/opt/adblock-proxy/bin/iojs_${ARCH}" "$TARGET_ROOT/root/opt/adblock-proxy/bin/iojs";
		rm $TARGET_ROOT/root/opt/adblock-proxy/bin/iojs_*;

		cp -R ./bin/*     $TARGET_ROOT/root/opt/adblock-proxy/bin/;
		cp -R ./config    $TARGET_ROOT/root/opt/adblock-proxy/config;
		cp -R "./source" "$TARGET_ROOT/root/opt/adblock-proxy/source";
		cp ./LICENSE.md   $TARGET_ROOT/root/opt/adblock-proxy/LICENSE.md;
		cp ./cert.pem     $TARGET_ROOT/root/opt/adblock-proxy/cert.pem;
		cp ./key.pem      $TARGET_ROOT/root/opt/adblock-proxy/key.pem;


		find "$TARGET_ROOT/" -type d -exec chmod 0755 {} \;
		find "$TARGET_ROOT/" -type f -exec chmod go-w {} \;
		chown -R root:root "$TARGET_ROOT/";


		cd "$TARGET_ROOT/root";
		tar czf "$TARGET_ROOT/data.tar.gz" *;


		cd "$TARGET_ROOT/DEBIAN";
		let SIZE=`du -s "$TARGET_ROOT/root" | sed s'/\s\+.*//'`+8
		sed -i "s/__SIZE__/${SIZE}/" ./control;
		sed -i "s/__VERSION__/${VERSION}/" ./control;
		sed -i "s/__ARCH__/${ARCH}/" ./control;
		tar czf "$TARGET_ROOT/control.tar.gz" *;


		cd "$TARGET_ROOT";
		echo 2.0 > ./debian-binary;

		find "$TARGET_ROOT/" -type d -exec chmod 0755 {} \;
		find "$TARGET_ROOT/" -type f -exec chmod go-w {} \;
		chown -R root:root "$TARGET_ROOT/";
		ar r "$DIST_ROOT/adblock-proxy-${VERSION}_${ARCH}.deb" debian-binary control.tar.gz data.tar.gz;


		rm -rf "$TARGET_ROOT";

	fi;


}



# OSX Image (.dmg file)

_package_osx () {

	ARCH="$1";
	TARGET_ROOT="$DIST_ROOT/osx-$ARCH";

	if [ ! -f "$DIST_ROOT/adblock-proxy-${VERSION}_${ARCH}.dmg.zip" ]; then

		cd $PROXY_ROOT;

		if [ -d "$TARGET_ROOT" ]; then
			rm -rf "$TARGET_ROOT";
		fi;



		mkdir -p "$TARGET_ROOT/adblock-proxy/bin";
		cp "./bundle/osx/root/Applications/adblock-proxy/bin/iojs_${ARCH}" "$TARGET_ROOT/adblock-proxy/bin/iojs";
		cp "./bundle/osx/README.rtf" "$TARGET_ROOT/README.rtf";

		cp -R ./bin/*     $TARGET_ROOT/adblock-proxy/bin/;
		cp -R ./config    $TARGET_ROOT/adblock-proxy/config;
		cp -R "./source" "$TARGET_ROOT/adblock-proxy/source";
		cp ./LICENSE.md   $TARGET_ROOT/adblock-proxy/LICENSE.md;
		cp ./cert.pem     $TARGET_ROOT/adblock-proxy/cert.pem;
		cp ./key.pem      $TARGET_ROOT/adblock-proxy/key.pem;


		cd $TARGET_ROOT;
		chown -R root:root $TARGET_ROOT/;


		cd $PROXY_ROOT;
		let SIZE=`du -s $TARGET_ROOT/adblock-proxy | sed s'/\s\+.*//'`+8;
		let SIZE_MB=`expr $SIZE / 1000 + 2`;


		touch "$DIST_ROOT/adblock-proxy-${VERSION}_${ARCH}.dmg";
		dd if=/dev/zero of="$DIST_ROOT/adblock-proxy-${VERSION}_${ARCH}.dmg" bs=1M count=$SIZE_MB;
		mkfs.hfsplus -v lycheejs "$DIST_ROOT/adblock-proxy-${VERSION}_${ARCH}.dmg";

		if [ ! -d /media/adblock-proxy ]; then
			mkdir -p /media/adblock-proxy;
		fi;

		mount -o loop "$DIST_ROOT/adblock-proxy-${VERSION}_${ARCH}.dmg" /media/adblock-proxy;
		cp -R $TARGET_ROOT/* /media/adblock-proxy/;
		sleep 10s;
		umount /media/adblock-proxy;

		cd "$DIST_ROOT";
		zip -r -q "./adblock-proxy-${VERSION}_${ARCH}.dmg.zip" "./adblock-proxy-${VERSION}_${ARCH}.dmg";

		rm -rf "$TARGET_ROOT";
		rm "$DIST_ROOT/adblock-proxy-${VERSION}_${ARCH}.dmg";

	fi;

}



_package_ubuntu "armhf";
_package_ubuntu "amd64";
_package_osx "amd64";



exit 0;

