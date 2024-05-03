import Common from "./common";
import { OperateOptionType, CommonIndicatorType } from "../../type/index";
import { dataTypeOptionMap } from "../../shared/option";

export interface IntProps extends CommonIndicatorType {
  dataType?: number;
  operators?: OperateOptionType[];
}
export default class Int extends Common {
  public dataType = 9;
  public operators: OperateOptionType[];
  constructor(props: IntProps) {
    super(props);
    this.dataType = props.dataType || 9;
    this.operators = props.operators || dataTypeOptionMap.decimal;
    if (!props.formMap) {
      this.formMap = {
        inputNumber: {},
      };
    }
  }
}
