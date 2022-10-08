#!/bin/sh
uname="$(uname -s)"
chip="$(uname -p)"
case "${uname}" in
    Linux*)
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh;;
    Darwin*)
        case "${chip}" in
            i386)
                curl https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-amd64 -o Docker.dmg;;
            arm)
                curl https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=docs-driven-download-mac-arm64 -o Docker.dmg;;
            *)
                echo "Unsupported chip: ${chip} - Please install docker on your own at https://docs.docker.com/desktop/"
        esac
        sudo hdiutil attach Docker.dmg
        sudo /Volumes/Docker/Docker.app/Contents/MacOS/install
        sudo hdiutil detach /Volumes/Docker;;
    CYGWIN*|MINGW*)
        curl https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe -o installer.exe
        start /wait "installer.exe" install;;
    *)
        echo "Unsupported system: ${uname} - Please install Docker on your own at https://docs.docker.com/desktop/"
esac
