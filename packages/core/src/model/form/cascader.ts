export interface CascaderProps {
  config?: Record<string, any>;
}
export default class Cascader {
  public FORM_TYPE: string;
  config?: Record<string, any>;

  constructor(option: CascaderProps) {
    const props = option || {}
    this.FORM_TYPE = 'cascader'
    this.config = props.config || {}
  }
}
