import { v4 as uuidv4 } from 'uuid'
import type Rule from './rule'
import type RuleGroup from './rule-group'
import RuleComp from './rule-comp'
import { Item, NodeDataType, OperateOptionType, IndicatorType } from '../type/index'

interface RuleItemProp {
  data: NodeDataType
  rule: Rule
  parent: RuleGroup | null
}
export default class RuleItem {
  public key: string
  public type: string
  public dataType: number
  public data: NodeDataType
  public rule: Rule
  public parent: RuleGroup | null
  public childNodes: RuleComp[]
  public indicator: IndicatorType | null
  public formType: any

  constructor(option: RuleItemProp) {
    this.key = uuidv4()
    this.type = 'item'
    this.data = option.data
    this.rule = option.rule
    this.parent = option.parent
    const item = this.parent?.getPropertyKeyFromData(this, 'item') || 'item'
    this.dataType = option.data[item][0].dataType || 0
    this.childNodes = []
    this.indicator = null
    this.formType = 'input'
  }
  init() {
    this.rule.registerNode(this)
    if (!this.parent) {
      return
    }
    const item = this.parent.getPropertyKeyFromData(this, 'item')
    const types = ['field', 'operator', 'value']
    this.data[item].forEach((item: Item, index: number) => {
      this.childNodes.push(new RuleComp({
        rule: this.rule,
        data: item,
        parent: this,
        type: types[index],
      }))
    })
    // 处理回显
    if (this.childNodes[0].value !== null) {
      const value = this.childNodes[0].value
      const indicators = this.rule.dataSource.indicators
      this.indicator = indicators.find((el: IndicatorType) => el.value === value) || null
    }
    if (!this.indicator) {
      return
    }
    if (this.childNodes[1].value !== null) {
      const value = this.childNodes[1].value
      const option = this.indicator.operators.find((o: OperateOptionType) => o.value === value)
      this.formType = option ? option.form : 'input'
    }
  }

  handleFieldChange(indicator: IndicatorType) {
    this.indicator = indicator
    this.childNodes[0].setData(indicator.data)
    this.childNodes[0].setLabel(indicator.label)
    this.childNodes[0].setValue(indicator.value)
    for (let i = 1; i < this.childNodes.length; i++) {
      const child = this.childNodes[i]
      child.setLabel('')
      child.setValue(null)
    }
  }

  handleOperateChange(operator: OperateOptionType) {
    const formType = operator.form
    const preResultType = this.formType
    this.formType = formType
    if ('null' === formType) {
      const delLength = this.childNodes.length - 2
      this.childNodes.splice(2, delLength)
      const item = this.parent?.getPropertyFromData(this, 'item')
      if (item) {
        item.splice(2, delLength)
      }
    } else {
      // 从为空切换回来，补全三项
      if (this.childNodes.length <= 2) {
        this.addComp('value')
      }
    }
    // 结果表单类型不变，就不用重置值
    if (preResultType === formType || this.childNodes.length <= 2) {
      return
    }
    if (['multiple', 'timerange', 'daterange', 'datetimerange'].includes(formType)) {
      this.childNodes[2].setLabel([])
      this.childNodes[2].setValue([])
    } else {
      this.childNodes[2].setLabel('')
      this.childNodes[2].setValue(null)
    }
  }

  addComp(type: string) {
    const item = this.parent?.getPropertyFromData(this, 'item')
    const label = this.parent?.getPropertyKeyFromData(this, 'label') || 'label'
    const value = this.parent?.getPropertyKeyFromData(this, 'value') || 'value'
    const data = {
      [label]: '',
      [value]: null,
    }
    this.childNodes.push(new RuleComp({
      data: data,
      parent: this,
      rule: this.rule,
      type: type,
    }))
    if (item) {
      item.push(data)
    }
  }

  deleteRuleNode() {
    if (this.parent) {
      this.parent.deleteItem(this.key)
    }
  }
}
