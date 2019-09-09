import threading
import os
import glob
import json
from camera import Camera
from flask import Flask, render_template, Response, jsonify, request, send_file
from libs.config import LoadConfig

app = Flask(__name__)
cam = None
isWindows = os.name == 'nt'


def runCamera():
    global cam
    cam = Camera(config=LoadConfig())

    while True:
        cam.recording()


def gen(camera):
    while True:
        frame = cam.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@app.route('/feed')
def video_feed():
    if cam is not None:
        return Response(gen(cam),
                        mimetype='multipart/x-mixed-replace; boundary=frame')
    else:
        return Response('Preparing camera',)


@app.route('/camStatus')
def cam_status():
    if cam is not None:
        return Response(str(cam.isRecording).lower())
    else:
        return Response('False')


@app.route('/savedFiles')
def saved_files():
    files = glob.glob("./videos/*.mp4")
    return jsonify(files)


@app.route('/stored')
def get_file():
    fileToGet = request.args.get('clip')
    return send_file(fileToGet, attachment_filename="test.mp4")


def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    if request.method == 'OPTIONS':
        response.headers['Access-Control-Allow-Methods'] = 'GET'
        headers = request.headers.get('Access-Control-Request-Headers')
        if headers:
            response.headers['Access-Control-Allow-Headers'] = headers
    return response
app.after_request(add_cors_headers)

if __name__ == '__main__':
    t = threading.Thread(target=runCamera, args=())
    t.daemon = True
    t.start()
    app.run(host='0.0.0.0', port=3000)
