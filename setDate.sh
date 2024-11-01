cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools/ && # GO TO ADB FOLDER
./adb root && # ROOT PERMISSIONS
./adb shell date -s `TZ=GMT+3 date +%m%d%H%M%Y.%S` # SET CURRENT TIMEZONE & TIME