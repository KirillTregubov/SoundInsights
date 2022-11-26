#!/bin/sh
# Run this in the beginning of your shell script to copy its output to a log file in the logs directory.

exec 3>&1 4>&2
trap 'exec 2>&4 1>&3' 0 1 2 3
exec 1> >(tee ./script-logs/$1) 2>&1
