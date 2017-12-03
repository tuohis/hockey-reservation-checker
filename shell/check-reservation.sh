#!/bin/bash

if [ $# -lt 2 ]; then
	echo "Usage: $0 search-string week-number"
	exit 1
fi

curl -s "http://www.helsinginjaahalli.fi/jaavuorot/vko$2.htm" | grep -qi "$1"

