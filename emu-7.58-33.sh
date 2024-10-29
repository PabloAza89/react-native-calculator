bR='\e[1;31m' # BOLD RED
bY='\e[1;33m' # BOLD YELLOW
bG='\e[1;32m' # BOLD GREEN
nC='\e[0m' # NO COLOR

function launchQuickEmulator() {
  cd /c/Users/pablo/AppData/Local/Android/Sdk/emulator/ && ./emulator -avd Pixel_Fold_7.58_API_33_Android_13 -no-snapshot-load -no-snapshot-save # -n-s-l = COLD BOOT
}

function waitDevice() { # PERFECTO // ESTO PRIMERO
  cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools

  if [ $(./adb -s emulator-5554 shell getprop init.svc.bootanim 2> /dev/null | grep "stopped") ]; then # 2> /dev/null --> HIDE ERRORS
    echo -e "${bG}***  EMU SUCCESSFULLY LOADED  ||  EMU SUCCESSFULLY LOADED  ***${nC}" && nextScript
  else
    echo -e "${bY}***  LAUNCHING EMULATOR..     ||  LAUNCHING EMULATOR..     ***${nC}"
    sleep 1s
    waitDevice
  fi
}

function nextScript() {
  cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools/ &&
  ./adb logcat -G 16M && # INCREASE BUFFER SIZE
  ./adb root && # ROOT PERMISSIONS
  ./adb shell settings put global auto_time 0 && # DISABLE "SET TIME AUTOMATICALLY"
  ./adb shell setprop persist.sys.timezone "America/Buenos_Aires" && # SET TIMEZONE
  ./adb shell settings put system time_12_24 24 && # SET 24-HOUR FORMAT
  ./adb shell "date $(date +%m%d%H%M%G.%S)" && # SET CURRENT TIME
  ./adb shell "am broadcast -a android.intent.action.TIME_SET" # SET CURRENT TIME
}

launchQuickEmulator & waitDevice