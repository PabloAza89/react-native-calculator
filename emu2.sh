bR='\e[1;31m' # BOLD RED
bY='\e[1;33m' # BOLD YELLOW
bG='\e[1;32m' # BOLD GREEN
nC='\e[0m' # NO COLOR

function IncreaseBuffer() {
  cd /c/Users/pablo/AppData/Local/Android/Sdk/platform-tools/ &&
  ./adb logcat -G 16M
}

test