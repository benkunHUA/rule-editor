import React from "react";
import classnames from "classnames";
import DeleteBtn from "./DeleteBtn";
import type { RuleNode } from "@ben/rule-editor-core";

export interface RuleItemProps {
  ruleNode: RuleNode;
  renderContent: (v: RuleNode) => JSX.Element[];
  singleChild?: boolean;
  customClass: string;
}

const RuleItem: React.FC<RuleItemProps> = (props) => {
  const { ruleNode, singleChild, renderContent, customClass } = props;
  const classes = classnames("rule-item", customClass, {
    "single-child": singleChild,
  });
  return (
    <div className={classes}>
      <DeleteBtn ruleNode={ruleNode}></DeleteBtn>
      {renderContent(ruleNode)}
    </div>
  );
};

export default RuleItem;
