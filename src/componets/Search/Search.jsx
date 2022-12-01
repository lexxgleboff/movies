import React from "react";
import { Input } from "antd";
import "./Search.css";

export default function Search() {
  return (
    <div className="form">
      <form>
        <Input placeholder="Type to search..." />
      </form>
    </div>
  );
}
