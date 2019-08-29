import time


def GetMilliSecs():
    return int(round(time.time()))


def GetTimeStamp():
    return str(time.strftime('%d-%m-%Y_%H-%M-%S'))
