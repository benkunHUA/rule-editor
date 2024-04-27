import React from "react";
import { observer } from "@formily/react";
import classnames from "classnames";
import type { RuleNode } from "@ben/rule-editor-core";
import DeleteBtn from "./DeleteBtn";

export interface RuleItemProps {
  ruleNode: RuleNode;
  renderContent: (v: RuleNode) => JSX.Element[];
  singleChild?: boolean;
  customClass: string;
}

const RuleItem: React.FC<RuleItemProps> = observer((props) => {
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
});

export default RuleItem;
