import "./backButton.css";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <ArrowLeftOutlined
      className="menu-back-button"
      onClick={() => navigate("/dashboard")}
    />
  );
};

export default BackButton;
