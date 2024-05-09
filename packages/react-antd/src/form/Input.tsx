import React from "react";
import { Input } from "antd";
import { InputProps } from "antd/lib/input";
import { connect } from "@rule-editor/react";

const RuleInput: React.FC<InputProps> = 
  connect(Input, {}, {
    placeholder: '请输入',
  });

export default RuleInput;
