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

current_dir=`basename $PWD`

if pip3 install $1 >/dev/null 2>&1; then
  dir='requirements.txt'
  if ! [ "$current_dir" = "backend" ]; then
    dir='backend/requirements.txt'
  fi
  pip3 freeze | grep -i $1 >> $dir
  printf "\033[32mSuccessfully installed \033[1;36m$1\033[0m\n"
  printf "\033[32mAdded \033[1;36m$1\033[32m to requirements.txt\033[0m\n"
  if grep -qi microsoft /proc/version; then
    str="\033[33mThe script has detected that you are running in WSL, please execute \033[1;36mpip3 install -r requirements.txt\033[0m\n"
    if ! [ "$current_dir" = "backend" ]; then
      str="\033[33mThe script has detected that you are running in WSL, please execute \033[1;36mcd backend\033[33m followed by \033[1;36mpip3 install -r requirements.txt\033[0m\n"
    fi
    printf "$str"
  fi
else
  printf "\033[31mError: Failed to install \033[1;36m$1\033[31m, please ensure it's a valid PyPi package\033[0m\n" >&2
  exit 1
fi