import React from "react";
import classnames from "classnames";
import RuleItem from "./RuleItem";
import DeleteBtn from "./DeleteBtn";
import ActionBtn from "./ActionBtn";
import RuleRelation from "./RuleRelation";
import type {
  RuleNode,
  RuleGroup as RuleGroupType,
} from "@ben/rule-editor-core";

export interface RuleGroupProps {
  ruleNode: RuleNode;
  renderContent: (v: RuleNode) => JSX.Element[];
  singleChild?: boolean;
  deep: number;
  visible?: boolean;
  customClass: string;
}

const RuleGroup: React.FC<RuleGroupProps> = (props) => {
  const { ruleNode, singleChild, renderContent, deep, visible, customClass } =
    props;

  const toggleReleation = () => {};

  const classes = classnames("rule-group", customClass, {
    "single-child": singleChild,
  });
  return (
    <div className={classes}>
      <div className="rule-group__content">
        {(ruleNode as RuleGroupType).childNodes.map((item, index) =>
          item.type === "group" ? (
            <RuleGroup
              key={item.key}
              ruleNode={item}
              renderContent={renderContent}
              deep={deep + 1}
              visible={visible}
              customClass={
                index === 0
                  ? "first"
                  : index === (ruleNode as RuleGroupType).childNodes.length - 1
                  ? "last"
                  : ""
              }
            ></RuleGroup>
          ) : (
            <RuleItem
              key={item.key}
              ruleNode={item}
              renderContent={renderContent}
              customClass={
                index === 0
                  ? "first"
                  : index === (ruleNode as RuleGroupType).childNodes.length - 1
                  ? "last"
                  : ""
              }
            ></RuleItem>
          )
        )}
        <DeleteBtn ruleNode={ruleNode}></DeleteBtn>
        <ActionBtn deep={deep} ruleNode={ruleNode}></ActionBtn>
        <RuleRelation
          relation={(ruleNode as RuleGroupType).relation}
          toggleReleation={toggleReleation}
        ></RuleRelation>
      </div>
    </div>
  );
};

export default RuleGroup;
