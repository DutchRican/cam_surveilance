import React from 'react';

const Settings = () => {
    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Current Configuration:</h5>
                    </div>
                    <div className="modal-body">
                        here!
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary">close</button>
                        <button className="btn btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
