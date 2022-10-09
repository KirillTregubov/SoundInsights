#!/bin/sh
printf "\n\033[32mRunning \033[1mTesting \033[0;32menvironment\033[0m\n"

if ! [ -x "$(command -v docker compose)" ]; then
  printf "\n\033[31mError: \033[1;36mDocker \033[0;31mis not installed\033[0m\n\n" >&2
  exit 1
fi

printf "\n\033[32mCreating and starting \033[1;36mDocker \033[0;32mcontainers\033[0m\n"
printf "\033[33mTip: Use \033[1mCtrl + C\033[0;33m to cancel or close \033[1;36mDocker\033[0m\n\n"
docker compose --file docker-compose-tests.yml up --build

printf "\n\033[32mRemoving \033[1;36mDocker \033[0;32mcontainers\033[0m\n\n"
docker compose --file docker-compose-tests.yml down