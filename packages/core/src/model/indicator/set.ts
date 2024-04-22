import Enum, { EnumProps } from './enum'
import { dataTypeOptionMap } from '../../shared/option'

export default class Set extends Enum {
  constructor(props: EnumProps) {
    super(props)
    this.dataType = 7
    this.operators = props.operators || dataTypeOptionMap.set
  }
}
