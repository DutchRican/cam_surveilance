import pytest
import cv2
import numpy as np
from ..camera import Camera
from ..libs.config import LoadConfig


@pytest.fixture
def cam(mocker):
    mocker.patch.object(cv2, 'VideoCapture')
    
    return Camera(config=LoadConfig())


@pytest.mark.describe('release is done')
def test_release_cam(mocker, cam):
    mocker.spy(cam, 'cap')

    assert cam is not None
    cam.__del__()
    assert cam.cap.release.call_count == 1


@pytest.mark.describe('dimensions are read for the cam')
def test_cam_dimensions(cam):
    assert cam.frame_height is not None


@pytest.mark.describe('getting frame as jpg to bytes')
def test_get_frame(cam):
    # creating an empty img
    img = np.zeros([100, 100, 3], dtype=np.uint8)
    cam.cap.read.return_value = None, img
    _, jpg = cv2.imencode('.jpg', img)
    assert cam.get_frame() == jpg.tobytes()
