export interface TimeProps {
  readonly?: boolean;
  disabled?: boolean;
  editable?: boolean;
  clearable?: boolean;
  size?: string;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  isRange?: boolean;
  align?: string;
  popperClass?: string;
  rangeSeparator?: string;
  format?: string;
  valueFormat?: string;
  defaultValue?: Date | undefined;
  name?: string | undefined;
  clearIcon?: string | undefined;
  disabledHours?: (() => void) | undefined;
  disabledMinutes?: ((h: string) => void) | undefined;
  disabledSeconds?: ((h: string, m: string) => void) | undefined;
  start?: string;
  end?: string;
  step?: number;
  minTime?: string;
  maxTime?: string | undefined;
  minuteInterval?: number;
  secondIntervel?: number;
}

export default class Time {
  public FORM_TYPE: string
  public readonly: boolean
  public disabled: boolean
  public editable: boolean;
  public clearable: boolean
  public size: string
  public placeholder: string
  public startPlaceholder: string
  public endPlaceholder: string
  public isRange: boolean
  public align: string
  public popperClass: string
  public rangeSeparator: string
  public format: string
  public valueFormat: string
  public defaultValue: Date | undefined
  public name: string | undefined
  public clearIcon: string | undefined
  public disabledHours: (() => void) | undefined
  public disabledMinutes: ((h: string) => void) | undefined
  public disabledSeconds: ((h: string, m: string) => void) | undefined
  public start: string
  public end: string
  public step: number
  public minTime: string
  public maxTime: string | undefined
  public minuteInterval: number
  public secondIntervel: number

  constructor(option: TimeProps | undefined) {
    const props = option || {}
    this.FORM_TYPE = 'time'
    this.readonly = props.readonly || false
    this.disabled = props.disabled || false
    this.editable = props.editable || false
    this.clearable = props.clearable || false
    this.size = props.size || 'medium'
    this.placeholder = props.placeholder || '请选择'
    this.startPlaceholder = props.startPlaceholder || '开始时间'
    this.endPlaceholder = props.endPlaceholder || '结束时间'
    this.isRange = props.isRange || false
    this.align = props.align || 'left'
    this.popperClass = props.popperClass || ''
    this.rangeSeparator = props.rangeSeparator || '-'
    this.format = props.format || 'HH:mm:ss'
    this.valueFormat = props.valueFormat || 'HH:mm:ss'
    this.defaultValue = props.defaultValue || undefined
    this.name = props.name || undefined
    this.clearIcon = props.clearIcon || undefined
    this.disabledHours = props.disabledHours || undefined
    this.disabledMinutes = props.disabledMinutes || undefined
    this.disabledSeconds = props.disabledSeconds || undefined
    this.start = props.start || '	09:00'
    this.end = props.end || '18:00'
    this.step = props.step || 30
    this.minTime = props.minTime || '00:00'
    this.maxTime = props.maxTime || undefined
    this.minuteInterval = props.minuteInterval || 1
    this.secondIntervel = props.secondIntervel || 1
  }
}
