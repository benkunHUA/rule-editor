export interface InputProps {
  config?: Record<string, any>;
  precision?: number;
}

export default class Input {
  public FORM_TYPE: string
  public config: Record<string, any>
  public precision: number

  constructor(option: InputProps | undefined) {
    const props = option || {}
    this.FORM_TYPE = 'input'
    this.config = props.config || {}
    this.precision = props.precision || 2
  }
}
