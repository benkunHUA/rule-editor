import { observer } from "@formily/react";
import type {
  RuleGroup as RuleGroupType,
  RuleItem as RuleItemType,
  RuleNode,
} from "@rule-editor/core";
import classnames from "classnames";
import React from "react";
import ActionBtn from "./ActionBtn";
import DeleteBtn from "./DeleteBtn";
import RuleItem from "./RuleItem";
import RuleRelation from "./RuleRelation";

export interface RuleGroupProps {
  ruleNode: RuleNode;
  renderContent: (v: RuleItemType) => JSX.Element[];
  singleChild?: boolean;
  deep: number;
  visible?: boolean;
  customClass?: string;
}

const RuleGroup: React.FC<RuleGroupProps> = observer((props) => {
  const {
    ruleNode,
    renderContent,
    deep,
    visible = true,
    customClass = "",
    singleChild = false,
  } = props;

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
              ruleNode={item as RuleItemType}
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
        {childNodes.length > 1 && (
          <RuleRelation
            relation={(ruleNode as RuleGroupType).relation}
            deep={deep}
            toggleReleation={toggleReleation}
          ></RuleRelation>
        )}
      </div>
    </div>
  );
});

export default RuleGroup;
