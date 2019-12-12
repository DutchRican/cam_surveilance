import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons'
import Settings from './Settings';

const Header = () => {
    return (
        <div className="page-header text-center">
            <h1 className="app-header">Home Security</h1>
            <FontAwesomeIcon className="settings-cog" icon={faCog} size="lg"></FontAwesomeIcon>
            <Settings />
        </div>
    );
}

export default Header;