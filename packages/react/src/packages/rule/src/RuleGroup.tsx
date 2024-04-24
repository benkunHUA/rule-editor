import React from "react";
import classnames from "classnames";
import RuleItem from "./RuleItem";
import type {
  RuleNode,
  RuleGroup as RuleGroupType,
} from "@ben/rule-editor-core";

export interface RuleGroupProps {
  ruleNode: RuleNode;
  renderContent: (v: RuleNode) => JSX.Element[];
  singleChild?: boolean;
  setReleationPosition?: () => void;
  deep: number;
  visible?: boolean;
}

const RuleGroup: React.FC<RuleGroupProps> = (props) => {
  const {
    ruleNode,
    singleChild,
    renderContent,
    setReleationPosition,
    deep,
    visible,
  } = props;

  const classes = classnames("rule-group", {
    "single-child": singleChild,
  });
  return (
    <div id={ruleNode.key} className={classes}>
      {(ruleNode as RuleGroupType).childNodes.map((item) =>
        item.type === "group" ? (
          <RuleGroup
            key={item.key}
            ruleNode={item}
            renderContent={renderContent}
            setReleationPosition={setReleationPosition}
            deep={deep + 1}
            visible={visible}
          ></RuleGroup>
        ) : (
          <RuleItem
            key={item.key}
            ruleNode={item}
            renderContent={renderContent}
            setReleationPosition={setReleationPosition}
          ></RuleItem>
        )
      )}
    </div>
  );
};

export default RuleGroup;
