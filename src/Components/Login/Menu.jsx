import React from 'react';
import {Menu} from 'antd';

import {store} from 'Provider/store';
import {resources} from 'localization/resources';
//languages list
import {lngList} from 'localization/languages';

// const languages =  store.iStrings.getAvailableLanguages();
// console.log('languages',i18n);

const items = Object.keys(resources).map((lng,i)=>
    <Menu.Item key={i}>
        <a href='#' onClick={(e)=>{
            e.preventDefault();
            store.changeLanguage(lng);
            }}>{lngList[lng]}</a>
    </Menu.Item>
    )

export const menu = () => (
    <Menu>
         {items}
     </Menu> 
)

