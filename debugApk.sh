#
# THIS SCRIPT COPY AND PASTE OLD DEBUG APK's IN ./debugOld FOLDER THEN ASEMBLE LATEST APK
#

cd android/app/build/outputs/apk/debug/                               # GO TO DEBUG FOLDER
start .                                                               # OPEN FOLDER IN FILE EXPLORER
cd ..                                                                 # LEVEL DOWN TO APK FOLDER

test -d ./debugOld                                                    # FOLDER QUERY // CHECK IF DEBUGOLD FOLDER EXISTS
testT=$(echo $?)                                                      # EXECUTE & SAVE QUERY IN VAR // 1 = NO EXISTS // 0 = EXISTS //

if [ "$testT" = 1 ]; then                                             # DIRECTORY IS 1 // NO EXISTS
  mkdir -p ./debugOld                                                 # IF NO EXISTS, CREATE OLD DIR
fi

cd debugOld/                                                          # GO TO DEBUGOLD FOLDER

files=$(find "./" -type f | wc -l)                                    # COUNT FILES IN DEBUGOLD FOLDER
if [ $files -eq 0 ]; then                                             # IF EMPTY
  cd ..                                                               # LEVEL DOWN
  mv ./debug/app-debug.apk ./debugOld/app-debug.apk                   # MOVE APK TO EMPTY FOLDER
  mv ./debug/output-metadata.json ./debugOld/output-metadata.json     # MOVE JSON TO EMPTY FOLDER
else                                                                  # IF NOT EMPTY
  declare -a arr                                                      # DECLARE ARRAY
  for file in *.apk                                                   # LOOP FILTERING NUMBERS IN FILENAMES
  do                                                                  # LOOP FILTERING NUMBERS IN FILENAMES
    arr=( $( ls | sed -e s/[^0-9]//g ) )                              # LOOP FILTERING NUMBERS IN FILENAMES // FILTER ONLY NUMBERS
  done                                                                # LOOP FILTERING NUMBERS IN FILENAMES
  max=                                                                # DECLARE MAX NUMBER VARIABLE
  IFS=$'\n'                                                           # INTERNAL FIELD SEPARATOR // NEW LINE
  max=$(echo "${arr[*]}" | sort -nr | head -n1)                       # SAVE MAX IN VARIABLE // -nr = NUMBER, REVERSE // -n1 = ONLY ONE RESULT (THE MAX)
  ((max=max+1))                                                       # INCREASE IN ONE
  cd ..                                                               # LEVEL DOWN
  mv ./debug/app-debug.apk ./debugOld/app-debug$max.apk               # MOVE APK WITH +1 IN FILENAME TO OLD FOLDER
  mv ./debug/output-metadata.json ./debugOld/output-metadata$max.json # MOVE JSON WITH +1 IN FILENAME TO OLD FOLDER
fi

cd ../../../../..                                                     # RETURN MAIN PATH
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res # CREATE BASE FILES FOR LATER APK
cd android/                                                           # GO ANDROID FOLDER
./gradlew assembleDebug                                               # ASSEMBLE DEBUG APK
cd ..                                                                 # RETURN MAIN FOLDER

exec bash                                                             # EJECUTE BOURNE-AGAIN SHELL SCRIPT