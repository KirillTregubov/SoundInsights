#!/bin/sh

if [ -z "$1" ]; then
  printf "\033[31mError: Usage: $0 <PyPi package>\033[0m\n" >&2
  exit 1
fi

if ! [ -x "$(command -v pip3)" ];
then
  printf "\033[31mError: pip3 must be installed\033[0m\n" >&2
  exit
fi

if pip3 install $1 >/dev/null 2>&1; then
  pip3 freeze | grep $1 >> requirements.txt
  printf "\033[32mSuccessfully installed \033[1;36m$1\033[0m\n"
  printf "\033[32mAdded \033[1;36m$1\033[32m to requirements.txt\033[0m\n"
  if grep -qi microsoft /proc/version; then
    printf "\033[33mThe script has detected that you are running in WSL, please execute \033[1;36mpip3 install -r requirements.txt\033[0m\n"
  fi
else
  printf "\033[31mError: Failed to install \033[1;36m$1\033[31m, please ensure it's a valid PyPi package\033[0m\n" >&2
  exit 1
fi