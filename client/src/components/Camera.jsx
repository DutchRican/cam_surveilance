import React from 'react';

const Camera = ({camera}) => {
    return (
        <div className="card cam_card">
            <div className="card-header">
                <p className="float-left">{camera.name}</p>
                <p className="float-right">
                    status:
                </p>
            </div>
            <img src="stream_url" alt="video" className="cam-feed media-object"/>
            <div className="card-footer"></div>
        </div>
    );
}


export default Camera;
