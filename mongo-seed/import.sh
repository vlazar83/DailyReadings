#! /bin/bash

mongoimport --host mongodb --db dailyReadingsDB --collection dailyReadings --type json --file ./mongo-seed/init.json --jsonArray