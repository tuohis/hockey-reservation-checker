#!/bin/bash

if [ $# -lt 1 ]; then
	echo "Usage: $0 reservation-name"
fi

CUR_WEEK=$(date +"%V")
NEXT_WEEK=$((CUR_WEEK+1))

echo "Next week: week #$NEXT_WEEK"

./check-reservation.sh $1 $NEXT_WEEK

