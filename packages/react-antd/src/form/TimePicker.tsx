import React from "react";
import { TimePicker } from "antd";
import { TimePickerProps } from "antd/lib/time-picker";
import { connect } from "@rule-editor/react";

type ComposedTimePicker = React.FC<React.PropsWithChildren<TimePickerProps>> & {
  RangePicker?: any;
};

const RuleTimePicker: ComposedTimePicker = connect(
  TimePicker,
  {},
  {
    placeholder: "请选择",
  }
);

RuleTimePicker.RangePicker = connect(
  TimePicker.RangePicker,
  {},
  {
    placeholder: ["开始时间", "结束时间"],
  }
);

export default RuleTimePicker;
