import React from "react";
import { Tabs } from "antd";
import "./Tab.css";

export default function Tab() {
  return (
    <div className="tab">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Search" key="1"></Tabs.TabPane>
        <Tabs.TabPane tab="Rated" key="2"></Tabs.TabPane>
      </Tabs>
    </div>
  );
}
