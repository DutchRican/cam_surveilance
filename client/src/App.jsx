import React from 'react';
import Header from './components/Header';
import CameraContainer from './components/CameraContainer';
import FileContainer from './components/FileContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const App = () => {
    return (
        <div className="container-fluid">
            <Header />
            <div className="main">
                <CameraContainer />
                <FileContainer />
            </div>
        </div>
    );
}
export default App;
