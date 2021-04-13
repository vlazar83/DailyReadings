# Creates the JSON format about the dailyReadings
# After dataCollector and manual work, the data has to look like this:
# year;month;day;firstReading;secondReading
# Example:
# yyyy;mm;dd;reading from Bible  (<a target='_new' href='https://abc/abc'>reference from Bible</a>);
# reading from Bible  (<a target='_new' href='https://abc/abc'>reference from Bible</a>)


import csv
import json
from json import JSONEncoder

#return position of the 2nd occurence
def find_string(txt, str1):
    return txt.find(str1, txt.find(str1)+1)

class dailyReading():
  def __init__(self, year, month, day, firstReading, firstReadingShort, firstReadingLink, secondReading, secondReadingShort, secondReadingLink):
    self.year = year
    self.month = month
    self.day = day
    self.firstReading = firstReading
    self.firstReadingShort = firstReadingShort
    self.firstReadingLink = firstReadingLink
    self.secondReading = secondReading
    self.secondReadingShort = secondReadingShort
    self.secondReadingLink = secondReadingLink

class readingEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__

def getReading(txt):
    endingPosition = txt.index("(<a target='_new'")-3
    return txt[0: endingPosition]

def getReadingLink(txt):
    startingPosition = txt.index("href='")+6
    endingPosition = txt.index("'>")-2
    return txt[startingPosition: endingPosition]

def getReadingShort(txt):
    startingPosition = txt.index("'>")+2
    endingPosition = txt.index("</a>)")
    return txt[startingPosition: endingPosition]

dailyReadings = []

with open('../dailyReadings.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            #print(f'year : \t{row[0]} month {row[1]} day {row[2]}  First:  {row[3]} Second: {row[4]} ')
            dailyReadings.append(dailyReading(row[0], row[1], row[2], getReading(row[3]), getReadingShort(row[3]), getReadingLink(row[3]), getReading(row[4]), getReadingShort(row[4]), getReadingLink(row[4])))
            line_count += 1
    print(f'Processed {line_count} lines.')

    #for x in dailyReadings:
    #    print(x.year, ".", x.month, ".", x.day, ". ", x.firstReading, "; ", x.firstReadingShort, "; ", x.firstReadingLink, "; ", x.secondReading, "; ", x.secondReadingShort, "; ", x.secondReadingLink, "; ")

readingsJSONData = json.dumps(dailyReadings, indent=4, cls=readingEncoder, ensure_ascii=False).encode('utf8')
print(readingsJSONData.decode())
