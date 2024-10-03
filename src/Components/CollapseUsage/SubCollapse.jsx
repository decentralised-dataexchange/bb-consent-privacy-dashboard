import React from "react";
import { Collapse, Radio, Icon, Slider } from "antd";
// import Config from '../../app.config';
import { store } from "Provider/store";

const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;

export const SubCollapse = ({ title, consented, lawfulUsage }) => (

  <Collapse
    className="collapse-usage bg-transparent"
    bordered={false}
    expandIcon={({ isActive }) => (
      <Icon type="caret-right" rotate={isActive ? 90 : 0} />
    )}
  >
    <Panel className="sub-collapse-panel" header={title} key="1" style={{marginTop:  "5px"}}>
      <div className="group">
        <RadioGroup
          className="radio-group-small"
          disabled={true}
          defaultValue={consented ? "Allow" : "Disallow"}
          value={consented ? "Allow" : "Disallow"}
        >
          <Radio value={"Allow"}>Allow</Radio>
          <Radio value={"Disallow"}>Disallow</Radio>
        </RadioGroup>
      </div>
    </Panel>
  </Collapse>
);
