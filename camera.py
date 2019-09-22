import numpy as np
import cv2
import time
from imutils.object_detection import non_max_suppression
from imutils import resize
from libs.timeHelpers import GetMilliSecs, GetTimeStamp

isLoadPiCam = True
try:
    from imutils.video.pivideostream import PiVideoStream
except ImportError:
    isLoadPiCam = False


class Camera():
    def __init__(self, config={}):
        self.config = config
        self.flip = self.config['flip_cam']
        self.frame_width = self.config['res_x']
        self.frame_height = self.config['res_y']
        if not isLoadPiCam:
            self.cap = cv2.VideoCapture(0)
            # getting width and height from the capture device
            self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, self.frame_width)
            self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, self.frame_height)
        else:
            self.cap = PiVideoStream(resolution=(
                self.frame_width, self.frame_height)).start()
        self.canRecord = True
        self.timeWithoutBody = 0
        self.startRecordingTime = 0
        self.pauseRecording = 0
        # self.fourcc = 0x00000021
        self.fourcc = cv2.VideoWriter_fourcc(*'avc1')

        self.out = cv2.VideoWriter()
        self.maxRecordingTime = self.config['max_record_time']
        self.classifier = cv2.CascadeClassifier(self.config['classifier'])
        self.isRecording = False
        self.currentFrame = None

    def recording(self):
        if isLoadPiCam is False:
            _, img = self.cap.read()
        else:
            img = self.cap.read()
        if self.flip:
            img = cv2.flip(img, 0)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray = resize(gray, int(self.frame_width / 2),
                      int(self.frame_height / 2))

        self.isRecording = self.out.isOpened()

        objects = self.classifier.detectMultiScale(gray,
                                                   scaleFactor=1.3,
                                                   minNeighbors=5,
                                                   minSize=(30, 30))

        rects = np.array([[x, y, x + w, y + h]
                          for (x, y, w, h) in objects])
        filtered = non_max_suppression(rects, overlapThresh=0.65)
        for (x1, y1, x2, y2) in filtered:
            cv2.rectangle(img, (x1 * 2, y1 * 2), (x2 * 2, y2 * 2),
                          (0, 255, 0), 1)

            if not self.out.isOpened() and self.canRecord:
                print('starting recording')
                self.startRecordingTime = GetMilliSecs(time.time())
                self.pauseRecording = 0
                filename = self.config['video_folder'] + \
                    GetTimeStamp(time) + '.mp4'

                res = self.out.open(filename,
                                    self.fourcc,
                                    20,
                                    (self.frame_width, self.frame_height))
        if self.out.isOpened():
            self.out.write(img)
            if (self.startRecordingTime +
                    self.maxRecordingTime) < GetMilliSecs(time.time()):
                self.out.release()
                self.canRecord = False
                self.pauseRecording = GetMilliSecs(time.time())
                print('Stopped recording')

        if not self.canRecord and (self.pauseRecording +
                                   self.config['time_in_between'] <
                                   GetMilliSecs(time.time())):
            self.canRecord = True
        self.currentFrame = img

    def get_frame(self):
        if self.currentFrame is None:
            if isLoadPiCam is False:
                _, self.currentFrame = self.cap.read()
            else:
                self.currentFrame = self.cap.read()
        _, jpeg = cv2.imencode('.jpg', self.currentFrame)
        return jpeg.tobytes()

    def __del__(self):
        try:
            self.cap.release()
            cv2.destroyAllWindows()
        except:
            pass
