import Common from './common'
import Input from '../form/input'
import { OperateOptionType, CommonIndicatorType } from '../../type/index'
import { dataTypeOptionMap } from '../../shared/option'

export interface IntProps extends CommonIndicatorType {
  dataType?: number;
  operators?: OperateOptionType[];
}
export default class Int extends Common {
  public dataType = 3
  public operators: OperateOptionType[]
  constructor(props: IntProps) {
    super(props)
    this.dataType = props.dataType || 3
    this.operators = props.operators || dataTypeOptionMap.int
    if (!props.formMap) {
      this.formMap = {
        inputNumber: new Input({ type: 'number', precision: 0 }),
      }
    }
  }
}
