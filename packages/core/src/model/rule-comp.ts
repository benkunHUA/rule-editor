import { v4 as uuidv4 } from "uuid";
import { labelType, NodeDataType } from "../type/index";
import RuleItem from "./rule-item";
import Rule from "./rule";

export interface RuleCompProp {
  data: NodeDataType;
  parent: RuleItem;
  rule: Rule;
  type: string;
}
export default class RuleComp {
  public key: string;
  public label: labelType;
  public value: labelType | null;
  public type: string;
  public rule: Rule;
  public data: NodeDataType;
  public parent: RuleItem;
  constructor(option: RuleCompProp) {
    this.key = uuidv4();
    this.rule = option.rule;
    this.parent = option.parent;
    this.type = option.type;
    const parentObj = option?.parent?.parent;
    if (parentObj) {
      const label = parentObj.getPropertyKeyFromData(this, "label") || "label";
      const value = parentObj.getPropertyKeyFromData(this, "value") || "value";
      this.label = option.data[label];
      this.value = option.data[value];
      this.data = option.data;
    }
  }

  setData(data: NodeDataType) {
    Object.keys(data).forEach((key: string) => {
      this.data[key] = data[key];
    });
  }

  setLabel(label: labelType) {
    const labelName =
      this.parent?.parent?.getPropertyKeyFromData(this, "label") || "label";
    this.label = label;
    this.data[labelName] = label;
  }

  setValue(value: labelType | null) {
    const labelName =
      this.parent?.parent?.getPropertyKeyFromData(this, "value") || "value";
    this.value = value;
    this.data[labelName] = value;
  }
}
