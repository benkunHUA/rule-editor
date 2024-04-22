export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean
export interface InputProps {
  type?: string;
  maxlength?: string | number | undefined;
  minlength?: string | number | undefined;
  showWordLimit?: boolean;
  placeholder?: string;
  clearable?: boolean;
  showPassword?: boolean;
  disabled?: boolean;
  prefixIcon?: string | undefined;
  suffixIcon?: string | undefined;
  prefixText?: string | undefined;
  suffixText?: string | undefined;
  rows?: number;
  autosize?: InputAutoSize;
  autocomplete?: string;
  name?: string | undefined;
  readonly?: boolean;
  readonlyWithBgcolor?: boolean;
  readonlyHover?: boolean;
  max?: number | undefined;
  min?: number | undefined;
  step?: number | undefined;
  precision?: number | null;
  resize?: string | undefined;
  autofocus?: boolean;
  form?: string | undefined;
  label?: string | undefined;
  tabindex?: string | number | undefined;
  textalign?: string | undefined;
  validateEvent?: boolean;
  inputStyle?: { [key: string]: string };
}

export default class Input {
  public FORM_TYPE: string
  public type: string
  public maxlength: string | number | undefined
  public minlength: string | number | undefined
  public showWordLimit: boolean
  public placeholder: string
  public clearable: boolean
  public showPassword: boolean
  public disabled: boolean
  public prefixIcon: string | undefined
  public suffixIcon: string | undefined
  public prefixText: string | undefined
  public suffixText: string | undefined
  public rows: number
  public autosize: InputAutoSize
  public autocomplete: string
  public name: string | undefined
  public readonly: boolean
  public readonlyWithBgcolor: boolean
  public readonlyHover: boolean
  public max: number | undefined
  public min: number | undefined
  public step: number | undefined
  public precision: number | null
  public resize: string | undefined
  public autofocus: boolean
  public form: string | undefined
  public label: string | undefined
  public tabindex: string | number | undefined
  public textalign: string | undefined
  public validateEvent: boolean
  public inputStyle: { [key: string]: string }

  constructor(option: InputProps | undefined) {
    const props = option || {}
    this.FORM_TYPE = 'input'
    this.type = props.type || 'text'
    this.maxlength = props.maxlength || undefined
    this.minlength = props.minlength || undefined
    this.showWordLimit = props.showWordLimit || false
    this.placeholder = props.placeholder || '请输入'
    this.clearable = props.clearable || true
    this.showPassword = props.showPassword || false
    this.disabled = props.disabled || false
    this.prefixIcon = props.prefixIcon || undefined
    this.suffixIcon = props.suffixIcon || undefined
    this.prefixText = props.prefixText || undefined
    this.suffixText = props.suffixText || undefined
    this.rows = props.rows || 2
    this.autosize = props.autosize || { minRows: 3, maxRows: 6 }
    this.autocomplete = props.autocomplete || 'off'
    this.name = props.name || undefined
    this.readonly = props.readonly || false
    this.readonlyWithBgcolor = props.readonlyWithBgcolor || false
    this.readonlyHover = props.readonlyHover || true
    this.max = props.max || undefined
    this.min = props.min || undefined
    this.step = props.step || undefined
    this.precision = props.precision || 0
    this.resize = props.resize || undefined
    this.autofocus = props.autofocus || false
    this.form = props.form || undefined
    this.label = props.label || undefined
    this.tabindex = props.tabindex || undefined
    this.textalign = props.textalign || undefined
    this.validateEvent = props.validateEvent || true
    this.inputStyle = props.inputStyle || {}
  }
}
