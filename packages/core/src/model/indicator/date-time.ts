import Date, { DateProps } from './date'
import { dataTypeOptionMap } from '../../shared/option'

export default class DateTime extends Date {
  constructor(props: DateProps) {
    super(props)
    this.dataType = 6
    this.operators = props.operators || dataTypeOptionMap.dateTime
    if (!props.formMap) {
      this.formMap = {
        datetime: {},
        datetimerange: {},
      }
    }
  }
}
