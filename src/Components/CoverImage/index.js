import React, { Component } from 'react';
import {observer} from 'mobx-react';
import './coverImage.css';
import { Empty } from 'antd';
// import picTest from './test.png';
import {store} from 'Provider/store';

@observer
class CoverImage extends Component {
    render() {
        const {coverImageURI,coverImageDescription} = store.organizationStore;
        return (
            <div className='cover-image'>
                {coverImageURI?<img src={coverImageURI} alt="cover-pic"/>:<Empty className='empty-icon' description={coverImageDescription} />}
            </div>
        );
    }
}

export default CoverImage;