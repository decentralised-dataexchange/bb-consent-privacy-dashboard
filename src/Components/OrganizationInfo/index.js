import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './orgInfo.css';
import { Avatar, Empty } from 'antd';

import { store } from 'Provider/store';

// import test from 'Components/CoverImage/test.png';

@observer
class OrganizationInfo extends Component {
    render() {
        const { name: Name, location: Location, policyUrl: PolicyURL } = store.organizationStore.data;
        const { logoImageURI, logoImageDescription } = store.organizationStore;
        return (
            <div className='organization-info'>
                {logoImageURI ? <Avatar className='organization-info-avatar' src={logoImageURI} /> :
                    <Avatar className='organization-info-avatar'><Empty description={logoImageDescription} /></Avatar>}
                <div className='description'>
                    <p className='description-title'>{Name || 'No Name'}</p>
                    {/*<p className='description-subtitle'>{`Type : ${Type && Type.Type || 'No Type'}`}</p>*/}
                    <p className='description-subtitle'>{Location || 'No Location'}</p>
                    {(PolicyURL) ? <a className='description-subtitle' href={PolicyURL}>{PolicyURL}</a> : <p
                        className='description-subtitle'>No policy URL</p>}
                </div>
            </div>
        );
    }
}

export default OrganizationInfo;