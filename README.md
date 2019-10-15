# Recording and streaming RaspberryPi footage
+ make sure that you have installed virtualenv for python3
+ have some room on the storage device since this is for now creating files under the videos folder

## Create a virtual environment
`python3 -m venv /path/to/environments/folder`

## source it
+ /path/to/environments/folder/bin/activate

## Install the dependencies
`pip install -r requirements.txt`

## Run the camera
`python main.py`

## Run the front-end
`cd client
npm run serve`

