import pytest
import time
import re
from ..libs.timeHelpers import GetMilliSecs, GetTimeStamp


@pytest.mark.describe("rounding the time stamp down")
def test_GetMilliSecs_lowval():
    val = 1234.001
    assert GetMilliSecs(val) == 1234


@pytest.mark.describe("rounding the time stamp up")
def test_GetMilliSecs_highVal():
    val = 1234.5001
    assert GetMilliSecs(val) == 1235


@pytest.mark.describe("rounding the time stamp at mid point down")
def test_GetMilliSecs_midVal():
    val = 1234.500
    assert GetMilliSecs(val) == 1234


@pytest.mark.describe("Gets nice timestamp format")
def test_GetTimeStamp():
    uglyDateStampMatch = "(\d{2}-){2}\d{4}_(\d{2}-?){3}"
    timestamp = GetTimeStamp(time)
    assert type(timestamp) is str
    assert re.match(uglyDateStampMatch, timestamp)
