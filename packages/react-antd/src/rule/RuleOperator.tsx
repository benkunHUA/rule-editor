import React from "react";
import { observer } from "@formily/react";
import { Select } from "antd";
import type {
  RuleComp,
  RuleItem,
  labelType,
  OperateOptionType,
} from "@rule-editor/core";

interface RuleOperatorProps {
  itemComp: RuleComp;
  ruleItem: RuleItem;
}

const RuleOperator: React.FC<RuleOperatorProps> = observer((props) => {
  const { itemComp, ruleItem } = props;

  const operators = ruleItem?.indicator?.operators || []

  const handleChange = (val: labelType) => {
    const option = operators.find((o: OperateOptionType) => o.value === val);
    if (!option) {
      return;
    }
    props.ruleItem.handleOperateChange(option);
    props.itemComp.setLabel(option.label);
    props.itemComp.setValue(option.value);
  };

  return (
    <div className="comp rule-operator">
      <Select
        placeholder="请选择"
        value={itemComp.value}
        onChange={handleChange}
        options={operators}
      />
    </div>
  );
});

export default RuleOperator;
