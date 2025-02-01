cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools/ && # GO TO ADB FOLDER
./adb -s emulator-5556 logcat | grep "D LOG" # START LISTEN emulator-5556 DEBUG LOG WITH "LOG" TAG