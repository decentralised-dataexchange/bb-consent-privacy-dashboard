import "./collapse.css";

import { Collapse, Spin } from "antd";
import { PanelHeader } from "./PanelHeader";
import { SubCollapse } from "./SubCollapse";
import { CaretRightOutlined } from "@ant-design/icons";

const Panel = Collapse.Panel;

const data = [
  {
    id: "1",
    purpose: "Data4sharing",
    consented: 6,
    total: 6,
    attributeName: "Name",
    lawfulUsage:true
  },
  { id: "2", purpose: "Marketing and campaign", consented: 4, total: 4,attributeName: "Mobile No.",
  lawfulUsage:false },
];

const CollapseUsage = () => {
  return (
    <Collapse
      className="collapse-usage"
      bordered={false}
      //   defaultActiveKey={openKey.toString()}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      {data.map((purpose, i) => (
        <Panel
          header={
            // <Spin
            //   key={i}
            //   spinning={
            //     loadingUiStore[purpose["Purpose"]["ID"]]["isLoading"]
            //   }
            // >
            <PanelHeader
              elemRef={purpose.purpose}
              // policyURL={purpose["Purpose"]["PolicyURL"]}
              // lawfulUsage={purpose["Purpose"]["LawfulUsage"]}
              consented={purpose.consented}
              total={purpose.total}
              // onChange={(value, e) =>
              //   this.handleSwitch(purpose["Purpose"]["ID"], value, e)
              // }
              text={purpose.purpose}
              // description={`${purpose["Purpose"]["Description"]}`}
              // dataRetention={
              //   purpose.DataRetention ? purpose.DataRetention.Expiry : ""
              // }
            />
            // </Spin>
          }
          key={i}
          className={`panel-usage panel-usage-${purpose.id}`}
        >
          {/* {!purpose["Consents"]
                ? null
                : purpose["Consents"].map((consent, i) => (
                    <Spin
                      key={i}
                    //   spinning={
                    //     loadingUiStore[purpose["Purpose"]["ID"]][consent["ID"]]
                    //   }
                    >*/}
          <SubCollapse
            key={i}
            lawfulUsage={purpose.lawfulUsage}
            title={purpose.attributeName}
            // consented={consent["Status"]["Consented"]}
            // days={consent["Status"]["Days"]}
            // onRadioClick={(e) =>
            //   this.changeAttributeStatus(
            //     purpose["Purpose"]["ID"],
            //     consent["ID"],
            //     e
            //   )
            // }
            // onSliderChange={(value) =>
            //   this.changeDays(
            //     purpose["Purpose"]["ID"],
            //     consent["ID"],
            //     value
            //   )
            // }
          />
          {/* </Spin> */}
          {/* ))}  */}
        </Panel>
      ))}
    </Collapse>
  );
};

export default CollapseUsage;
