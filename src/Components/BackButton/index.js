import React from 'react';

import {Icon} from 'antd';

import {history} from '../../history';
import './backButton.css';
const goBack = ()=>{
    history.goBack();
}

const BackButton =()=>(
    <Icon className='menu-back-button' type='arrow-left' onClick={goBack} />
)

export default BackButton;