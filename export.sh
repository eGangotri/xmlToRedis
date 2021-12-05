#!/bin/bash
#chmod +x ./export.sh

STRING="Welcome to Xml to Redis"
echo $STRING

echo "$1 $2";

if [[ $1 -eq "-v" ]]
then
  yarn xml2redis_verbose $2  
else
  yarn xml2redis $1
fi
