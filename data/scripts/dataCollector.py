# Collects data from frontEnd, and prints the result.
# This result needs to be manually checked and cleared, and prepared in csv format for the next script
# The format after the manual work should look like this in csv:
# year;month;day;firstReading;secondReading
# Example:
# yyyy;mm;dd;reading from Bible  (<a target='_new' href='https://abc/abc'>reference from Bible</a>);
# reading from Bible  (<a target='_new' href='https://abc/abc'>reference from Bible</a>)

import requests

#return position of the 2nd occurence
def find_string(txt, str1):
    return txt.find(str1, txt.find(str1)+1)

# for february we need better calculation - TODO
def getMaxDayFromMonth(i):
    switcher = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    }
    return switcher.get(i, "Invalid month (1-12)")

def getDailyReading(year, month, day):

    if( len(str(month)) < 10 ) :
        month = str(month).rjust(2, '0')

    if (len(str(day)) < 10):
        day = str(day).rjust(2, '0')

    r = requests.get("https://www.evangelikus.hu/oldal/a-mai-nap-igei?d="+str(year)+"-"+str(month)+"-"+str(day))
    r.encoding = r.apparent_encoding

    # check starting position of substirng : "</form></p></div><h2>"
    startingPosition = r.text.index("</form></p></div><h2>");

    # check starting position of substirng : "(<a target='_new' href='https://szentiras.hu/RUF/"
    endingPosition = find_string(r.text, "(<a target='_new' href='https://szentiras.hu/RUF/")+100

    return r.text[startingPosition: endingPosition]

def cutter(str):

    # check starting position of substirng : "<br /><p><i>"
    startingPosition = 0

    # check starting position of second occurence of substirng : "(<a target='_new' href='https://szentiras.hu/RUF/"
    endingPosition = find_string(str, "(<a target='_new' href='https://szentiras.hu/RUF/")

    strIntermediate = str[startingPosition: endingPosition+90]

    # second cut
    date = strIntermediate[21:33]

    # third cur
    startingPosition = strIntermediate.index("</i></p><p>")+11

    return date + ";" + strIntermediate[startingPosition: ]

year = 2021
month = 1
day = 1
dailyReadings = []
yearEndReached = True
counter = 0

while yearEndReached:

    if month == 12 and day == 31:
        yearEndReached = False

    dayMax = getMaxDayFromMonth(12)
    dailyReadings.append(getDailyReading(year, month, day))
    print(cutter(dailyReadings[counter]))

    counter += 1
    day += 1
    if (day > dayMax):
        month += 1
        day = 1