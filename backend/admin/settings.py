#Set voting policies, default values

# basic setting types (with default values)
timetolive = 3600 # sec
maxvoter = 100
numberofquestions = 1
anonymous = True


#todo set, change, backtodefault

# set
def settimetolive(second):
    timetolive = second

def setmaxvoter(voter):
    maxvoter = voter

def setmuberofquestions(number):
    numberofquestions = number

def setanonymous(isitanon):
    anonymous = isitanon

# set back to default 