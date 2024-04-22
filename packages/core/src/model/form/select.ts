export interface SelectProps {
  multiple?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  valueKey?: string;
  clearable?: boolean;
  multipleLimit?: number;
  autocomplete?: boolean;
  placeholder?: string;
  allowCreate?: boolean;
  filterMethod?: Function | undefined;
  remote?: boolean;
  remoteMethod?: Function | undefined;
  dropdownVisibleAlways?: boolean;
  loadingText?: string;
  noMatchText?: string;
  noDataText?: string;
  popperClass?: string;
  scrollbarListClass?: string;
  reserveKeyword?: boolean;
  defaultFirstOption?: boolean;
  popperAppendToBody?: boolean;
  appendTo?: string | undefined;
  fitInputWidth?: boolean;
  textEllipsis?: boolean;
  maxTokenWidth?: number | string;
  maxTokenCount?: number;
  display?: boolean;
  displayMoreText?: string;
  reserveKeywordWhenOptionsChange?: boolean;
  tokenTooltipStyle?: string;
}

export default class Select {
  public FORM_TYPE: string
  public multiple: boolean
  public disabled: boolean
  public readonly: boolean
  public valueKey: string
  public clearable: boolean
  public multipleLimit: number
  public autocomplete: boolean
  public placeholder: string
  public allowCreate: boolean
  public filterMethod: Function | undefined;
  public remote: boolean
  public remoteMethod: Function | undefined;
  public dropdownVisibleAlways: boolean
  public loadingText: string
  public noMatchText: string
  public noDataText: string
  public popperClass: string
  public scrollbarListClass: string
  public reserveKeyword: boolean
  public defaultFirstOption: boolean
  public popperAppendToBody: boolean
  public appendTo: string | undefined
  public fitInputWidth: boolean
  public textEllipsis: boolean
  public maxTokenWidth: number | string
  public maxTokenCount: number
  public display: boolean
  public displayMoreText: string
  public reserveKeywordWhenOptionsChange: boolean
  public tokenTooltipStyle: string

  constructor(option: SelectProps | undefined) {
    const props = option || {}
    this.FORM_TYPE = 'select'
    this.multiple = props.multiple || false
    this.disabled = props.disabled || false
    this.readonly = props.readonly || false
    this.reserveKeyword = props.reserveKeyword || false
    this.valueKey = props.valueKey || 'value'
    this.clearable = props.clearable || true
    this.multipleLimit = props.multipleLimit || 0
    this.autocomplete = props.autocomplete || false
    this.placeholder = props.placeholder || '请选择'
    this.allowCreate = props.allowCreate || false
    this.filterMethod = props.filterMethod || undefined
    this.remote = props.remote || false
    this.remoteMethod = props.remoteMethod || undefined
    this.dropdownVisibleAlways = props.dropdownVisibleAlways || false
    this.loadingText = props.loadingText || '加载中'
    this.noMatchText = props.noMatchText || '无匹配结果'
    this.noDataText = props.noDataText || '无结果'
    this.popperClass = props.popperClass || ''
    this.scrollbarListClass = props.scrollbarListClass || ''
    this.reserveKeyword = props.reserveKeyword || false
    this.defaultFirstOption = props.defaultFirstOption || false
    this.popperAppendToBody = props.popperAppendToBody || false
    this.appendTo = props.appendTo || undefined
    this.fitInputWidth = props.fitInputWidth || false
    this.textEllipsis = props.textEllipsis || true
    this.maxTokenWidth = props.maxTokenWidth || '100'
    this.maxTokenCount = props.maxTokenCount || 1
    this.display = props.display || false
    this.displayMoreText = props.displayMoreText || '更多'
    this.reserveKeywordWhenOptionsChange = props.reserveKeywordWhenOptionsChange || false
    this.tokenTooltipStyle = props.tokenTooltipStyle || ''
  }
}
