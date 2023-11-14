import React, { Component } from 'react';
//i18n
import { withNamespaces } from "react-i18next";


const Title = ({t})=>(
   <React.Fragment>
        <h4>{t('dashboard.name')}</h4>
   </React.Fragment>
)

export default withNamespaces()(Title);