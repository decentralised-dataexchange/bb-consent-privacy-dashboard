import React from "react";
import { Dropdown } from "antd";
import {menu} from './Menu';


export const LanguageSelector = ({t}) => (
  <Dropdown overlay={menu} placement="topCenter" trigger={["click"]}>
    <a href='#' style={{marginBottom:10,fontSize:13}}>{t("language")}</a>
  </Dropdown>
);
