export interface TimeProps {
  config?: Record<string, any>;
}
export default class Time {
  public FORM_TYPE: string;
  config?: Record<string, any>;

  constructor(option: TimeProps) {
    const props = option || {}
    this.FORM_TYPE = 'time'
    this.config = props.config || {}
  }
}
