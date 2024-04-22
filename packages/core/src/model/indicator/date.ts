import Common from './common'
import DatePicker from '../form/date-picker'
import { OperateOptionType, CommonIndicatorType } from '../../type/index'
import { dataTypeOptionMap } from '../../shared/option'

export interface DateProps extends CommonIndicatorType {
  dataType?: number;
  operators?: OperateOptionType[];
}
export default class Date extends Common {
  public dataType = 5
  public operators: OperateOptionType[]
  constructor(props: DateProps) {
    super(props)
    this.dataType = props.dataType || 5
    this.operators = props.operators || dataTypeOptionMap.date
    if (!props.formMap) {
      this.formMap = {
        date: new DatePicker({}),
        daterange: new DatePicker({ type: 'daterange' }),
      }
    }
  }
}
