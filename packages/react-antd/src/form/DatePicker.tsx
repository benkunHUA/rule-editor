import React from "react";
import { DatePicker } from "antd";
import { DatePickerProps } from "antd/lib/date-picker";
import { connect } from "@rule-editor/react";

type ComposedDatePicker = React.FC<
  React.PropsWithChildren<DatePickerProps>
> & {
  RangePicker?: any
}

const RuleDatePicker: ComposedDatePicker = connect(
  DatePicker,
  {},
  {
    placeholder: "请选择",
  }
);

RuleDatePicker.RangePicker = connect(
  DatePicker.RangePicker,
  {},
  {
    placeholder: ["开始日期", "结束日期"],
  }
);

export default RuleDatePicker;
