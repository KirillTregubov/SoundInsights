@echo off

wsl docker -v >nul 2>&1 && echo Docker is installed. && goto :EOF
echo:
echo [32mThe following script will install the latest version of [92mUbuntu[32m through [92mWindows Subsystem for Linux[32m on your machine.[0m
choice /D N /T 30 /M "Agree to install these components (Y/N)?" /N
if errorlevel 2 goto :EOF

echo:
echo [32mInstalling Ubuntu on WSL2...[0m

wsl --install -d Ubuntu

echo:
echo [32mPlease unpause only when Ubuntu is installed and it asks to "Enter new UNIX username" [0m
pause

echo:
echo [32mDownloading Docker Desktop...[0m

start /wait /b curl https://desktop.docker.com/win/main/amd64/Docker%%20Desktop%%20Installer.exe -o "Docker Desktop Installer.exe"

echo:
echo [32mInstalling Docker Desktop...[0m
@REM Known bug: --quiet doesn't work
start /wait "" "Docker Desktop Installer.exe"
 
del "Docker Desktop Installer.exe"

echo:
echo [32mPlease open [92mDocker Desktop[32m to complete installation. The environment is ready when the Engine is running.[0m