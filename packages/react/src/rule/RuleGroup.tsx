import React from "react";
import type {
  RuleNode,
  RuleGroup as RuleGroupType,
} from "@rule-editor/core";
import { observer } from "@formily/react";
import classnames from "classnames";
import RuleItem from "./RuleItem";
import DeleteBtn from "./DeleteBtn";
import ActionBtn from "./ActionBtn";
import RuleRelation from "./RuleRelation";


export interface RuleGroupProps {
  ruleNode: RuleNode;
  renderContent: (v: RuleNode) => JSX.Element[];
  singleChild?: boolean;
  deep: number;
  visible?: boolean;
  customClass: string;
}

const RuleGroup: React.FC<RuleGroupProps> = observer((props) => {
  const { ruleNode, renderContent, deep, visible, customClass, singleChild } =
    props;

  const childNodes = (ruleNode as RuleGroupType).childNodes;

  const toggleReleation = () => { 
    (ruleNode as RuleGroupType).toggleReleation();
  };

  const classes = classnames("rule-group", customClass, {
    "single-child": singleChild,
  });
  return (
    <div className={classes}>
      <div className="rule-group__content">
        {childNodes.map((item, index) =>
          item.type === "group" ? (
            <RuleGroup
              key={item.key}
              ruleNode={item}
              renderContent={renderContent}
              deep={deep + 1}
              visible={visible}
              singleChild={childNodes.length <= 1}
              customClass={
                index === 0
                  ? "first"
                  : index === childNodes.length - 1
                    ? "last"
                    : ""
              }
            ></RuleGroup>
          ) : (
            <RuleItem
              key={item.key}
              ruleNode={item}
              renderContent={renderContent}
              singleChild={childNodes.length <= 1}
              customClass={
                index === 0
                  ? "first"
                  : index === childNodes.length - 1
                    ? "last"
                    : ""
              }
            ></RuleItem>
          )
        )}
        <DeleteBtn ruleNode={ruleNode}></DeleteBtn>
        <ActionBtn deep={deep} ruleNode={ruleNode}></ActionBtn>
        {
          childNodes.length > 1 && (
            <RuleRelation
              relation={(ruleNode as RuleGroupType).relation}
              deep={deep}
              toggleReleation={toggleReleation}
            ></RuleRelation>
          )
        }
      </div>
    </div>
  );
});

export default RuleGroup;
