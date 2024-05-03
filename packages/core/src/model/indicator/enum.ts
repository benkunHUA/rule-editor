import Common from './common'
import { DataItemType, OperateOptionType, CommonIndicatorType, Group } from '../../type/index'
import { dataTypeOptionMap } from '../../shared/option'

export interface EnumProps extends CommonIndicatorType {
  dataType?: number;
  options?: DataItemType[];
  optionTrigger?: string;
  operators?: OperateOptionType[];
  optionMethod?: ((data: Group, cb: (v: DataItemType[]) => void) => void) | null;
}
export default class Enum extends Common {
  public dataType = 1
  public options: DataItemType[]
  public optionTrigger: string
  public operators: OperateOptionType[]
  public optionMethod: ((data: Group, cb: (v: DataItemType[]) => void) => void) | null
  constructor(props: EnumProps) {
    super(props)
    this.dataType = props.dataType || 1
    this.options = props.options || []
    this.optionTrigger = props.optionTrigger || 'focus'
    this.operators = props.operators || dataTypeOptionMap.enum
    this.optionMethod = null
    if (typeof props.optionMethod === 'function') {
      this.optionMethod = props.optionMethod
    }
    if (!props.formMap) {
      this.formMap = {
        select: {},
        multiple: {},
      }
    }
  }

  getOptions(data: Group, cb: () => void) {
    if (this.options.length || typeof this.optionMethod !== 'function') {
      return
    }
    this.optionMethod(data, (options: DataItemType[]) => {
      this.setOptions(options)
      if (typeof cb === 'function') {
        cb()
      }
    })
  }

  setOptions(options: DataItemType[]) {
    this.options = options || []
  }
}
