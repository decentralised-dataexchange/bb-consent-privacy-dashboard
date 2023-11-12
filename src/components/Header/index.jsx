import { Component } from "react";
import "./header.css";

import UserSettings from "./UserSettings";
import Home from "./HomeButton";
class Header extends Component {
  render() {
    return (
      <div className="header">
        <h4>Your Data and Privacy Dashboard</h4>

        <div>
          <Home />
          <UserSettings />
        </div>
      </div>
    );
  }
}

export default Header;
