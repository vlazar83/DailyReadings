FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --username "root" --password "example" --authenticationDatabase "admin" --db dailyReadingsDB --collection dailyReadings --type json --file /init.json --jsonArray