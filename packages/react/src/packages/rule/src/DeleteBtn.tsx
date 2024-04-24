import React from "react";
import type { RuleGroup, RuleItem, RuleNode } from "@ben/rule-editor-core";
import { closePath } from "../../share/icon";

interface DeleteBtnProps {
  ruleNode: RuleNode;
}
const DeleteBtn: React.FC<DeleteBtnProps> = (props) => {
  const handleDelete = () => {
    (props.ruleNode as RuleGroup | RuleItem).deleteRuleNode();
  };

  return (
    <span className="delete-btn" onClick={handleDelete}>
      <svg width={16} height={16} viewBox="0 0 1024 1024">
        <path d={closePath}></path>
      </svg>
    </span>
  );
};

export default DeleteBtn;
