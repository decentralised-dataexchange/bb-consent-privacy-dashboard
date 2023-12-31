import React, { Component, createRef } from 'react';
import { observer } from 'mobx-react';
import './collapse.css';

import { Collapse, Icon, Spin } from 'antd';
import { PanelHeaderWithNamespace } from './PanelHeader';
import { SubCollapse } from './SubCollapse';
import { store } from 'Provider/store';
import { withNamespaces } from "react-i18next";

const Panel = Collapse.Panel;


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

@observer
class CollapseUsage extends Component {

    constructor(props) {
        super(props);
        this.elemRefs = [];

        this.state = {
            openKey: [],
            scrolled: false
        };

        this.delta = this.delta.bind(this);
    }

    delta(index) {
        this.setState({ openKey: index });

    }

    componentDidMount() {
        store.dataAgreements.isFetching = true;
        store.fetchPurposes();
    }



    handleSwitch = (dataAgreement, value, e) => {
        e.stopPropagation();
        if (dataAgreement["isUpdate"]) {
            store.updateConsentRecord(dataAgreement["consentRecords"]["id"], dataAgreement["id"], dataAgreement["consentRecords"]["individualId"], value);
        } else {
            store.createConsentRecord(dataAgreement["id"]);
        }
    };


    render() {
        const { isFetching, data, loadingUiStore } = store.dataAgreements;
        const { t } = this.props;
        let openKey = "";
        if (isFetching) {
            return (
                <div className='dashboard-spin'><Spin tip={t('userPurposes.fetchingMessage')} indicator={antIcon} />
                </div>
            )
        }

        this.elemRefs = data.reduce((acc, value) => {
            acc[value['id']] = createRef();
            return acc;
        }, {});

        // Todo : Need to fix the toggle, purpose highlight.

        return (

            !data ? null : <Collapse
                className='collapse-usage'
                bordered={false}
                defaultActiveKey={openKey.toString()}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
                {!data ? null : data.map((dataAgreement, i) => {
                    const consented = dataAgreement["consentRecords"] === null ? 0 : (dataAgreement["consentRecords"]["optIn"] ? dataAgreement['dataAttributes'].length : 0);
                    const checked = dataAgreement["consentRecords"] === null ? false : dataAgreement["consentRecords"]["optIn"];
                    return (
                        <Panel header={<Spin key={i} spinning={loadingUiStore[dataAgreement["id"]]}>
                            <PanelHeaderWithNamespace
                                elemRef={this.elemRefs[dataAgreement["id"]]}
                                policyURL={dataAgreement['policy']['url']}
                                disabled={dataAgreement['isDisabled']}
                                consented={consented}
                                total={dataAgreement['dataAttributes'].length}
                                checked={checked}
                                onChange={(value, e) => this.handleSwitch(dataAgreement, value, e)}
                                text={`${dataAgreement['purpose']}`}
                                description={`${dataAgreement['purposeDescription']}`}
                            />
                        </Spin>} key={i} className={`panel-usage panel-usage-${dataAgreement['id']}`}>

                            {!dataAgreement['dataAttributes'] ? null : dataAgreement['dataAttributes'].map((dataAttribute, i) =>
                                <SubCollapse
                                    key={i}
                                    lawfulUsage={dataAgreement['isDisabled']}
                                    title={dataAttribute['name']}
                                    consented={checked} />
                            )}
                        </Panel>
                    )
                })}
            </Collapse>
        );
    }
}

export default withNamespaces()(CollapseUsage);
