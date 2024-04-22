export interface DateProps {
  readonly?: boolean;
  disabled?: boolean;
  editable?: boolean;
  clearable?: boolean;
  size?: string;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  type?: string;
  format?: string;
  popperClass?: string;
  rangeSeparator?: string;
  defaultValue?: Date | undefined;
  defaultTime?: Date[] | undefined;
  valueFormat?: string;
  name?: string | undefined;
  unlinkPanels?: boolean;
  prefixIcon?: string | undefined;
  clearIcon?: string | undefined;
  validateEvent?: boolean;
  disabledDate?: ((d: string) => boolean) | undefined;
  shortcuts?: any;
  cellClassName?: ((d: string) => string) | undefined;
}

export default class Date {
  public FORM_TYPE: string
  public readonly: boolean
  public disabled: boolean
  public editable: boolean;
  public clearable: boolean
  public size: string
  public placeholder: string
  public startPlaceholder: string
  public endPlaceholder: string
  public type: string
  public format: string
  public popperClass: string
  public rangeSeparator: string
  public defaultValue: Date | undefined
  public defaultTime: Date[] | undefined
  public valueFormat: string
  public name: string | undefined
  public unlinkPanels: boolean
  public prefixIcon: string | undefined
  public clearIcon: string | undefined
  public validateEvent: boolean
  public disabledDate: ((d: string) => boolean) | undefined
  public shortcuts: any
  public cellClassName: ((d: string) => string) | undefined

  constructor(option: DateProps | undefined) {
    const props = option || {}
    this.FORM_TYPE = 'date'
    this.readonly = props.readonly || false
    this.disabled = props.disabled || false
    this.editable = props.editable || false
    this.clearable = props.clearable || false
    this.size = props.size || 'medium'
    this.placeholder = props.placeholder || '请选择'
    this.startPlaceholder = props.startPlaceholder || '开始时间'
    this.endPlaceholder = props.endPlaceholder || '结束时间'
    this.type = props.type || 'date'
    this.format = props.format || 'YYYY-MM-DD'
    this.popperClass = props.popperClass || ''
    this.rangeSeparator = props.rangeSeparator || '-'
    this.defaultValue = props.defaultValue || undefined
    this.defaultTime = props.defaultTime || undefined
    this.valueFormat = props.valueFormat || 'YYYY-MM-DD'
    this.name = props.name || undefined
    this.unlinkPanels = props.unlinkPanels || false
    this.prefixIcon = props.prefixIcon || undefined
    this.clearIcon = props.clearIcon || undefined
    this.validateEvent = props.validateEvent || true
    this.disabledDate = props.disabledDate || undefined
    this.shortcuts = props.shortcuts || []
    this.cellClassName = props.cellClassName || undefined
  }
}
