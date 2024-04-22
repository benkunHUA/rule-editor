import Form from '../form/index'
import { CommonIndicatorType, NodeDataType, FormMapType } from '../../type'

export default class Indicator {
  public label: string;
  public value: string | number;
  public data: NodeDataType;
  public formMap: FormMapType;
  public validate: ((value: string & number) => boolean) | undefined
  constructor(props: CommonIndicatorType) {
    this.label = props.name || ''
    this.value = props.id || ''
    this.data = props.data || {}
    this.formMap = {}
    this.validate = props.validate || undefined
    if (props.formMap) {
      this.initFormMap(props.formMap)
    }
  }

  initFormMap(formMap: FormMapType) {
    Object.keys(formMap).forEach((key: string) => {
      const form = formMap[key] || {}
      // 处理字面量的方式声明表单的情况
      if (!form.FORM_TYPE) {
        this.formMap[key] = new Form[key](form)
      }
    })
  }

  getForm(formType: keyof FormMapType) {
    return this.formMap[formType]
  }
}
