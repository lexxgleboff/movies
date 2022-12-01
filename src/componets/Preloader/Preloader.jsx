import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./Preloader.css";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

export default function Preloader() {
  return (
    <div className="preloader">
      <Spin indicator={antIcon} />
    </div>
  );
}
