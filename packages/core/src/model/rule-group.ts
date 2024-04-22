import { v4 as uuidv4 } from 'uuid'
import type Rule from './rule'
import RuleItem from './rule-item'
import { RuleNode, PropsType, NodeDataType } from '../type/index'

interface RuleGroupProp {
  data: NodeDataType,
  rule: Rule,
  parent: RuleGroup | null
}
export default class RuleGroup {
  public key: string
  public type: string
  public relation: string
  public data: NodeDataType | null
  public childNodes: RuleNode[]
  public parent: RuleGroup | null
  public rule: Rule
  constructor(option: RuleGroupProp) {
    this.key = uuidv4()
    this.type = 'group'
    this.data = option.data
    this.rule = option.rule
    this.childNodes = []
    const relation = this.getPropertyFromData(this, 'relation')
    this.relation = relation || ''
    if (option.parent) {
      this.parent = option.parent
    }
  }

  init() {
    this.rule.registerNode(this)
    const group = this.getPropertyFromData(this, 'group')
    if (group) {
      group?.forEach((item: NodeDataType) => {
        this.insertChild(item, true)
      })
    }
  }

  insertChild(childData: NodeDataType, initFlag = false) {
    let child: RuleGroup | RuleItem
    const itemKey = this.getPropertyKeyFromData(this, 'item')
    if (childData[itemKey]) {
      child = new RuleItem({
        data: childData,
        rule: this.rule,
        parent: this,
      })
    } else {
      child = new RuleGroup({
        data: childData,
        rule: this.rule,
        parent: this,
      })
    }
    this.childNodes.push(child)
    child.init()
    const group = this.getPropertyFromData(this, 'group')
    if (!initFlag && group) {
      group.push(childData)
    }
  }

  addGroup() {
    const relation = this.getPropertyKeyFromData(this, 'relation')
    const group = this.getPropertyKeyFromData(this, 'group')
    const item = this.getPropertyKeyFromData(this, 'item')
    const label = this.getPropertyKeyFromData(this, 'label')
    const value = this.getPropertyKeyFromData(this, 'value')
    const data = {
      [relation]: '&&',
      [group]: [
        {
          [item]: [
            {
              [label]: '',
              [value]: null,
            },
            {
              [label]: '',
              [value]: null,
            },
            {
              [label]: '',
              [value]: null,
            },
          ],
        },
      ],
    }
    this.insertChild(data, false)
  }

  addItem() {
    const item = this.getPropertyKeyFromData(this, 'item')
    const label = this.getPropertyKeyFromData(this, 'label')
    const value = this.getPropertyKeyFromData(this, 'value')
    const data = {
      [item]: [
        {
          [label]: '',
          [value]: null,
        },
        {
          [label]: '',
          [value]: null,
        },
        {
          [label]: '',
          [value]: null,
        },
      ],
    }
    this.insertChild(data, false)
  }

  toggleReleation() {
    const relation = this.getPropertyKeyFromData(this, 'relation')
    const target = this.relation === '||' ? '&&' : '||'
    this.relation = target
    if (this.data) {
      this.data[relation] = target
    }
  }

  deleteRuleNode() {
    if (this.parent) {
      this.parent.deleteItem(this.key)
    }
  }

  deleteItem(key: string) {
    const index = this.childNodes.findIndex(o => o.key === key)
    if (index === -1) {
      return
    }
    this.childNodes = this.childNodes.filter(o => o.key !== key)
    const group = this.getPropertyFromData(this, 'group')
    if (group) {
      group.splice(index, 1)
    }
  }

  getPropertyKeyFromData(node: RuleNode, prop: keyof PropsType): string {
    const props = node.rule.props;
    const config = props[prop];
    return config || prop;
  }

  getPropertyFromData(node: RuleNode, prop: keyof PropsType): any {
    const data = node.data || {};
    const config = this.getPropertyKeyFromData(this, prop)
    if (typeof config === 'string') {
      return data[config];
    }
    if (typeof config === 'undefined') {
      const dataProp = data[prop];
      return dataProp === undefined ? '' : dataProp;
    }
  }
}
