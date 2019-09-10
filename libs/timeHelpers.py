def GetMilliSecs(time):
    """ Needs time.time() passed
    Rounded value as Int is returned
    """
    return int(round(time))


def GetTimeStamp(time):
    """ Needs the full time object passed
    """
    return str(time.strftime('%d-%m-%Y_%H-%M-%S'))
