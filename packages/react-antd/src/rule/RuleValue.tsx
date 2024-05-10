import { observer } from "@formily/react";
import type { RuleComp, RuleItem, Enum, DataItemType } from "@rule-editor/core";
import React from "react";

import RuleInput from "../form/Input";
import RuleSelect from "../form/Select";
import RuleTimePicker from "../form/TimePicker";
import RuleDatePicker from "../form/DatePicker";
import RuleCascader from "../form/Cascader";

interface RuleValueProps {
  itemComp: RuleComp;
  ruleItem: RuleItem;
}

const RuleValue: React.FC<RuleValueProps> = observer((props) => {
  const { itemComp, ruleItem } = props;
  const formType = ruleItem.formType;
  let options: DataItemType[] = [];
  if (ruleItem.indicator) {
    options = (ruleItem.indicator as Enum).options;
  }

  return (
    <div className="comp rule-value">
      {formType === "input" && <RuleInput defaultValue={itemComp.value} />}
      {formType === "inputNumber" && <RuleInput defaultValue={itemComp.value} type="number" />}
      {formType === "select" && (
        <RuleSelect defaultValue={itemComp.value} options={options} />
      )}
      {formType === "time" && <RuleTimePicker defaultValue={itemComp.value} />}
      {formType === "timerange" && <RuleTimePicker.RangePicker defaultValue={itemComp.value} />}
      {formType === "date" && <RuleDatePicker defaultValue={itemComp.value} />}
      {formType === "daterange" && <RuleDatePicker.RangePicker defaultValue={itemComp.value} />}
      {formType === "cascader" && <RuleCascader defaultValue={itemComp.value} />}
    </div>
  );
});

export default RuleValue;
