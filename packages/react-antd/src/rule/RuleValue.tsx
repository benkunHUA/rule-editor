import { observer } from "@formily/react";
import type { RuleComp, RuleItem } from "@rule-editor/core";
import { Input } from "antd";
import React from "react";

interface RuleValueProps {
  itemComp: RuleComp;
  ruleItem: RuleItem;
}

const RuleValue: React.FC<RuleValueProps> = observer((props) => {
  const { itemComp } = props;

  return (
    <div className="comp rule-value">
      <Input placeholder="请选择" defaultValue={itemComp.value} />
    </div>
  );
});

export default RuleValue;
