bR='\e[1;31m' # BOLD RED
bY='\e[1;33m' # BOLD YELLOW
bG='\e[1;32m' # BOLD GREEN
nC='\e[0m' # NO COLOR

function launchQuickEmulator() {
  cd /c/Users/pablo/AppData/Local/Android/Sdk/emulator/ && ./emulator -avd Pixel_3a_API_34_Android_14 -no-snapshot-load -no-snapshot-save # -n-s-l = COLD BOOT
}

function waitDevice() { # PERFECTO // ESTO PRIMERO
  cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools

  if [ $(./adb -s emulator-5554 shell getprop init.svc.bootanim 2> /dev/null | grep "stopped") ]; then # 2> /dev/null --> HIDE ERRORS
    echo -e "${bG}*****  EMU SUCCESSFULLY LOADED   ||  EMU SUCCESSFULLY LOADED   ||  EMU SUCCESSFULLY LOADED   *****${nC}"
  else
    echo -e "${bY}*****  RELOADING EMULATOR..      ||  RELOADING EMULATOR..      ||  RELOADING EMULATOR..      *****${nC}"
    sleep 1s
    waitDevice
  fi
}

function killEmu() {
  cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools/ && ./adb -s emulator-5554 emu kill &
  echo -e "${bY}*****  RELOADING EMULATOR..      ||  RELOADING EMULATOR..      ||  RELOADING EMULATOR..      *****${nC}"
}

killEmu && launchQuickEmulator && waitDevice