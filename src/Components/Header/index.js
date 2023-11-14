import React, { Component } from 'react';
import './header.css';

import Title from './Title';
import UserSettings from './UserSettings';
import Home from './HomeButton';
class Header extends Component {
    render() {
        return (
            <div className='header' style={{ backgroundColor: "#0a065e" }}>
                <Title />
                <div><Home /><UserSettings /></div>
            </div>
        );
    }
}

export default Header;