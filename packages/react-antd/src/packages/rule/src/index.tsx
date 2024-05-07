import classnames from "classnames";
import React from "react";
import * as RuleUI from '@rule-editor/react';
import { Rule, RuleComp, RuleItem } from "@rule-editor/core";
import RuleField from "./RuleField";
import RuleOperator from "./RuleOperator";
import RuleValue from "./RuleValue";

console.log(RuleUI);
const { RuleGroup, RuleProvider } = RuleUI

interface RuleEditorProps {
  data: any;
  indicators: any;
  props?: any;
  layout?: any;
  deep?: number;
  readonly?: boolean;
  disabled?: boolean;
  visible?: boolean;
}

const RuleEditor: React.FC<RuleEditorProps> = (props) => {
  const { layout, visible, readonly, disabled } = props;

  const ruleNode = new Rule({
    data: props.data,
    indicators: props.indicators,
    props: props.props,
    deep: props.deep,
    readonly: props.readonly || false,
    disabled: props.disabled || false,
  })

  const classes = classnames(
    "rule-builder",
    `delete-${layout.delete}`,
    `relation-${layout.relation}`,
    {
      disabled: readonly || disabled,
    }
  );

  const renderContent = (ruleItem: RuleItem) => {
    return ruleItem.childNodes.map((itemComp: RuleComp) => {
      if (itemComp.type === "field") {
        return <RuleField key={itemComp.key} itemComp={itemComp} ruleItem={ruleItem} />;
      }
      if (itemComp.type === "operator") {
        return <RuleOperator key={itemComp.key} itemComp={itemComp} ruleItem={ruleItem} />;
      }
      if (itemComp.type === "value") {
        return <RuleValue key={itemComp.key} itemComp={itemComp} ruleItem={ruleItem} />;
      }
      return null;
    })
  }
  return (
    <div className={classes}>
      <RuleProvider>
        <RuleGroup 
          deep={1}
          ruleNode={ruleNode.root}
          renderContent={renderContent}
          visible={visible}
        />
      </RuleProvider>
    </div>
  )
};

RuleEditor.defaultProps = {
  deep: 1,
  readonly: false,
  disabled: false,
  visible: false,
  layout: {
    delete: "left",
    relation: "right",
  }
};

export default RuleEditor;
