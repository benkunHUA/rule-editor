import React, { useContext } from "react";
import type { RuleGroup, RuleItem, RuleNode } from "@rule-editor/core";
import { closePath } from "../share/icon";
import { RuleContext } from '../share/context';


interface DeleteBtnProps {
  ruleNode: RuleNode;
}
const DeleteBtn: React.FC<DeleteBtnProps> = (props) => {
  const { customDelete } = useContext(RuleContext)
  const handleDelete = () => {
    (props.ruleNode as RuleGroup | RuleItem).deleteRuleNode();
  };

  return (
    <span className="delete-btn" onClick={handleDelete}>
      {
        customDelete || (
          <svg width={16} height={16} viewBox="0 0 1024 1024">
            <path d={closePath}></path>
          </svg>
        )
      }

    </span>
  );
};

export default DeleteBtn;
