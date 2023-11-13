import { Switch } from "antd";
import { Popover } from "antd";

const content = (description) => (
  <div>
    <p style={{ fontSize: "12px", margin: "0px", lineHeight: "normal" }}>
      {description}
    </p>
  </div>
);

export const PanelHeader = ({
  t,
  text,
  description,
  onChange,
  consented,
  total,
  lawfulUsage,
  policyURL,
  elemRef,
  dataRetention,
}) => (
  <Popover
    content={content(description)}
    placement="bottomRight"
    trigger="hover|focus"
    overlayClassName="purpose-tooltip"
  >
    <div ref={elemRef}>
      <div>
        <div className="panel-header">
          <div>
            <p className="title">{text}</p>
            <div className="panel-header-count">
              {"Allow"}
              {` ${consented} of ${total}`}
            </div>
            {consented && !lawfulUsage ? (
              <div className="panel-header-count">
                {`Data retention until: ${new Date()
                  .toLocaleString("en-GB", {
                    dateStyle: "short",
                    timeStyle: "short",
                    hour12: true,
                  })
                  .replaceAll("/", "-")
                  .replaceAll(",", " ")}`}{" "}
              </div>
            ) : (
              ""
            )}
          </div> 
          <Switch
            // disabled={lawfulUsage}
            // checked={consented > 0}
            // onChange={onChange}
          />
        </div>
      </div>
    </div>
  </Popover>
);
