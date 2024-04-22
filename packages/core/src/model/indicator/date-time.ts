import Date, { DateProps } from './date'
import DatePicker from '../form/date-picker'
import { dataTypeOptionMap } from '../../shared/option'

export default class DateTime extends Date {
  constructor(props: DateProps) {
    super(props)
    if (!props.formMap) {
      const defaultFormat = 'YYYY-MM-DD HH:mm:ss'
      this.formMap = {
        datetime: new DatePicker({
          type: 'datetime',
          format: defaultFormat,
          valueFormat: defaultFormat,
        }),
        datetimerange: new DatePicker({
          type: 'datetimerange',
          format: defaultFormat,
          valueFormat: defaultFormat,
        }),
      }
    }
    this.dataType = 6
    this.operators = props.operators || dataTypeOptionMap.dateTime
  }
}
