@echo off

rem ##### ENSURE THE ANDROID SDK LOCATION BELOW IS CORRECT #######
set "DEFAULT_ANDROID_SDK_LOCATION_WIN=%LOCALAPPDATA%\Android\Sdk"
set "DEFAULT_ANDROID_SDK_LOCATION_WIN_VS=C:\Program Files (x86)\Android\android-sdk"

rem script version 2.0
rem ############ DO NOT Modify below this line ############

set "EMULATOR_PATH=emulator\emulator.exe"
if /i "%~1" == "vs" (
    set "ANDROID_SDK_LOCATION=%DEFAULT_ANDROID_SDK_LOCATION_WIN_VS%"
) else (
    if "%ANDROID_HOME%" == "" (
        if "%ANDROID_SDK_ROOT%" == "" (
            set "ANDROID_SDK_LOCATION=%DEFAULT_ANDROID_SDK_LOCATION_WIN%"
        ) else (
            set "ANDROID_SDK_LOCATION=%ANDROID_SDK_ROOT%"
        )
    ) else (
        set "ANDROID_SDK_LOCATION=%ANDROID_HOME%"
    )
)
set "EMULATOR=%ANDROID_SDK_LOCATION%\%EMULATOR_PATH%"

set "WORKDIR=%~dp0"
if "%WORKDIR%" == "" set "WORKDIR=.\"

if exist "%WORKDIR%\set_os_path.bat" call "%WORKDIR%\set_os_path.bat"

set "API_LEVEL=%~3"
echo %API_LEVEL%| findstr /r /c:"^[1-9][0-9]*$" >nul
if %errorlevel% neq 0 (
    echo "API level is not valid !"
    exit /b 1
)

set "AVD_NAME=Surface_Duo"
set "QEMU_ARGS=androidboot.hardware.displaymask=duo"

set "DEVICE_NAME=%~2"
if "%DEVICE_NAME%" == "SurfaceDuo" (
    set "AVD_NAME=%AVD_NAME%_API_%API_LEVEL%"
) else if "%DEVICE_NAME%" == "SurfaceDuo2" (
    set "AVD_NAME=%AVD_NAME%_2_API_%API_LEVEL%"
    set "QEMU_ARGS=%QEMU_ARGS%2"
) else (
    echo "Device name is not valid !"
    exit /b 1
)

rem Check if emulator is installed
echo "Emulator location: %EMULATOR%"

if exist "%EMULATOR%" (
    set "ANDROID_EMULATOR_HOME=%WORKDIR%\.android"
    set "ANDROID_AVD_HOME=%WORKDIR%\.android\avd"

    "%EMULATOR%" -avd "%AVD_NAME%" "%~4" "%~5" "%~6" "%~7" -verbose -sysdir "%WORKDIR%\system-images" -system "%WORKDIR%\system-images\system.img" -kernel "%WORKDIR%\system-images\kernel-ranchu" -vendor "%WORKDIR%\system-images\vendor.img" -ramdisk "%WORKDIR%\system-images\ramdisk.img" -initdata "%WORKDIR%\system-images\userdata.img" -datadir "%WORKDIR%\.android\avd\%AVD_NAME%.avd" -data "%WORKDIR%\.android\avd\%AVD_NAME%.avd\userdata-qemu.img" -qemu -append "%QEMU_ARGS%"
) else (
    echo "Can't find emulator executable, make sure it's installed!"
)
