#!/bin/bash

uptime=`uptime|sed 's/.*up \([^,]*\),.*/\1/'`
temp=`vcgencmd measure_temp | sed 's/[a-z]*=//g'`
cpu=`top -bn1|awk 'NR>7{s+=$9}END{print s}'`
memuse=`free -h|grep Mem|awk '{print$3}'`
memtot=`free -h|grep Mem|awk '{print$2}'`
diskuse=`df -h|grep /dev/root|awk '{print$3}'`
disktot=`df -h|grep /dev/root|awk '{print$2}'`

echo "Uptime: $uptime"
echo "Temperature: $temp"
echo "CPU usage: $cpu%"
echo "Mem usage: ${memuse:0:-1} of ${memtot}B"
echo "SD usage: ${diskuse:0:-1} of ${disktot}B"
