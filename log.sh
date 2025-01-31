cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools/ && # GO TO ADB FOLDER
./adb -s emulator-5554 logcat | grep "D LOG" # START LISTEN DEBUG LOG WITH "LOG" TAG

#./adb devices #List of devices attached
#emulator-5554   device
#emulator-5556   device

#cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools/ && # GO TO ADB FOLDER
#./adb logcat -s LOG:D # START LISTEN DEBUG LOG WITH "LOG" TAG