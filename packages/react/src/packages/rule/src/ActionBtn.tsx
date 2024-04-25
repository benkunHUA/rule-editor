import React, { useContext } from "react";
import type { RuleNode, RuleGroup } from "@ben/rule-editor-core";
import { RuleContext } from '../../share/context';

interface ActionBtnProps {
  deep: number;
  ruleNode: RuleNode;
}
const ActionBtn: React.FC<ActionBtnProps> = (props) => {
  const { deep, ruleNode } = props;
  const { customActionItem, customActionGroup } = useContext(RuleContext);

  const addRuleItem = () => {
    console.log('item');
    (ruleNode as RuleGroup).addItem()
  }

  const addRuleGroup = () => {
    (ruleNode as RuleGroup).addGroup()
  }

  return (
    <div className="rule-action-wrap">
      {
        customActionItem 
          ? customActionItem(addRuleItem, deep) 
          : (
            <button className="rule-action-btn item" onClick={addRuleItem}>增加项</button>
          )
      }
      {
        deep < ruleNode.rule.deep && customActionGroup 
          ? customActionGroup(addRuleGroup, deep) 
          : (
            <button className="rule-action-btn group" onClick={addRuleGroup}>增加组</button>
          )
      }
    </div>
  );
};

export default ActionBtn;
