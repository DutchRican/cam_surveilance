import threading
import glob
from camera import Camera
from flask import Flask, render_template, Response, jsonify

app = Flask(__name__)
cam = None


def runCamera():
    global cam
    cam = Camera(True)
    while True:
        cam.recording()


@app.route('/')
def index():
    return render_template('index.html')


def gen(camera):
    while True:
        frame = cam.getFrame()
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
    files = glob.glob("./videos/*.avi")
    return jsonify(files)


if __name__ == '__main__':
    t = threading.Thread(target=runCamera, args=())
    t.daemon = True
    t.start()
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(host='0.0.0.0', port=3000)
