#!/bin/sh
# Tested on macOS 11.7 and Windows 10 21H2

if [ -x "$(command -v docker)" ]; then
  printf "\n\033[31mError: \033[1;36mDocker \033[0;31mis already installed\033[0m\n" >&2
  exit 1
fi

uname="$(uname -s)"
chip="$(uname -p)"
case "${uname}" in
    Linux*)
        printf "\033[32mDownloading \033[1;36mDocker\033[0m\n"
        curl -fsSL https://get.docker.com -o get-docker.sh
        printf "\n\033[32mInstalling \033[1;36mDocker\033[0m\n"
        sh get-docker.sh
        printf "\n\033[1;32mInstallation complete\033[0m\n";;
    Darwin*)
        case "${chip}" in
            i386)
                printf "\033[32mDownloading \033[1;36mDocker\033[0m\n"
                curl https://desktop.docker.com/mac/main/amd64/Docker.dmg -o Docker.dmg;;
            arm)
                printf "\033[32mDownloading \033[1;36mDocker\033[0m\n"
                curl https://desktop.docker.com/mac/main/arm64/Docker.dmg -o Docker.dmg;;
            *)
                printf "\n\033[31mError: Unsupported chip ${chip} - Please install docker on your own at \033[1;36mhttps://docs.docker.com/desktop/\033[0m\n\n" >&2
                exit 1;;
        esac
        printf "\n\033[32mInstalling \033[1;36mDocker\033[0m\n"
        sudo hdiutil attach Docker.dmg
        sudo /Volumes/Docker/Docker.app/Contents/MacOS/install
        sudo hdiutil detach /Volumes/Docker
        rm Docker.dmg
        printf "\n\033[1;32mPlease open the Docker Desktop app to complete installation. The environment is ready when the Engine is running.\033[0m\n";;
    *)
        echo "Unsupported system: ${uname} - Please install Docker on your own at https://docs.docker.com/desktop/"
esac