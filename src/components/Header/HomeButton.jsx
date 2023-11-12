import React from "react";

import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <HomeOutlined
        className="header-icon"
        onClick={() => navigate("/dashboard")}
      />
    </React.Fragment>
  );
};

export default HomeButton;
