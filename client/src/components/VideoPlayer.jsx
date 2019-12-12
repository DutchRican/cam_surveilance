import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const VideoPlayer = ({ video, clipName }) => {
    return (
        <div className="col-md-6 col-sm-6 col-xs-6">
            <div className="card">
                <div className="card-header">
                    <p>Previous footage: {clipName}</p>
                </div>
                <video
                    src={video}
                    autoplay
                    controls
                    preload="metadata" alt="video"
                    className="media-object"></video>
            </div>
            <button className="btn btn-secondary go-back">
                <FontAwesomeIcon icon={faArrowLeft} />Live
            </button>
        </div>
    );
}

export default VideoPlayer;