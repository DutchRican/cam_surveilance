import React from 'react';
import VideoPlayer from './VideoPlayer';
import Camera from './Camera';

const CameraContainer = ({isliveFeed}) => {
    return (
        <div className="card main-card">
            <div className="card-header">
                <p>Your Cameras:</p>
            </div>
            <div className="card-body">
                <div className="row">
               {isliveFeed &&  <VideoPlayer video="" clipName="" ></VideoPlayer>}
               <div className="col-md-6 col-sm-6 col-xs-6">
                   <Camera stream="temp" camera="temp"/>
               </div>
                </div>
            </div>
        </div>
    );
}

export default CameraContainer;
