echo "asdasdasd"
cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools &&
#timeout /t 3
timeout 10 ./adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main
#./adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main
# kill com.android.chrome
# ./adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main
#./adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main
#./adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main; sleep 3
#timeout /t 2