#!/bin/bash


# assumes 2 env variables: KEYSTORE_FILE_HEX & KEYSTORE_PASSWORD
#
# PS. to turn file to hex and back:
#     $ xxd -plain test.txt > test.hex
#     $ xxd -plain -revert test.hex test2.txt


echo $KEYSTORE_FILE_HEX > cypherbox-release-key.keystore.hex
xxd -plain -revert cypherbox-release-key.keystore.hex > ./android/cypherbox-release-key.keystore
rm cypherbox-release-key.keystore.hex

cd android
TIMESTAMP=$(date +%s)
sed -i'.original'  "s/versionCode 1/versionCode $TIMESTAMP/g" app/build.gradle
./gradlew assembleRelease
mv ./app/build/outputs/apk/release/app-release-unsigned.apk ./app/build/outputs/apk/release/app-release.apk
echo wheres waldo?
find $ANDROID_HOME | grep apksigner | grep -v jar
$ANDROID_HOME/build-tools/34.0.0/apksigner sign --ks ./cypherbox-release-key.keystore   --ks-pass=pass:$KEYSTORE_PASSWORD ./app/build/outputs/apk/release/app-release.apk

