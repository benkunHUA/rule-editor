export interface DatePickerProps {
  config?: Record<string, any>;
}
export default class DatePicker {
  public FORM_TYPE: string;
  config?: Record<string, any>;

  constructor(option: DatePickerProps) {
    const props = option || {}
    this.FORM_TYPE = 'data-picker'
    this.config = props.config || {}
  }
}
