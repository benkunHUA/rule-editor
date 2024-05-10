import React from "react";
import { Cascader } from "antd";
import { CascaderProps } from "antd/lib/cascader";
import { connect } from "@rule-editor/react";

const RuleCascader: React.FC<CascaderProps> = connect(
  Cascader,
  {},
  {
    placeholder: "请选择",
  }
);

export default RuleCascader;
