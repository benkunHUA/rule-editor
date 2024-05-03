export interface SelectProps {
  config?: Record<string, any>;
}
export default class Select {
  public FORM_TYPE: string;
  config?: Record<string, any>;

  constructor(option: SelectProps) {
    const props = option || {}
    this.FORM_TYPE = 'select'
    this.config = props.config || {}
  }
}
