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

def find_first_string(txt, str1):
    return txt.find(str1, txt.find(str1))

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

# for february we need better calculation - TODO
def printDatum(year, month, day):

    if( len(str(month)) < 10 ) :
        month = str(month).rjust(2, '0')

    if (len(str(day)) < 10):
        day = str(day).rjust(2, '0')

    print(str(year) + ";" + str(month) + ";" + str(day) + ";", end='')

    return

def getDailyReading(year, month, day):

    if( len(str(month)) < 10 ) :
        month = str(month).rjust(2, '0')

    if (len(str(day)) < 10):
        day = str(day).rjust(2, '0')

    url = 'https://www.evangelikus.hu/hitunk/lelki-taplalek?napi-ige-nap='+str(year)+"-"+str(month)+"-"+str(day)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}

    r = requests.get(url, headers=headers, verify=False)

    #r = requests.get("https://www.evangelikus.hu/hitunk/lelki-taplalek?napi-ige-nap=2022-01-09",verify=False,allow_redirects=False)
    #r = requests.get("https://www.evangelikus.hu/hitunk/lelki-taplalek?napi-ige-nap="+str(year)+"-"+str(month)+"-"+str(day),verify=False)
    r.encoding = r.apparent_encoding

    # check starting position of substirng : "</form></p></div><h2>"
    startingPosition = r.text.index("<h5>Napi igék</h5>");

    # check starting position of substirng : "(<a target='_new' href='https://szentiras.hu/RUF/"
    endingPosition = find_first_string(r.text, "<h5>Olvasmányok</h5>")

    return r.text[startingPosition: endingPosition]

def cutter(str):

    # check starting position of substirng : "<br /><p><i>"
    startingPosition = 0

    # check starting position of second occurence of substirng : "(<a target='_new' href='https://szentiras.hu/RUF/"
    endingPosition = find_first_string(str, "Olvasmányok")

    strIntermediate = str[startingPosition: endingPosition+90]

    # second cut
    date = strIntermediate[21:33]

    # third cur
    startingPosition = strIntermediate.index("</i></p><p>")+11

    return date + ";" + strIntermediate[startingPosition: ]

year = 2022
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
    #print(cutter(dailyReadings[counter]))

    printDatum(year, month, day)
    print(dailyReadings[counter])

    counter += 1
    day += 1
    if (day > dayMax):
        month += 1
        day = 1