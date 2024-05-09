import { Rule, RuleComp, RuleItem } from "@rule-editor/core";
import { RuleGroup, RuleProvider } from "@rule-editor/react";
import classnames from "classnames";
import React from "react";
import RuleField from "./RuleField";
import RuleOperator from "./RuleOperator";
import RuleValue from "./RuleValue";

import "@rule-editor/react/style.css";

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

const defaultLayout = {
  delete: "left",
  relation: "right",
};

const RuleEditor: React.FC<RuleEditorProps> = (props) => {
  const {
    layout = defaultLayout,
    visible = true,
    readonly = false,
    disabled = false,
  } = props;

  const ruleNode = new Rule({
    data: props.data,
    indicators: props.indicators,
    props: props.props,
    deep: props.deep,
    readonly: props.readonly || false,
    disabled: props.disabled || false,
  });

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
        return (
          <RuleField
            key={itemComp.key}
            itemComp={itemComp}
            ruleItem={ruleItem}
          />
        );
      }
      if (itemComp.type === "operator") {
        return (
          <RuleOperator
            key={itemComp.key}
            itemComp={itemComp}
            ruleItem={ruleItem}
          />
        );
      }
      if (itemComp.type === "value") {
        return (
          <RuleValue
            key={itemComp.key}
            itemComp={itemComp}
            ruleItem={ruleItem}
          />
        );
      }
      return <></>;
    });
  };
  return (
    <div className={classes}>
      <RuleProvider>
        <RuleGroup
          deep={1}
          ruleNode={ruleNode.root}
          renderContent={renderContent}
          visible={visible}
          singleChild={true}
        />
      </RuleProvider>
    </div>
  );
};

export default RuleEditor;
