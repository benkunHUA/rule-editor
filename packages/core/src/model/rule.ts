import { define, observable } from '@formily/reactive'
import DataSource from './data-source'
import RuleGroup from './rule-group'
import { IndicatorType, Item } from '../type'

import {
  NodeDataType,
  RuleNode,
  PropsType,
  OptionPropsType,
  DataTypePropsType,
} from '../type/index'

interface RuleOption {
  data?: NodeDataType;
  indicators?: IndicatorType[];
  dataSource?: Item[];
  props?: PropsType;
  optionProps?: OptionPropsType;
  dataTypeProps?: DataTypePropsType;
  deep?: number;
  readonly?: boolean;
  disabled?: boolean;
}
export default class Rule {
  public dataSource: DataSource
  public root: RuleGroup
  public nodeMap: NodeDataType
  public props: PropsType
  public deep: number
  public readonly: boolean
  public disabled: boolean

  constructor(option: RuleOption) {
    this.nodeMap = {}
    this.init(option)
    this.markObservable()
  }

  init(option: RuleOption) {
    // 默认最大10层
    this.deep = option?.deep || 10
    this.readonly = option.readonly || false
    this.disabled = option.disabled || false
    this.props = option.props || {}
    this.initDataSource(option)
    this.initNode(option.data)
  }

  initDataSource(option: RuleOption) {
    this.dataSource = new DataSource({
      indicators: option.indicators || [],
      optionProps: option.optionProps,
      dataTypeProps: option.dataTypeProps,
      dataSource: option.dataSource || [],
    })
  }

  initNode(data: NodeDataType | undefined) {
    const groupData: NodeDataType = data || { relation: '', group: [] }
    this.root = new RuleGroup({
      data: groupData,
      rule: this,
      parent: null,
    })
    this.root.init()
  }

  registerNode(node: RuleNode) {
    this.nodeMap[node.key] = node
  }

  markObservable() {
    define(this, {
      root: observable,
      deep: observable.ref,
      readonly: observable.ref,
      disabled: observable.ref,
    })
  }
}
