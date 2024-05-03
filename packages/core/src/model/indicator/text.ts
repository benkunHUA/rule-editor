import Common from "./common";
import { OperateOptionType, CommonIndicatorType } from "../../type/index";
import { dataTypeOptionMap } from "../../shared/option";

export interface TextProps extends CommonIndicatorType {
  dataType?: number;
  operators?: OperateOptionType[];
}
export default class Text extends Common {
  public dataType = 2;
  public operators: OperateOptionType[];
  constructor(props: TextProps) {
    super(props);
    this.dataType = props.dataType || 2;
    this.operators = props.operators || dataTypeOptionMap.text;
    if (!props.formMap) {
      this.formMap = {
        input: {},
      };
    }
  }
}
