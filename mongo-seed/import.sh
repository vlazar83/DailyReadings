#! /bin/bash

mongoimport --host mongodb --db dailyReadingsDB --username "root" --password "root" --authenticationDatabase=admin --collection dailyReadings --type json --file ./mongo-seed/init.json --jsonArray