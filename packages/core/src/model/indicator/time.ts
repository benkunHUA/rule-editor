import Common from "./common";
import { OperateOptionType, CommonIndicatorType } from "../../type/index";
import { dataTypeOptionMap } from "../../shared/option";

export interface TimeProps extends CommonIndicatorType {
  dataType?: number;
  operators?: OperateOptionType[];
}
export default class Time extends Common {
  public dataType = 4;
  public operators: OperateOptionType[];
  constructor(props: TimeProps) {
    super(props);
    this.dataType = props.dataType || 4;
    this.operators = props.operators || dataTypeOptionMap.time;
    if (!props.formMap) {
      this.formMap = {
        time: {},
        timerange: {},
      };
    }
  }
}
