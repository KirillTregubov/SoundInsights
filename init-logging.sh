#!/bin/sh
# Run this in the beginning of your shell script to copy its output to a log file in the logs directory.

if [ ! -d "logs" ]
    then mkdir logs
fi
if [ ! -d "logs/$1" ]
    then mkdir logs/$1
fi
start="$(date "+%Y-%m-%d--%H-%M-%S")"
touch ./logs/$1/$start.log
exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1> >(tee ./logs/$1/$start.log) 2>&1
