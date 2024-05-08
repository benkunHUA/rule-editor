import React, { useMemo } from "react";
import { observer } from "@formily/react";
import { Select } from "antd";
import type {
  RuleComp,
  RuleItem,
  labelType,
  DataItemType,
  IndicatorType,
} from "@rule-editor/core";

interface RuleFieldProps {
  itemComp: RuleComp;
  ruleItem: RuleItem;
}

const RuleField: React.FC<RuleFieldProps> = observer((props) => {
  const { itemComp, ruleItem } = props;

  const indicators = useMemo(() => {
    return ruleItem.rule.dataSource.indicators.map((item) => ({
      label: item.label,
      value: item.value,
    }));
  }, [ruleItem]);

  const getOptionWhenFieldChange = (data: DataItemType) => {
    const { optionTrigger, optionMethod } = ruleItem.indicator as any;
    // 指标模型中定义了选项获取方式
    if (optionTrigger === "fieldChange" && typeof optionMethod === "function") {
      (ruleItem.indicator as any).getOptions(data);
    }
  };

  const handleChange = (val: labelType) => {
    const indicators = ruleItem.rule.dataSource.indicators;
    const data = indicators.find((el: IndicatorType) => el.value === val);
    if (data) {
      ruleItem.handleFieldChange(data);
      getOptionWhenFieldChange(data);
    }
  };

  return (
    <div className="comp rule-field">
      <Select
        placeholder="请选择"
        defaultValue={itemComp.value}
        onChange={handleChange}
        options={indicators}
      />
    </div>
  );
});

export default RuleField;
