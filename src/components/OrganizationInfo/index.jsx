import "./orgInfo.css";
import { Avatar } from "antd";
import picTest from "./web.jpeg";

const OrganizationInfo = () => {
  return (
    <div className="organization-info">
      {
        <Avatar className="organization-info-avatar">
          {" "}
          <img src={picTest} />
        </Avatar>
      }
      <div className="description">
        <p className="description-title">iGrant.io</p>
        <p className="description-subtitle">Stockholm, Sweden</p>
        <p className="description-subtitle">https://privacy.io/privacy.html</p>
      </div>
    </div>
  );
};

export default OrganizationInfo;
