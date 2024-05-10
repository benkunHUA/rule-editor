import React from "react";
import { Select } from "antd";
import { SelectProps } from "antd/lib/select";
import { connect } from "@rule-editor/react";

const RuleSelect: React.FC<SelectProps<any, any>> = connect(
  Select,
  {},
  {
    placeholder: "请输入",
  }
);

export default RuleSelect;
