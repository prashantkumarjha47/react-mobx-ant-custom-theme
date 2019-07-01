import React from "react";
import { Layout, Icon, Avatar, Popover } from "antd";
import { inject, observer } from "mobx-react";
import "./Header.scss";

const { Header } = Layout;

const MainHeader = ({ globals }) => {
  const logout = () => {
    globals.setLogin(false)
  }
  const content = (
    <div>
      <span style={{ cursor: "pointer" }} onClick={logout}>
        Logout
      </span>
    </div>
  );
  return (<Header collapsible collapsed={globals.collapsed} className="header" >
    <Icon
      className="trigger"
      type={globals.collapsed ? "menu-unfold" : "menu-fold"}
      onClick={globals.toggle}
    />
    <div className="user-avt">
      <Popover placement="bottom" content={content} trigger="click">
        <Avatar icon="user" />
      </Popover>
    </div>
  </Header>);
};

export default inject('globals')(observer(MainHeader));
