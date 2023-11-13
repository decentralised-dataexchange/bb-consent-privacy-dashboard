import { Collapse, Radio, Slider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;

// const MIN_DAYS = store.config.askMe.minDays;
// const MAX_DAYS = store.config.askMe.maxDays;

export const SubCollapse = ({
  title,
  consented,
  days,
  onRadioClick,
  onSliderChange,
  lawfulUsage,
}) => (
  <Collapse
    className="collapse-usage bg-transparent"
    bordered={false}
    expandIcon={({ isActive }) => (
      <CaretRightOutlined rotate={isActive ? 90 : 0} />
    )}
  >
    <Panel className="sub-collapse-panel" header={title} key="1">
      <div className="group">
        <RadioGroup
          className="radio-group-small"
          disabled={lawfulUsage}
          defaultValue={lawfulUsage ? "Allow" : null}
          onChange={onRadioClick}
          value={consented}
        >
          <Radio value={"Allow"}>Allow</Radio>
          <Radio value={"Disallow"}>Disallow</Radio>
        </RadioGroup>
      </div>
    </Panel>
  </Collapse>
);
