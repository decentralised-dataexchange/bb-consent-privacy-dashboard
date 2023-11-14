import React, { Component } from 'react';
import './tab.css';
import BackButton from 'Components/BackButton';


class Tab extends Component {

    render() {
        const { title } = this.props;
        return (
            <div className='menu-tab'>
                {/* <BackButton /> */}
                <div className='menu-tab-header'><p style={{ fontSize: "16px" }}>{title}</p></div>
                {this.props.children}
            </div>
        );
    }
}

export default Tab;