import React from "react";
import type { RuleNode, RuleGroup } from "@ben/rule-editor-core";

interface ActionBtnProps {
  deep: number;
  ruleNode: RuleNode;
}
const ActionBtn: React.FC<ActionBtnProps> = (props) => {
  const { deep, ruleNode } = props;

  const addRuleItem = () => {
    (ruleNode as RuleGroup).addItem()
  }

  const addRuleGroup = () => {
    (ruleNode as RuleGroup).addGroup()
  }

  return (
    <div className="rule-action-wrap">
      <button className="rule-action-btn item" onClick={addRuleItem}>增加项</button>
      {deep < ruleNode.rule.deep && (
        <button className="rule-action-btn group" onClick={addRuleGroup}>增加组</button>
      )}
    </div>
  );
};

export default ActionBtn;
